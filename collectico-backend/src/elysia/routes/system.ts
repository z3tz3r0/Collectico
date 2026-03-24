import { Elysia } from "elysia";

import type { DatabaseConnection } from "../config/database";

type SystemRouteOptions = {
  database: DatabaseConnection;
  missingConfig: string[];
};

export function createSystemRoutes(options: SystemRouteOptions) {
  const databaseStatus = options.database.status;
  const serviceStatus = options.missingConfig.length === 0 ? "ready" : "migration_incomplete";
  const nextStep =
    options.database.provider === "supabase"
      ? "Replace Mongoose-backed route modules with Supabase repositories"
      : "Migrate route modules from Express to Elysia plugins";

  return new Elysia({ name: "system-routes" })
    .get("/", () => ({
      name: "Collectico API",
      runtime: "elysia",
      status: serviceStatus,
      databaseProvider: options.database.provider,
      nextStep,
    }))
    .get("/healthcheck", () => ({
      status: serviceStatus,
      checks: {
        database: databaseStatus,
      },
      databaseProvider: options.database.provider,
      missingConfig: options.missingConfig,
    }));
}
