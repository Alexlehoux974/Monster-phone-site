import { createClient } from '@/lib/supabase/client';

/**
 * Hook for admin Supabase operations via API route
 * Bypasses RLS using service_role key
 */
export function useAdminSupabase() {
  const supabase = createClient();

  const getAuthHeaders = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      throw new Error('Non authentifié');
    }
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
    };
  };

  const adminUpdate = async (
    table: string,
    data: object,
    filters: { column: string; value: any }[]
  ) => {
    const headers = await getAuthHeaders();
    const response = await fetch('/api/admin/supabase', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        operation: 'update',
        table,
        data,
        filters,
      }),
    });

    const result = await response.json();
    if (!response.ok || result.error) {
      throw new Error(result.error || 'Failed to update');
    }

    return result.data;
  };

  const adminInsert = async (table: string, data: object | object[]) => {
    const headers = await getAuthHeaders();
    const response = await fetch('/api/admin/supabase', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        operation: 'insert',
        table,
        data,
      }),
    });

    const result = await response.json();
    if (!response.ok || result.error) {
      throw new Error(result.error || 'Failed to insert');
    }

    return result.data;
  };

  const adminUpsert = async (table: string, data: object | object[]) => {
    const headers = await getAuthHeaders();
    const response = await fetch('/api/admin/supabase', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        operation: 'upsert',
        table,
        data,
      }),
    });

    const result = await response.json();
    if (!response.ok || result.error) {
      throw new Error(result.error || 'Failed to upsert');
    }

    return result.data;
  };

  const adminDelete = async (
    table: string,
    filters: { column: string; value: any }[]
  ) => {
    const headers = await getAuthHeaders();
    const response = await fetch('/api/admin/supabase', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        operation: 'delete',
        table,
        filters,
      }),
    });

    const result = await response.json();
    if (!response.ok || result.error) {
      throw new Error(result.error || 'Failed to delete');
    }

    return result.data;
  };

  return {
    adminUpdate,
    adminInsert,
    adminUpsert,
    adminDelete,
  };
}
