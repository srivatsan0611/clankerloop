import { PostHog } from "posthog-node";

export function getPostHogClient(env: Env): PostHog {
  return new PostHog(env.POSTHOG_API_KEY, {
    host: "https://us.i.posthog.com",
  });
}
