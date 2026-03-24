import type { DatabaseConnection } from "../config/database";

export function getDatabaseReadResponse(
  database: DatabaseConnection,
  scope: string,
) {
  if (database.provider === "mongo") {
    return null;
  }

  if (database.provider === "supabase") {
    return {
      status: 501,
      body: {
        error: true,
        message: `Supabase ${scope} are not implemented yet`,
      },
    };
  }

  return {
    status: 503,
    body: {
      error: true,
      message: "Database is not configured",
    },
  };
}
