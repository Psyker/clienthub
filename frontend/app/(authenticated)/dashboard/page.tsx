'use client'

import { useViewer } from '~/shared/hooks/useAuth'
import { PageLayout } from '~/shared/layouts/PageLayout'
import { Stack } from '~/styled-system/jsx'
import { Heading } from '~/ui/heading'
import { Text } from '~/ui/text'

export default function HomePage() {
  const viewer = useViewer()

  return (
    <PageLayout>
      <Stack gap={6}>
        <Heading as="h1">Welcome to ClientHub, {viewer.name}</Heading>
        <Text color="text.muted" fontSize="body.lg">
          Your client, intervention, and software licence modules are being prepared.
        </Text>
      </Stack>
    </PageLayout>
  )
}
