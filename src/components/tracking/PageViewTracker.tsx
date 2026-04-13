'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { getSavedCookiePreferences } from '@/lib/tracking/gtm';

const SESSION_KEY = 'mp-analytics-session';

function getOrCreateSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = (globalThis.crypto?.randomUUID?.() as string | undefined)
      ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

function classifyPath(pathname: string): { page_type: string; page_ref: string | null } {
  if (pathname === '/' || pathname === '') return { page_type: 'home', page_ref: null };
  if (pathname.startsWith('/admin')) return { page_type: 'admin', page_ref: null };
  if (pathname.startsWith('/produit/')) return { page_type: 'product', page_ref: pathname.slice('/produit/'.length) };
  if (pathname.startsWith('/produits/')) return { page_type: 'collection', page_ref: pathname.slice('/produits/'.length) };
  if (pathname === '/produits' || pathname === '/produits-supabase') return { page_type: 'collection', page_ref: 'all' };
  if (pathname.startsWith('/panier') || pathname === '/cart') return { page_type: 'cart', page_ref: null };
  if (pathname.startsWith('/checkout')) return { page_type: 'checkout', page_ref: null };
  if (pathname.startsWith('/commande')) return { page_type: 'order', page_ref: null };
  return { page_type: 'other', page_ref: null };
}

export default function PageViewTracker() {
  const pathname = usePathname();
  const lastSent = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    // Ne jamais tracker les pages admin
    if (pathname.startsWith('/admin')) return;
    // Deduplication: pas deux fois la meme URL consecutivement
    if (lastSent.current === pathname) return;

    // Respect consentement analytics (coherent avec GA4/Meta Pixel)
    const prefs = getSavedCookiePreferences();
    if (!prefs || !prefs.analytics) return;

    const session_id = getOrCreateSessionId();
    const { page_type, page_ref } = classifyPath(pathname);
    const body = JSON.stringify({
      path: pathname,
      referrer: typeof document !== 'undefined' ? document.referrer || null : null,
      session_id,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      page_type,
      page_ref,
    });

    // Fire-and-forget. sendBeacon si dispo (non-blocking, survit a l'unload)
    try {
      if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
        const blob = new Blob([body], { type: 'application/json' });
        navigator.sendBeacon('/api/tracking/pageview', blob);
      } else {
        fetch('/api/tracking/pageview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
          keepalive: true,
        }).catch(() => { /* fail silent */ });
      }
      lastSent.current = pathname;
    } catch {
      // fail silent: ne jamais bloquer l'UX
    }
  }, [pathname]);

  return null;
}
