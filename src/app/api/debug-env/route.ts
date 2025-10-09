import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const envCheck = {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? `SET (${process.env.STRIPE_SECRET_KEY.substring(0, 7)}...)` : 'MISSING',
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? `SET (${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.substring(0, 7)}...)` : 'MISSING',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET ✓' : 'MISSING ✗',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET ✓' : 'MISSING ✗',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET ✓' : 'MISSING ✗',
    RESEND_API_KEY: process.env.RESEND_API_KEY ? 'SET ✓' : 'MISSING ✗',
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'MISSING ✗',
  };

  return NextResponse.json(envCheck);
}
