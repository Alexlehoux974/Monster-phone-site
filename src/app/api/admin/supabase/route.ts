import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin-client';

/**
 * Generic admin API route for Supabase operations
 * Bypasses RLS using service_role key
 *
 * Usage:
 * POST /api/admin/supabase
 * Body: {
 *   operation: 'update' | 'insert' | 'delete' | 'upsert',
 *   table: string,
 *   data: object | object[],
 *   filters?: { column: string, value: any }[]
 * }
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

    const supabase = createAdminClient();
    let query;

    switch (operation) {
      case 'insert':
        query = supabase.from(table).insert(data).select();
        break;

      case 'update':
        if (!filters || filters.length === 0) {
          return NextResponse.json(
            { error: 'Update requires filters' },
            { status: 400 }
          );
        }
        query = supabase.from(table).update(data);
        filters.forEach((filter: { column: string; value: any }) => {
          query = query.eq(filter.column, filter.value);
        });
        query = query.select();
        break;

      case 'upsert':
        query = supabase.from(table).upsert(data).select();
        break;

      case 'delete':
        if (!filters || filters.length === 0) {
          return NextResponse.json(
            { error: 'Delete requires filters' },
            { status: 400 }
          );
        }
        query = supabase.from(table).delete();
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
      console.error(`Admin ${operation} error on ${table}:`, error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
