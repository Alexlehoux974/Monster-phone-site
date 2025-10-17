import { createClient } from '@/lib/supabase/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    return NextResponse.json({ user: null, session: null }, { status: 401 });
  }

  return NextResponse.json({
    user: { email: session.user.email },
    session: { access_token: session.access_token }
  });
}
