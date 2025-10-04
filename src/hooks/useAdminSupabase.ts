/**
 * Hook for admin Supabase operations via API route
 * Bypasses RLS using service_role key
 */
export function useAdminSupabase() {
  const adminUpdate = async (
    table: string,
    data: object,
    filters: { column: string; value: any }[]
  ) => {
    const response = await fetch('/api/admin/supabase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    const response = await fetch('/api/admin/supabase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    const response = await fetch('/api/admin/supabase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    const response = await fetch('/api/admin/supabase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
