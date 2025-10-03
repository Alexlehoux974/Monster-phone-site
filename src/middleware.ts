import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Pour l'instant, on laisse tout passer
  // La vérification se fait dans les pages elles-mêmes
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
