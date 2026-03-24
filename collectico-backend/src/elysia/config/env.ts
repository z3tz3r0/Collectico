const defaultOrigins = [
  "http://localhost:5173",
  "https://dragon-tempura-sprint2.vercel.app",
];

export type DatabaseProvider = "mongo" | "none" | "supabase";

export type RuntimeEnv = {
  allowedOrigins: string[];
  databaseProvider: DatabaseProvider;
  jwtSecret: string | null;
  mongoUri: string | null;
  port: number;
  supabaseServiceRoleKey: string | null;
  supabaseUrl: string | null;
};

function parsePort(rawPort: string | undefined): number {
  const port = Number(rawPort ?? 3000);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("PORT must be a positive integer");
  }

  return port;
}

function parseAllowedOrigins(rawOrigins: string | undefined): string[] {
  if (!rawOrigins) {
    return defaultOrigins;
  }

  return rawOrigins
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function getDatabaseProvider(
  mongoUri: string | null,
  supabaseUrl: string | null,
  supabaseServiceRoleKey: string | null,
): DatabaseProvider {
  if (supabaseUrl && supabaseServiceRoleKey) {
    return "supabase";
  }

  if (mongoUri) {
    return "mongo";
  }

  return "none";
}

const mongoUri = process.env.MONGO_URI ?? null;
const supabaseUrl = process.env.SUPABASE_URL ?? null;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? null;

export const env: RuntimeEnv = {
  port: parsePort(process.env.PORT),
  mongoUri,
  supabaseUrl,
  supabaseServiceRoleKey,
  databaseProvider: getDatabaseProvider(
    mongoUri,
    supabaseUrl,
    supabaseServiceRoleKey,
  ),
  jwtSecret: process.env.JWT_SECRET ?? null,
  allowedOrigins: parseAllowedOrigins(process.env.CORS_ORIGINS),
};

export function getMissingRuntimeConfig(): string[] {
  const missingKeys: string[] = [];

  if (env.databaseProvider === "none") {
    if (env.supabaseUrl && !env.supabaseServiceRoleKey) {
      missingKeys.push("SUPABASE_SERVICE_ROLE_KEY");
    } else if (!env.supabaseUrl && env.supabaseServiceRoleKey) {
      missingKeys.push("SUPABASE_URL");
    } else {
      missingKeys.push("SUPABASE_URL");
      missingKeys.push("SUPABASE_SERVICE_ROLE_KEY");
      missingKeys.push("MONGO_URI");
    }
  }

  if (!env.jwtSecret) {
    missingKeys.push("JWT_SECRET");
  }

  return missingKeys;
}
