/**
 * Helpers pour les événements e-commerce GA4 + Meta
 */

import { pushToDataLayer, clearEcommerceData } from './gtm';
import {
  trackMetaViewContent,
  trackMetaAddToCart,
  trackMetaInitiateCheckout,
  trackMetaPurchase,
  generateEventId,
  sendMetaCAPIEvent,
} from './meta';
import type {
  GA4Item,
  ViewItemParams,
  AddToCartParams,
  BeginCheckoutParams,
  PurchaseParams,
  MetaContentItem,
} from './types';

const DEFAULT_CURRENCY = 'EUR';

/**
 * Convertit un produit en item GA4
 */
export function createGA4Item(params: ViewItemParams & { quantity?: number }): GA4Item {
  return {
    item_id: params.item_id,
    item_name: params.item_name,
    item_brand: params.item_brand,
    item_category: params.item_category,
    item_variant: params.item_variant,
    price: params.price,
    quantity: params.quantity ?? 1,
  };
}

/**
 * Événement view_item - Quand un utilisateur voit un produit
 * Envoie à GA4 + Meta Pixel + CAPI
 */
export function trackViewItem(params: ViewItemParams): void {
  // GA4
  clearEcommerceData();
  pushToDataLayer({
    event: 'view_item',
    ecommerce: {
      currency: DEFAULT_CURRENCY,
      value: params.price,
      items: [createGA4Item(params)],
    },
  });

  // Meta Pixel (ViewContent)
  trackMetaViewContent({
    content_id: params.item_id,
    content_name: params.item_name,
    content_category: params.item_category,
    value: params.price,
    currency: DEFAULT_CURRENCY,
  });

  // Meta CAPI
  const eventId = generateEventId();
  sendMetaCAPIEvent({
    eventName: 'ViewContent',
    eventId,
    customData: {
      content_ids: [params.item_id],
      content_name: params.item_name,
      content_category: params.item_category,
      content_type: 'product',
      value: params.price,
      currency: DEFAULT_CURRENCY,
    },
  });
}

/**
 * Événement add_to_cart - Quand un utilisateur ajoute au panier
 * Envoie à GA4 + Meta Pixel + CAPI
 */
export function trackAddToCart(params: AddToCartParams): void {
  // GA4
  clearEcommerceData();
  const item = createGA4Item(params);
  pushToDataLayer({
    event: 'add_to_cart',
    ecommerce: {
      currency: DEFAULT_CURRENCY,
      value: params.price * params.quantity,
      items: [item],
    },
  });

  // Meta Pixel (AddToCart)
  trackMetaAddToCart({
    content_id: params.item_id,
    content_name: params.item_name,
    value: params.price,
    quantity: params.quantity,
    currency: DEFAULT_CURRENCY,
  });

  // Meta CAPI
  const eventId = generateEventId();
  sendMetaCAPIEvent({
    eventName: 'AddToCart',
    eventId,
    customData: {
      content_ids: [params.item_id],
      content_name: params.item_name,
      content_type: 'product',
      contents: [{ id: params.item_id, quantity: params.quantity, item_price: params.price }],
      value: params.price * params.quantity,
      currency: DEFAULT_CURRENCY,
    },
  });
}

/**
 * Événement remove_from_cart - Quand un utilisateur retire du panier
 */
export function trackRemoveFromCart(params: AddToCartParams): void {
  clearEcommerceData();

  const item = createGA4Item(params);

  pushToDataLayer({
    event: 'remove_from_cart',
    ecommerce: {
      currency: DEFAULT_CURRENCY,
      value: params.price * params.quantity,
      items: [item],
    },
  });
}

/**
 * Événement view_cart - Quand un utilisateur voit son panier
 */
export function trackViewCart(items: GA4Item[], value: number): void {
  clearEcommerceData();

  pushToDataLayer({
    event: 'view_cart',
    ecommerce: {
      currency: DEFAULT_CURRENCY,
      value,
      items,
    },
  });
}

/**
 * Événement begin_checkout - Quand un utilisateur commence le checkout
 * Envoie à GA4 + Meta Pixel + CAPI
 */
export function trackBeginCheckout(params: BeginCheckoutParams): void {
  // GA4
  clearEcommerceData();
  pushToDataLayer({
    event: 'begin_checkout',
    ecommerce: {
      currency: params.currency ?? DEFAULT_CURRENCY,
      value: params.value,
      items: params.items,
    },
  });

  // Préparer les données pour Meta
  const contentIds = params.items.map(item => item.item_id);
  const contents: MetaContentItem[] = params.items.map(item => ({
    id: item.item_id,
    quantity: item.quantity,
    item_price: item.price,
  }));
  const numItems = params.items.reduce((sum, item) => sum + item.quantity, 0);

  // Meta Pixel (InitiateCheckout)
  trackMetaInitiateCheckout({
    content_ids: contentIds,
    contents,
    value: params.value,
    num_items: numItems,
    currency: params.currency ?? DEFAULT_CURRENCY,
  });

  // Meta CAPI
  const eventId = generateEventId();
  sendMetaCAPIEvent({
    eventName: 'InitiateCheckout',
    eventId,
    customData: {
      content_ids: contentIds,
      content_type: 'product',
      contents,
      value: params.value,
      num_items: numItems,
      currency: params.currency ?? DEFAULT_CURRENCY,
    },
  });
}

/**
 * Événement add_shipping_info - Quand l'utilisateur ajoute ses infos de livraison
 */
export function trackAddShippingInfo(params: BeginCheckoutParams & { shipping_tier?: string }): void {
  clearEcommerceData();

  pushToDataLayer({
    event: 'add_shipping_info',
    ecommerce: {
      currency: params.currency ?? DEFAULT_CURRENCY,
      value: params.value,
      items: params.items,
    },
  });
}

/**
 * Événement add_payment_info - Quand l'utilisateur ajoute ses infos de paiement
 */
export function trackAddPaymentInfo(params: BeginCheckoutParams & { payment_type?: string }): void {
  clearEcommerceData();

  pushToDataLayer({
    event: 'add_payment_info',
    ecommerce: {
      currency: params.currency ?? DEFAULT_CURRENCY,
      value: params.value,
      items: params.items,
    },
  });
}

/**
 * Événement purchase - Quand un achat est confirmé
 * Envoie à GA4 + Meta Pixel + CAPI
 */
export function trackPurchase(params: PurchaseParams): void {
  // GA4
  clearEcommerceData();
  pushToDataLayer({
    event: 'purchase',
    ecommerce: {
      transaction_id: params.transaction_id,
      currency: params.currency ?? DEFAULT_CURRENCY,
      value: params.value,
      tax: params.tax,
      shipping: params.shipping,
      items: params.items,
    },
  });

  // Préparer les données pour Meta
  const contentIds = params.items.map(item => item.item_id);
  const contents: MetaContentItem[] = params.items.map(item => ({
    id: item.item_id,
    quantity: item.quantity,
    item_price: item.price,
  }));
  const numItems = params.items.reduce((sum, item) => sum + item.quantity, 0);

  // Meta Pixel (Purchase)
  trackMetaPurchase({
    content_ids: contentIds,
    contents,
    value: params.value,
    num_items: numItems,
    currency: params.currency ?? DEFAULT_CURRENCY,
  });

  // Meta CAPI
  const eventId = generateEventId();
  sendMetaCAPIEvent({
    eventName: 'Purchase',
    eventId,
    customData: {
      content_ids: contentIds,
      content_type: 'product',
      contents,
      value: params.value,
      num_items: numItems,
      currency: params.currency ?? DEFAULT_CURRENCY,
    },
  });
}

/**
 * Événement view_item_list - Quand un utilisateur voit une liste de produits
 */
export function trackViewItemList(items: GA4Item[], listName: string, listId?: string): void {
  clearEcommerceData();

  const value = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  pushToDataLayer({
    event: 'view_item_list',
    ecommerce: {
      currency: DEFAULT_CURRENCY,
      value,
      item_list_id: listId,
      item_list_name: listName,
      items,
    },
  });
}

/**
 * Événement select_item - Quand un utilisateur clique sur un produit dans une liste
 */
export function trackSelectItem(item: GA4Item, listName: string, listId?: string): void {
  clearEcommerceData();

  pushToDataLayer({
    event: 'select_item',
    ecommerce: {
      currency: DEFAULT_CURRENCY,
      item_list_id: listId,
      item_list_name: listName,
      items: [item],
    },
  });
}
