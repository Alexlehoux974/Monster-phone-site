import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export interface AdminUser {
  id: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor';
  is_active: boolean;
}

export interface AuthResult {
  authorized: boolean;
  admin?: AdminUser;
  error?: string;
  status?: number;
}

/**
 * Verify that the request comes from an authenticated admin user
 * Uses the Authorization header (Bearer token) or cookies for session
 */
export async function verifyAdminAuth(request: NextRequest): Promise<AuthResult> {
  try {
    // Create admin client to query admin_users table
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Try to get token from Authorization header first
    const authHeader = request.headers.get('authorization');
    let token = authHeader?.replace('Bearer ', '');

    // If no Authorization header, try to get from cookies (for browser requests)
    if (!token) {
      const cookieStore = await cookies();
      const supabaseCookie = cookieStore.get('sb-nswlznqoadjffpxkagoz-auth-token');
      if (supabaseCookie) {
        try {
          const sessionData = JSON.parse(supabaseCookie.value);
          token = sessionData?.access_token;
        } catch {
          // Cookie parsing failed
        }
      }
    }

    if (!token) {
      return {
        authorized: false,
        error: 'Authentication required - No token provided',
        status: 401,
      };
    }

    // Verify the token and get user
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) {
      return {
        authorized: false,
        error: 'Invalid or expired token',
        status: 401,
      };
    }

    // Check if user is an active admin
    const { data: adminUser, error: adminError } = await supabaseAdmin
      .from('admin_users')
      .select('id, email, role, is_active')
      .eq('email', user.email)
      .eq('is_active', true)
      .single();

    if (adminError || !adminUser) {
      return {
        authorized: false,
        error: 'Access denied - Not an admin user',
        status: 403,
      };
    }

    return {
      authorized: true,
      admin: adminUser as AdminUser,
    };
  } catch (error) {
    console.error('Admin auth verification error:', error);
    return {
      authorized: false,
      error: 'Authentication verification failed',
      status: 500,
    };
  }
}

/**
 * Verify admin with specific role requirement
 */
export async function verifyAdminRole(
  request: NextRequest,
  requiredRoles: Array<'super_admin' | 'admin' | 'editor'>
): Promise<AuthResult> {
  const authResult = await verifyAdminAuth(request);

  if (!authResult.authorized) {
    return authResult;
  }

  if (!authResult.admin || !requiredRoles.includes(authResult.admin.role)) {
    return {
      authorized: false,
      error: `Access denied - Requires one of: ${requiredRoles.join(', ')}`,
      status: 403,
    };
  }

  return authResult;
}

/**
 * Helper to create unauthorized response
 */
export function unauthorizedResponse(result: AuthResult): NextResponse {
  return NextResponse.json(
    { error: result.error || 'Unauthorized' },
    { status: result.status || 401 }
  );
}

/**
 * Verify cron job secret for scheduled tasks
 */
export function verifyCronSecret(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.warn('CRON_SECRET not configured - rejecting cron request');
    return false;
  }

  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${cronSecret}`;
}
