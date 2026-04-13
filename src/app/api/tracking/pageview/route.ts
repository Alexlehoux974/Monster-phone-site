import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin-client';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function sanitize(value: unknown, maxLen = 500): string | null {
  if (value == null) return null;
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, maxLen);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return new NextResponse(null, { status: 204 });
    }

    const path = sanitize(body.path, 500);
    const session_id = sanitize(body.session_id, 100);
    if (!path || !session_id) {
      return new NextResponse(null, { status: 204 });
    }

    const referrer = sanitize(body.referrer, 500);
    const page_type = sanitize(body.page_type, 50);
    const page_ref = sanitize(body.page_ref, 200);
    const userAgent = sanitize(body.user_agent, 500);
    const user_agent_hash = userAgent
      ? crypto.createHash('sha256').update(userAgent).digest('hex').slice(0, 32)
      : null;

    const country = sanitize(
      request.headers.get('x-vercel-ip-country') ?? request.headers.get('cf-ipcountry'),
      8
    );

    const supabase = createAdminClient();
    const { error } = await supabase.from('page_views').insert({
      path,
      referrer,
      session_id,
      user_agent_hash,
      country,
      page_type,
      page_ref,
    });

    if (error) {
      console.error('[pageview] insert error:', error.message);
    }

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error('[pageview] unexpected error:', err);
    return new NextResponse(null, { status: 204 });
  }
}
