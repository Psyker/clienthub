import { AppLink } from '~/shared/components/AppLink'
import { AuthenticatedGuard } from '~/shared/guards/AuthenticatedGuard'
import { PageLayout } from '~/shared/layouts/PageLayout'
import { Stack } from '~/styled-system/jsx'
import { Button } from '~/ui/button'
import { Heading } from '~/ui/heading'
import { Text } from '~/ui/text'

export default function Home() {
  return (
    <PageLayout>
      <Stack gap={6} maxW="720px">
        <Heading as="h1">ClientHub</Heading>
        <Text color="text.muted" fontSize="body.lg">
          Keep your clients, interventions, and software licences in one place.
        </Text>
        <Text color="text.muted">Your workspace is being prepared.</Text>
        <AuthenticatedGuard
          fallback={
            <Button asChild size="lg">
              <AppLink href="/auth/login">Sign in</AppLink>
            </Button>
          }
        >
          <Button asChild size="lg">
            <AppLink href="/dashboard">Open your workspace</AppLink>
          </Button>
        </AuthenticatedGuard>
      </Stack>
    </PageLayout>
  )
}
