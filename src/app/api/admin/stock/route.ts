import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/auth/admin-guard';

export async function GET(request: NextRequest) {
  // Verify admin authentication
  const authResult = await verifyAdminAuth(request);
  if (!authResult.authorized) {
    return unauthorizedResponse(authResult);
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ [STOCK API] Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    console.log('📦 [STOCK API] Fetching products with variants...');

    // Fetch products with variants using REST API
    const productsResponse = await fetch(
      `${supabaseUrl}/rest/v1/products?select=*,product_variants(*)&order=name`,
      {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000), // 10 second timeout
      }
    );

    if (!productsResponse.ok) {
      console.error('❌ [STOCK API] Products fetch error:', productsResponse.status);
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      );
    }

    const products = await productsResponse.json();
    console.log(`✅ [STOCK API] Loaded ${products.length} products`);

    // Fetch brands
    console.log('🏷️ [STOCK API] Fetching brands...');
    const brandsResponse = await fetch(
      `${supabaseUrl}/rest/v1/brands?select=id,name&order=name`,
      {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000),
      }
    );

    const brands = brandsResponse.ok ? await brandsResponse.json() : [];
    console.log(`✅ [STOCK API] Loaded ${brands.length} brands`);

    // Fetch categories
    console.log('📂 [STOCK API] Fetching categories...');
    const categoriesResponse = await fetch(
      `${supabaseUrl}/rest/v1/categories?select=id,name&order=name`,
      {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000),
      }
    );

    const categories = categoriesResponse.ok ? await categoriesResponse.json() : [];
    console.log(`✅ [STOCK API] Loaded ${categories.length} categories`);

    return NextResponse.json({
      products,
      brands,
      categories
    });
  } catch (error) {
    console.error('❌ [STOCK API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
