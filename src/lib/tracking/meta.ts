/**
 * Utilitaires Meta Pixel et Conversion API
 */

import type {
  MetaStandardEvent,
  MetaEventParams,
  MetaContentItem,
  MetaUserData,
  CookiePreferences,
} from './types';

const COOKIE_PREFERENCES_KEY = 'monster-phone-cookie-preferences';

/**
 * Récupère l'ID du Pixel Meta depuis les variables d'environnement
 */
export function getMetaPixelId(): string | undefined {
  return process.env.NEXT_PUBLIC_META_PIXEL_ID;
}

/**
 * Vérifie si le consentement marketing est accordé
 */
export function hasMarketingConsent(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const saved = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (saved) {
      const prefs = JSON.parse(saved) as CookiePreferences;
      return prefs.marketing;
    }
  } catch {
    // Ignore les erreurs de parsing
  }
  return false;
}

/**
 * Initialise le Meta Pixel avec le mode consentement
 * Le pixel ne trackera pas tant que le consentement n'est pas donné
 */
export function initializeMetaPixel(): void {
  if (typeof window === 'undefined') return;

  const pixelId = getMetaPixelId();
  if (!pixelId) return;

  // Vérifier le consentement existant
  const hasConsent = hasMarketingConsent();

  // Si pas de consentement, révoquer
  if (!hasConsent && window.fbq) {
    window.fbq('consent', 'revoke');
  }
}

/**
 * Met à jour le consentement Meta Pixel
 */
export function updateMetaConsent(granted: boolean): void {
  if (typeof window === 'undefined' || !window.fbq) return;

  if (granted) {
    window.fbq('consent', 'grant');
  } else {
    window.fbq('consent', 'revoke');
  }
}

/**
 * Envoie un événement standard au Meta Pixel
 */
export function trackMetaEvent(
  eventName: MetaStandardEvent,
  params?: MetaEventParams
): void {
  if (typeof window === 'undefined' || !window.fbq) return;

  // Vérifier le consentement
  if (!hasMarketingConsent()) return;

  if (params) {
    window.fbq('track', eventName, params);
  } else {
    window.fbq('track', eventName);
  }
}

/**
 * Envoie un événement personnalisé au Meta Pixel
 */
export function trackMetaCustomEvent(
  eventName: string,
  params?: MetaEventParams
): void {
  if (typeof window === 'undefined' || !window.fbq) return;

  // Vérifier le consentement
  if (!hasMarketingConsent()) return;

  if (params) {
    window.fbq('trackCustom', eventName, params);
  } else {
    window.fbq('trackCustom', eventName);
  }
}

// ============================================
// Événements E-commerce Meta
// ============================================

/**
 * Track ViewContent (équivalent à view_item)
 */
export function trackMetaViewContent(params: {
  content_id: string;
  content_name: string;
  content_category?: string;
  value: number;
  currency?: string;
}): void {
  trackMetaEvent('ViewContent', {
    content_ids: [params.content_id],
    content_name: params.content_name,
    content_category: params.content_category,
    content_type: 'product',
    value: params.value,
    currency: params.currency || 'EUR',
  });
}

/**
 * Track AddToCart
 */
export function trackMetaAddToCart(params: {
  content_id: string;
  content_name: string;
  value: number;
  quantity: number;
  currency?: string;
}): void {
  const contents: MetaContentItem[] = [
    {
      id: params.content_id,
      quantity: params.quantity,
      item_price: params.value,
    },
  ];

  trackMetaEvent('AddToCart', {
    content_ids: [params.content_id],
    content_name: params.content_name,
    content_type: 'product',
    contents,
    value: params.value * params.quantity,
    currency: params.currency || 'EUR',
  });
}

/**
 * Track InitiateCheckout
 */
export function trackMetaInitiateCheckout(params: {
  content_ids: string[];
  contents: MetaContentItem[];
  value: number;
  num_items: number;
  currency?: string;
}): void {
  trackMetaEvent('InitiateCheckout', {
    content_ids: params.content_ids,
    content_type: 'product',
    contents: params.contents,
    value: params.value,
    num_items: params.num_items,
    currency: params.currency || 'EUR',
  });
}

/**
 * Track Purchase
 */
export function trackMetaPurchase(params: {
  content_ids: string[];
  contents: MetaContentItem[];
  value: number;
  num_items: number;
  currency?: string;
}): void {
  trackMetaEvent('Purchase', {
    content_ids: params.content_ids,
    content_type: 'product',
    contents: params.contents,
    value: params.value,
    num_items: params.num_items,
    currency: params.currency || 'EUR',
  });
}

/**
 * Génère un event_id unique pour la déduplication Pixel/CAPI
 */
export function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Récupère le cookie _fbp (Facebook Browser ID)
 */
export function getFbp(): string | null {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(/_fbp=([^;]+)/);
  return match ? match[1] : null;
}

/**
 * Récupère le cookie _fbc (Facebook Click ID)
 */
export function getFbc(): string | null {
  if (typeof document === 'undefined') return null;

  // D'abord vérifier le cookie
  const match = document.cookie.match(/_fbc=([^;]+)/);
  if (match) return match[1];

  // Sinon vérifier le paramètre fbclid dans l'URL
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');
    if (fbclid) {
      return `fb.1.${Date.now()}.${fbclid}`;
    }
  }

  return null;
}

/**
 * Envoie un événement via Conversion API (côté serveur)
 */
export async function sendMetaCAPIEvent(params: {
  eventName: MetaStandardEvent | string;
  eventId?: string;
  customData?: MetaEventParams;
  userData?: Partial<MetaUserData>;
}): Promise<void> {
  if (typeof window === 'undefined') return;

  // Vérifier le consentement
  if (!hasMarketingConsent()) return;

  try {
    const response = await fetch('/api/tracking/meta-capi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_name: params.eventName,
        event_id: params.eventId || generateEventId(),
        event_source_url: window.location.href,
        custom_data: params.customData,
        user_data: {
          ...params.userData,
          fbp: getFbp(),
          fbc: getFbc(),
        },
      }),
    });

    if (!response.ok) {
      console.error('Meta CAPI error:', await response.text());
    }
  } catch (error) {
    console.error('Failed to send Meta CAPI event:', error);
  }
}

/**
 * Envoie un événement à la fois au Pixel et au CAPI (déduplication automatique)
 */
export function trackMetaEventWithCAPI(
  eventName: MetaStandardEvent,
  params?: MetaEventParams,
  userData?: Partial<MetaUserData>
): void {
  const eventId = generateEventId();

  // Envoyer au Pixel avec event_id
  if (typeof window !== 'undefined' && window.fbq && hasMarketingConsent()) {
    window.fbq('track', eventName, { ...params, eventID: eventId });
  }

  // Envoyer au CAPI
  sendMetaCAPIEvent({
    eventName,
    eventId,
    customData: params,
    userData,
  });
}
