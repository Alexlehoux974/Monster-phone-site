/**
 * Types TypeScript pour le tracking GA4 e-commerce
 */

// Déclaration globale pour gtag et dataLayer
declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
    gtag: (...args: unknown[]) => void;
  }
}

// Structure d'un événement dataLayer
export interface DataLayerEvent {
  event?: string;
  ecommerce?: GA4EcommerceData | null;
  [key: string]: unknown;
}

// Structure e-commerce GA4
export interface GA4EcommerceData {
  currency?: string;
  value?: number;
  transaction_id?: string;
  tax?: number;
  shipping?: number;
  items: GA4Item[];
  item_list_id?: string;
  item_list_name?: string;
}

// Structure d'un item GA4
export interface GA4Item {
  item_id: string;
  item_name: string;
  item_brand?: string;
  item_category?: string;
  item_category2?: string;
  item_variant?: string;
  price: number;
  quantity: number;
  discount?: number;
}

// Événements e-commerce supportés
export type GA4EcommerceEvent =
  | 'view_item'
  | 'view_item_list'
  | 'select_item'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'view_cart'
  | 'begin_checkout'
  | 'add_shipping_info'
  | 'add_payment_info'
  | 'purchase';

// État du consentement Google
export interface ConsentState {
  ad_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
}

// Préférences de cookies (doit matcher CookieConsent.tsx)
export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

// Paramètres pour les événements de tracking
export interface ViewItemParams {
  item_id: string;
  item_name: string;
  item_brand?: string;
  item_category?: string;
  item_variant?: string;
  price: number;
}

export interface AddToCartParams extends ViewItemParams {
  quantity: number;
}

export interface BeginCheckoutParams {
  items: GA4Item[];
  value: number;
  currency?: string;
}

export interface PurchaseParams {
  transaction_id: string;
  items: GA4Item[];
  value: number;
  tax?: number;
  shipping?: number;
  currency?: string;
}

// ============================================
// Types Meta Pixel / Conversion API
// ============================================

// Déclaration globale pour fbq
declare global {
  interface Window {
    fbq: FacebookPixel;
    _fbq: FacebookPixel;
  }
}

// Interface Facebook Pixel
export interface FacebookPixel {
  (command: 'init', pixelId: string, userData?: MetaUserData): void;
  (command: 'track', eventName: MetaStandardEvent, params?: MetaEventParams): void;
  (command: 'trackCustom', eventName: string, params?: MetaEventParams): void;
  (command: 'consent', action: 'grant' | 'revoke'): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: (...args: unknown[]) => void;
  loaded: boolean;
  version: string;
}

// Événements standard Meta
export type MetaStandardEvent =
  | 'PageView'
  | 'ViewContent'
  | 'Search'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'Purchase'
  | 'Lead'
  | 'CompleteRegistration';

// Paramètres d'événement Meta
export interface MetaEventParams {
  content_ids?: string[];
  content_name?: string;
  content_type?: 'product' | 'product_group';
  contents?: MetaContentItem[];
  currency?: string;
  value?: number;
  num_items?: number;
  search_string?: string;
  content_category?: string;
  [key: string]: unknown;
}

// Item pour Meta
export interface MetaContentItem {
  id: string;
  quantity: number;
  item_price?: number;
}

// Données utilisateur pour le matching avancé
export interface MetaUserData {
  em?: string; // Email hashé
  ph?: string; // Téléphone hashé
  fn?: string; // Prénom hashé
  ln?: string; // Nom hashé
  ct?: string; // Ville hashée
  st?: string; // État/région hashé
  zp?: string; // Code postal hashé
  country?: string; // Pays hashé (2 lettres)
  external_id?: string; // ID utilisateur externe
}

// Payload pour Conversion API
export interface MetaCAPIPayload {
  event_name: MetaStandardEvent | string;
  event_time: number;
  action_source: 'website' | 'email' | 'app' | 'phone_call' | 'chat' | 'physical_store' | 'system_generated' | 'other';
  event_source_url: string;
  user_data: MetaCAPIUserData;
  custom_data?: MetaEventParams;
  event_id?: string; // Pour la déduplication
  opt_out?: boolean;
}

// Données utilisateur pour CAPI (avec hachage côté serveur)
export interface MetaCAPIUserData {
  em?: string[]; // Emails hashés
  ph?: string[]; // Téléphones hashés
  fn?: string[]; // Prénoms hashés
  ln?: string[]; // Noms hashés
  ct?: string[]; // Villes hashées
  st?: string[]; // États hashés
  zp?: string[]; // Codes postaux hashés
  country?: string[]; // Pays hashés
  external_id?: string[]; // IDs externes
  client_ip_address?: string;
  client_user_agent?: string;
  fbc?: string; // Facebook click ID
  fbp?: string; // Facebook browser ID
}

// Réponse de l'API Meta
export interface MetaCAPIResponse {
  events_received: number;
  messages: string[];
  fbtrace_id: string;
}

export {};
