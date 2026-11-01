import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import test from 'node:test'

const frontendRequire = createRequire(new URL('../frontend/package.json', import.meta.url))
const mobileRequire = createRequire(new URL('../mobile/package.json', import.meta.url))
const expoRequire = createRequire(mobileRequire.resolve('expo/package.json'))
const expoCliRequire = createRequire(expoRequire.resolve('@expo/cli/package.json'))

// GHSA-gcqx-w48m-w2h4: exercise both distributed entry points used by consumers.
for (const entry of ['deepmerge', 'deepmerge/dist/umd.js']) {
  const merge = frontendRequire(entry)

  test(`${entry}: malicious keys cannot change a merged object's prototype`, () => {
    const payload = JSON.parse('{"__proto__":{"polluted":true},"nested":{"__proto__":{"polluted":true}}}')
    const empty = Object.create(null)

    for (const [target, source] of [
      [payload, {}],
      [empty, payload],
      [{}, payload],
    ]) {
      const merged = merge(target, source)
      assert.equal(Object.getPrototypeOf(merged), Object.prototype)
      assert.equal(merged.polluted, undefined)
      if (merged.nested) {
        assert.equal(Object.getPrototypeOf(merged.nested), Object.prototype)
        assert.equal(merged.nested.polluted, undefined)
      }
    }
    assert.equal({}.polluted, undefined)
  })

  test(`${entry}: nested objects and arrays still merge without mutating inputs`, () => {
    const target = { base: { color: 'blue' }, sizes: ['small'] }
    const source = { base: { weight: 600 }, sizes: ['large'] }
    assert.deepEqual(merge(target, source), {
      base: { color: 'blue', weight: 600 },
      sizes: ['small', 'large'],
    })
    assert.deepEqual(target, { base: { color: 'blue' }, sizes: ['small'] })
    assert.deepEqual(source, { base: { weight: 600 }, sizes: ['large'] })
  })
}

// The scoped Zod override must preserve Expo CLI's actual validation contracts.
const { PluginSchema, DevToolsPluginOutputSchema } = expoCliRequire('./build/src/start/server/DevToolsPlugin.schema.js')
const { createMCPDevToolsExtensionSchema } = expoCliRequire(
  './build/src/start/server/createMCPDevToolsExtensionSchema.js',
)
const plugin = {
  packageName: 'clienthub-devtools',
  packageRoot: '/tmp/clienthub-devtools',
  cliExtensions: {
    description: 'ClientHub development tools',
    entryPoint: 'index.js',
    commands: [
      {
        name: 'inspect',
        title: 'Inspect configuration',
        environments: ['cli', 'mcp'],
        parameters: [{ name: 'count', type: 'number', description: 'Item count' }],
      },
    ],
  },
}

test('Expo CLI accepts valid plugins and rejects invalid output after the Zod upgrade', () => {
  assert.equal(PluginSchema.safeParse(plugin).success, true)
  assert.equal(PluginSchema.safeParse({ ...plugin, packageName: '' }).success, false)
  assert.equal(DevToolsPluginOutputSchema.safeParse([{ type: 'text', text: 'Ready', level: 'info' }]).success, true)
  assert.equal(DevToolsPluginOutputSchema.safeParse([{ type: 'text', text: 'Ready', level: 'invalid' }]).success, false)
})

test('Expo CLI command schemas preserve type validation and reject extra parameters', () => {
  const schema = createMCPDevToolsExtensionSchema(plugin)
  assert.equal(schema.safeParse({ command: 'inspect', count: 2 }).success, true)
  assert.equal(schema.safeParse({ command: 'inspect', count: 'two' }).success, false)
  assert.equal(schema.safeParse({ command: 'unknown' }).success, false)
  assert.equal(schema.safeParse({ command: 'inspect', extra: true }).success, false)
})

test('Expo CLI rejects oversized bounded arrays before parsing their elements', async () => {
  const { z } = expoCliRequire('zod')
  let visited = 0
  const schema = z.array(z.unknown().transform(() => ++visited)).max(1)
  const oversized = new Array(100_000).fill(null)
  assert.equal(schema.safeParse(oversized).success, false)
  assert.equal((await schema.safeParseAsync(oversized)).success, false)
  assert.equal(visited, 0)
})
