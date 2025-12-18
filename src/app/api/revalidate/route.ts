import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { verifyAdminAuth, verifyCronSecret, unauthorizedResponse } from '@/lib/auth/admin-guard';

export async function POST(request: NextRequest) {
  // SECURITY: Verify admin authentication OR revalidation secret
  const isCronJob = verifyCronSecret(request);
  if (!isCronJob) {
    const authResult = await verifyAdminAuth(request);
    if (!authResult.authorized) {
      return unauthorizedResponse(authResult);
    }
  }

  try {
    const body = await request.json();
    const { path, tag } = body;

    // Revalidate specific path if provided
    if (path) {
      revalidatePath(path);
      }

    // Revalidate specific tag if provided
    if (tag) {
      revalidateTag(tag);
      }

    // Always revalidate the main products page
    revalidatePath('/');
    revalidatePath('/produits');

    // Revalidate all product detail pages
    revalidatePath('/produit/[slug]', 'page');
    revalidatePath('/produit-supabase/[slug]', 'page');

    revalidateTag('products');

    return NextResponse.json({
      revalidated: true,
      path,
      tag,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({
      revalidated: false,
      error: 'Failed to revalidate'
    }, { status: 500 });
  }
}
