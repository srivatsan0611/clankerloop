import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

export const apiKeyAuth = createMiddleware(async (c, next) => {
  const apiKey = c.req.header("X-API-Key");
  const validApiKey = process.env.BACKEND_API_KEY;

  if (!validApiKey) {
    console.error("BACKEND_API_KEY environment variable is not set");
    throw new HTTPException(500, { message: "Server configuration error" });
  }

  if (!apiKey) {
    throw new HTTPException(401, {
      message: "Missing API key. Provide X-API-Key header.",
    });
  }

  if (apiKey !== validApiKey) {
    throw new HTTPException(403, { message: "Invalid API key" });
  }

  await next();
});
