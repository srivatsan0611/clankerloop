import { gateway } from "ai";
import { withTracing } from "@posthog/ai";
import { getPostHogClient } from "./analytics";

export const client = (model: string) => gateway(model);

export const getTracedClient = (
  model: string,
  userId: string,
  problemId: string,
  modelName: string,
  env: Env,
) => {
  const baseClient = client(model);
  const phClient = getPostHogClient(env);
  return withTracing(baseClient, phClient, {
    posthogDistinctId: userId,
    posthogTraceId: problemId,
    posthogProperties: { generatedByModel: modelName },
  });
};
