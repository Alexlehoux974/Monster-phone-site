'use client';

import { useCallback } from 'react';
import { useCookieConsent } from '@/components/CookieConsent';
import {
  trackViewItem,
  trackAddToCart,
  trackRemoveFromCart,
  trackViewCart,
  trackBeginCheckout,
  trackPurchase,
  trackViewItemList,
  trackSelectItem,
  createGA4Item,
} from '@/lib/tracking/events';
import type {
  ViewItemParams,
  AddToCartParams,
  BeginCheckoutParams,
  PurchaseParams,
  GA4Item,
} from '@/lib/tracking/types';

/**
 * Hook pour le tracking e-commerce
 * Vérifie automatiquement le consentement avant d'envoyer les événements
 */
export function useTracking() {
  const consent = useCookieConsent();
  const hasAnalyticsConsent = consent?.analytics ?? false;

  // View Item - Quand un utilisateur voit un produit
  const trackProductView = useCallback(
    (params: ViewItemParams) => {
      if (!hasAnalyticsConsent) return;
      trackViewItem(params);
    },
    [hasAnalyticsConsent]
  );

  // Add to Cart
  const trackCartAdd = useCallback(
    (params: AddToCartParams) => {
      if (!hasAnalyticsConsent) return;
      trackAddToCart(params);
    },
    [hasAnalyticsConsent]
  );

  // Remove from Cart
  const trackCartRemove = useCallback(
    (params: AddToCartParams) => {
      if (!hasAnalyticsConsent) return;
      trackRemoveFromCart(params);
    },
    [hasAnalyticsConsent]
  );

  // View Cart
  const trackCartView = useCallback(
    (items: GA4Item[], value: number) => {
      if (!hasAnalyticsConsent) return;
      trackViewCart(items, value);
    },
    [hasAnalyticsConsent]
  );

  // Begin Checkout
  const trackCheckoutStart = useCallback(
    (params: BeginCheckoutParams) => {
      if (!hasAnalyticsConsent) return;
      trackBeginCheckout(params);
    },
    [hasAnalyticsConsent]
  );

  // Purchase
  const trackOrderPurchase = useCallback(
    (params: PurchaseParams) => {
      if (!hasAnalyticsConsent) return;
      trackPurchase(params);
    },
    [hasAnalyticsConsent]
  );

  // View Item List
  const trackProductListView = useCallback(
    (items: GA4Item[], listName: string, listId?: string) => {
      if (!hasAnalyticsConsent) return;
      trackViewItemList(items, listName, listId);
    },
    [hasAnalyticsConsent]
  );

  // Select Item
  const trackProductSelect = useCallback(
    (item: GA4Item, listName: string, listId?: string) => {
      if (!hasAnalyticsConsent) return;
      trackSelectItem(item, listName, listId);
    },
    [hasAnalyticsConsent]
  );

  return {
    hasAnalyticsConsent,
    trackProductView,
    trackCartAdd,
    trackCartRemove,
    trackCartView,
    trackCheckoutStart,
    trackOrderPurchase,
    trackProductListView,
    trackProductSelect,
    createGA4Item,
  };
}

export default useTracking;
