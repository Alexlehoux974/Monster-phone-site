import { createClient } from '@supabase/supabase-js';

/**
 * Admin Supabase client with service_role key
 * Use this ONLY in API routes and server components for admin operations
 * Bypasses Row Level Security (RLS)
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  console.log('🔍 [Admin Client Debug]', {
    hasUrl: !!supabaseUrl,
    hasServiceKey: !!serviceRoleKey,
    urlLength: supabaseUrl?.length,
    keyLength: serviceRoleKey?.length
  });

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ Missing Supabase admin configuration', {
      hasUrl: !!supabaseUrl,
      hasServiceKey: !!serviceRoleKey
    });
    throw new Error('Missing Supabase admin configuration');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
