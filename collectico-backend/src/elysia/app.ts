import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";

import type { DatabaseConnection } from "./config/database";
import { createBidsRoutes } from "./routes/bids";
import { createProductsRoutes } from "./routes/products";
import { createSystemRoutes } from "./routes/system";
import { createUsersRoutes } from "./routes/users";

type AppOptions = {
  allowedOrigins: string[];
  database: DatabaseConnection;
  jwtSecret: string | null;
  missingConfig: string[];
};

export function createApp(options: AppOptions) {
  return new Elysia({ name: "collectico-api" })
    .use(
      cors({
        origin: options.allowedOrigins,
        credentials: true,
      }),
    )
    .use(
      createSystemRoutes({
        database: options.database,
        missingConfig: options.missingConfig,
      }),
    )
    .use(
      createUsersRoutes({
        jwtSecret: options.jwtSecret,
      }),
    )
    .use(
      createProductsRoutes({
        database: options.database,
      }),
    )
    .use(
      createBidsRoutes({
        database: options.database,
      }),
    );
}
