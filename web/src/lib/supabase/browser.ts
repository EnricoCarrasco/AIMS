import { createBrowserClient } from '@supabase/ssr';
import { env } from '@/lib/env';

let client: ReturnType<typeof createBrowserClient> | undefined;

export const getBrowserClient = () => {
  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    throw new Error('Supabase credentials are not configured. Check .env.local.');
  }

  if (!client) {
    client = createBrowserClient(env.supabaseUrl, env.supabaseAnonKey);
  }

  return client;
};
