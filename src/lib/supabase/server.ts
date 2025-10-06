import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseServiceKey) {
  console.error('⚠️ SUPABASE_SERVICE_ROLE_KEY is missing in environment variables');
}

/**
 * Create Supabase client for server-side API routes with service role key
 * This bypasses RLS policies and is only for trusted server-side operations
 */
export async function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
