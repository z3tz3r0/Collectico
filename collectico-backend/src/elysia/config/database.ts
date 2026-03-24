import mongoose from "mongoose";

import { createSupabaseServerClient } from "./supabase";
import type { DatabaseProvider, RuntimeEnv } from "./env";

export type DatabaseConnection = {
  configured: boolean;
  provider: DatabaseProvider;
  status: "configured" | "connected" | "missing_config";
};

export async function connectDatabase(
  env: RuntimeEnv,
): Promise<DatabaseConnection> {
  if (
    env.databaseProvider === "supabase" &&
    env.supabaseUrl &&
    env.supabaseServiceRoleKey
  ) {
    createSupabaseServerClient({
      url: env.supabaseUrl,
      serviceRoleKey: env.supabaseServiceRoleKey,
    });

    return {
      configured: true,
      provider: "supabase",
      status: "configured",
    };
  }

  if (env.databaseProvider === "mongo" && env.mongoUri) {
    await mongoose.connect(env.mongoUri);

    return {
      configured: true,
      provider: "mongo",
      status: "connected",
    };
  }

  return {
    configured: false,
    provider: "none",
    status: "missing_config",
  };
}
