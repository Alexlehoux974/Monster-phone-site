import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const start = Date.now();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase.from('products').select('id, name').limit(1);
    const duration = Date.now() - start;

    if (error) {
      return NextResponse.json({ success: false, error: error.message, duration: `${duration}ms` });
    }

    return NextResponse.json({ success: true, product: data?.[0], duration: `${duration}ms` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
