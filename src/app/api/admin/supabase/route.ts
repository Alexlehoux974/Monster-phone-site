import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin-client';
import { createClient } from '@/lib/supabase/server';

/**
 * Generic admin API route for Supabase operations
 * Uses admin client for operations, authenticated client for verification
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { operation, table, data, filters } = body;

    if (!operation || !table) {
      return NextResponse.json(
        { error: 'Missing operation or table' },
        { status: 400 }
      );
    }

    // Vérifier l'authentification
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    console.log('🔍 [Admin API] Auth check:', {
      hasUser: !!user,
      userEmail: user?.email,
      error: userError?.message
    });

    if (userError || !user) {
      console.error('❌ [Admin API] Auth failed:', userError);
      return NextResponse.json(
        { error: 'Unauthorized - Please log in' },
        { status: 401 }
      );
    }

    // Vérifier que l'utilisateur est admin
    const { data: adminCheck, error: adminError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', user.email)
      .eq('is_active', true)
      .single();

    if (adminError || !adminCheck) {
      console.error('❌ [Admin API] Admin check failed:', adminError);
      return NextResponse.json(
        { error: 'Access denied - Admin only' },
        { status: 403 }
      );
    }

    console.log('✅ [Admin API] User is admin:', user.email);

    // Utiliser le client admin pour les opérations (bypass RLS)
    const adminClient = createAdminClient();
    let query: any;

    switch (operation) {
      case 'insert':
        query = adminClient.from(table).insert(data).select();
        break;

      case 'update':
        if (!filters || filters.length === 0) {
          return NextResponse.json(
            { error: 'Update requires filters' },
            { status: 400 }
          );
        }
        query = adminClient.from(table).update(data);
        filters.forEach((filter: { column: string; value: any }) => {
          query = query.eq(filter.column, filter.value);
        });
        query = query.select();
        break;

      case 'upsert':
        query = adminClient.from(table).upsert(data).select();
        break;

      case 'delete':
        if (!filters || filters.length === 0) {
          return NextResponse.json(
            { error: 'Delete requires filters' },
            { status: 400 }
          );
        }
        query = adminClient.from(table).delete();
        filters.forEach((filter: { column: string; value: any }) => {
          query = query.eq(filter.column, filter.value);
        });
        query = query.select();
        break;

      default:
        return NextResponse.json(
          { error: `Unsupported operation: ${operation}` },
          { status: 400 }
        );
    }

    const { data: result, error } = await query;

    if (error) {
      console.error(`❌ [Admin API] ${operation} error on ${table}:`, error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.log(`✅ [Admin API] ${operation} success on ${table}`);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('❌ [Admin API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
