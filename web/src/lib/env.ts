const requiredKeys = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'] as const;

type RequiredKey = (typeof requiredKeys)[number];

type EnvRecord = Record<RequiredKey, string> & {
  SUPABASE_SERVICE_ROLE_KEY?: string;
  SUPABASE_REDIRECT_URL?: string;
};

function readEnv(key: RequiredKey, fallback = '') {
  return process.env[key] ?? fallback;
}

export const env = {
  supabaseUrl: readEnv('NEXT_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: readEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  supabaseRedirectUrl: process.env.SUPABASE_REDIRECT_URL ?? 'http://localhost:3000/auth/callback',
};

if (process.env.NODE_ENV === 'development') {
  requiredKeys.forEach((key) => {
    if (!process.env[key as keyof EnvRecord]) {
      console.warn(`[env] Missing environment variable: ${key}`);
    }
  });
}

export const hasSupabaseCredentials = Boolean(env.supabaseUrl && env.supabaseAnonKey);