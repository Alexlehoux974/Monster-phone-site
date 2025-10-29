import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const start = Date.now();
    const response = await fetch('https://nswlznqoadjffpxkagoz.supabase.co/rest/v1/products?select=id,name&limit=1', {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`
      }
    });
    const data = await response.json();
    const duration = Date.now() - start;
    return NextResponse.json({ success: true, data, duration: `${duration}ms` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
