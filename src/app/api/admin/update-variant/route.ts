import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/auth/admin-guard';

export async function POST(request: NextRequest) {
  // Verify admin authentication
  const authResult = await verifyAdminAuth(request);
  if (!authResult.authorized) {
    return unauthorizedResponse(authResult);
  }

  // Lazy-instantiate Supabase client (évite l'éval à module-load time
  // pendant `next build`/Collecting page data).
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  try {
    const { variantId, data } = await request.json();

    if (!variantId) {
      return NextResponse.json(
        { success: false, error: 'Variant ID is required' },
        { status: 400 }
      );
    }

    console.log(`📝 Updating variant ${variantId}:`, data);

    const { error: updateError } = await supabase
      .from('product_variants')
      .update(data)
      .eq('id', variantId);

    if (updateError) {
      console.error('❌ Update error:', updateError);
      return NextResponse.json(
        { success: false, error: updateError.message },
        { status: 500 }
      );
    }

    console.log(`✅ Variant ${variantId} updated successfully`);

    return NextResponse.json({
      success: true,
      message: 'Variant updated successfully'
    });

  } catch (error) {
    console.error('❌ API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
