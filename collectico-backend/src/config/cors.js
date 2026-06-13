// Shared CORS origin allowlist for both the Express app and the socket.io server. Reads the
// CORS_ORIGINS env var (comma-separated) so new frontend origins (e.g. the Vue/Nuxt app) can be
// added without code changes, falling back to the production + legacy dev origins.
const DEFAULT_ORIGINS = [
  "http://localhost:5173",
  "https://dragon-tempura-sprint2.vercel.app",
];

export function getCorsOrigins() {
  const raw = process.env.CORS_ORIGINS;
  if (!raw) return DEFAULT_ORIGINS;
  return raw
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}
