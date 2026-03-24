import { createApp } from "./app";
import { connectDatabase } from "./config/database";
import { env, getMissingRuntimeConfig } from "./config/env";

async function bootstrap(): Promise<void> {
  const database = await connectDatabase(env);
  const missingConfig = getMissingRuntimeConfig();
  const app = createApp({
    allowedOrigins: env.allowedOrigins,
    database,
    jwtSecret: env.jwtSecret,
    missingConfig,
  });

  app.listen(env.port);

  console.log(`Collectico Elysia server listening on port ${env.port}`);
  console.log(`Database provider: ${database.provider}`);

  if (missingConfig.length > 0) {
    console.warn(
      `Missing runtime config for full migration: ${missingConfig.join(", ")}`,
    );
  }
}

bootstrap().catch((error) => {
  console.error("Failed to bootstrap Elysia server", error);
  process.exit(1);
});
