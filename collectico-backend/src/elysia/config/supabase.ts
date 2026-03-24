import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type SupabaseServerConfig = {
  serviceRoleKey: string;
  url: string;
};

let supabaseClient: SupabaseClient | null = null;

export function createSupabaseServerClient(
  config: SupabaseServerConfig,
): SupabaseClient {
  supabaseClient = createClient(config.url, config.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });

  return supabaseClient;
}

export function getSupabaseServerClient(): SupabaseClient | null {
  return supabaseClient;
}
