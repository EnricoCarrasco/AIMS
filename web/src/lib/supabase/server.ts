import { createServerClient } from '@supabase/ssr';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { env } from '@/lib/env';

type CookieStore = Awaited<ReturnType<typeof cookies>>;
type CookieOptions = Parameters<CookieStore['set']>[2];

export const createSupabaseServerClient = cache(async () => {
  const cookieStore = await cookies();

  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    throw new Error('Supabase credentials are not configured. Check .env.local.');
  }

  return createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options?: CookieOptions) {
        cookieStore.set(name, value, options);
      },
      remove(name: string, options?: CookieOptions) {
        cookieStore.set(name, '', { ...(options ?? {}), maxAge: 0 });
      },
    },
  });
});