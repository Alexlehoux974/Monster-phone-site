import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import type { MetaCAPIPayload, MetaCAPIResponse, MetaEventParams } from '@/lib/tracking/types';

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const META_CAPI_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const META_API_VERSION = 'v18.0';

/**
 * Hache une valeur avec SHA256 (requis par Meta CAPI)
 */
function hashValue(value: string | undefined): string | undefined {
  if (!value) return undefined;
  return crypto
    .createHash('sha256')
    .update(value.toLowerCase().trim())
    .digest('hex');
}

/**
 * Normalise un numéro de téléphone pour le hachage
 */
function normalizePhone(phone: string | undefined): string | undefined {
  if (!phone) return undefined;
  // Supprimer tout sauf les chiffres, garder le +
  return phone.replace(/[^\d+]/g, '');
}

interface CAPIRequestBody {
  event_name: string;
  event_id?: string;
  event_source_url: string;
  custom_data?: MetaEventParams;
  user_data?: {
    em?: string;
    ph?: string;
    fn?: string;
    ln?: string;
    ct?: string;
    zp?: string;
    country?: string;
    external_id?: string;
    fbp?: string;
    fbc?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Vérifier les credentials
    if (!META_PIXEL_ID || !META_CAPI_TOKEN) {
      return NextResponse.json(
        { error: 'Meta CAPI not configured' },
        { status: 500 }
      );
    }

    const body: CAPIRequestBody = await request.json();

    // Récupérer les headers pour les données utilisateur
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || '';

    // Construire le payload CAPI
    const payload: MetaCAPIPayload = {
      event_name: body.event_name,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: body.event_source_url,
      event_id: body.event_id,
      user_data: {
        client_ip_address: clientIp,
        client_user_agent: userAgent,
        // Hacher les données utilisateur si présentes
        em: body.user_data?.em ? [hashValue(body.user_data.em)!] : undefined,
        ph: body.user_data?.ph
          ? [hashValue(normalizePhone(body.user_data.ph))!]
          : undefined,
        fn: body.user_data?.fn ? [hashValue(body.user_data.fn)!] : undefined,
        ln: body.user_data?.ln ? [hashValue(body.user_data.ln)!] : undefined,
        ct: body.user_data?.ct ? [hashValue(body.user_data.ct)!] : undefined,
        zp: body.user_data?.zp ? [hashValue(body.user_data.zp)!] : undefined,
        country: body.user_data?.country
          ? [hashValue(body.user_data.country)!]
          : undefined,
        external_id: body.user_data?.external_id
          ? [hashValue(body.user_data.external_id)!]
          : undefined,
        // Ces valeurs ne sont pas hashées
        fbp: body.user_data?.fbp || undefined,
        fbc: body.user_data?.fbc || undefined,
      },
      custom_data: body.custom_data,
    };

    // Nettoyer les valeurs undefined du user_data
    const cleanedUserData = Object.fromEntries(
      Object.entries(payload.user_data).filter(([, v]) => v !== undefined)
    );

    const cleanedPayload = {
      ...payload,
      user_data: cleanedUserData,
    };

    // Envoyer à l'API Meta
    const metaResponse = await fetch(
      `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [cleanedPayload],
          access_token: META_CAPI_TOKEN,
        }),
      }
    );

    if (!metaResponse.ok) {
      const errorData = await metaResponse.json();
      console.error('Meta CAPI error:', errorData);
      return NextResponse.json(
        { error: 'Failed to send event to Meta', details: errorData },
        { status: metaResponse.status }
      );
    }

    const result: MetaCAPIResponse = await metaResponse.json();

    return NextResponse.json({
      success: true,
      events_received: result.events_received,
    });
  } catch (error) {
    console.error('Meta CAPI route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
