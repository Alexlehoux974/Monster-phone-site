import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('🚪 [LOGOUT API] Processing logout request...');

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

    // Delete the auth cookie by setting it with maxAge 0
    response.cookies.set('sb-nswlznqoadjffpxkagoz-auth-token', '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0, // Immediately expire the cookie
    });

    console.log('✅ [LOGOUT API] Auth cookie deleted');

    return response;
  } catch (error) {
    console.error('❌ [LOGOUT API] Error during logout:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la deconnexion' },
      { status: 500 }
    );
  }
}
