import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({
        error: 'productId is required'
      }, { status: 400 });
    }

    // Utiliser le service role key pour contourner RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const { data: sections, error } = await supabase
      .from('product_content_sections')
      .select('*')
      .eq('product_id', productId)
      .eq('is_enabled', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('❌ [API] Error fetching sections:', error);
      return NextResponse.json({
        error: 'Failed to fetch sections',
        details: error.message
      }, { status: 500 });
    }

    const count = sections ? sections.length : 0;
    console.log(`✅ [API] Fetched ${count} sections for product ${productId}`);

    return NextResponse.json(
      { sections: sections || [] },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'CDN-Cache-Control': 'no-store',
          'Vercel-CDN-Cache-Control': 'no-store',
        },
      }
    );
  } catch (error: any) {
    console.error('❌ [API] Server error:', error);
    return NextResponse.json({
      error: 'Server error',
      message: error.message
    }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
