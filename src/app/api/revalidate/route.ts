import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, tag } = body;

    // Revalidate specific path if provided
    if (path) {
      revalidatePath(path);
      console.log(`Revalidated path: ${path}`);
    }

    // Revalidate specific tag if provided
    if (tag) {
      revalidateTag(tag);
      console.log(`Revalidated tag: ${tag}`);
    }

    // Always revalidate the main products page
    revalidatePath('/');
    revalidatePath('/produits');
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
