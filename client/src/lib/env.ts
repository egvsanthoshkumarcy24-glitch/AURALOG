export const env = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  API_URL: import.meta.env.VITE_API_URL,
} as const;

// Log environment variables in development
if (import.meta.env.DEV) {
  console.log('Environment Variables loaded:', {
    SUPABASE_URL: !!env.SUPABASE_URL,
    SUPABASE_ANON_KEY: !!env.SUPABASE_ANON_KEY,
    API_URL: !!env.API_URL
  });
}

// Validate required environment variables
if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
  throw new Error('Required environment variables are missing. Check your .env file.');
}