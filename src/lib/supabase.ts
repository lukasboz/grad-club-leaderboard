import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks for build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

// Lazy initialize supabase client only when actually needed
let supabaseClient: ReturnType<typeof createClient> | null = null;

export const getSupabaseClient = () => {
  if (!supabaseClient && supabaseUrl && supabasePublishableKey) {
    supabaseClient = createClient(supabaseUrl, supabasePublishableKey);
  }
  return supabaseClient;
};

// Export a proxy for backwards compatibility
export const supabase = new Proxy({} as any, {
  get: (target, prop) => {
    const client = getSupabaseClient();
    if (!client) {
      throw new Error('Supabase not initialized. Missing environment variables.');
    }
    return (client as any)[prop];
  },
});

export const getSession = async () => {
  const client = getSupabaseClient();
  if (!client) throw new Error('Supabase not initialized');
  const {
    data: { session },
  } = await client.auth.getSession();
  return session;
};
