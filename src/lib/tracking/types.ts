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

export {};
