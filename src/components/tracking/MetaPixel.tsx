'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { initializeMetaPixel } from '@/lib/tracking/meta';

/**
 * Composant pour injecter Meta Pixel avec gestion du consentement
 *
 * IMPORTANT: Le consentement est géré dynamiquement.
 * Le pixel se charge mais ne tracke pas sans consentement.
 */
export default function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  useEffect(() => {
    // Initialiser le mode consentement au montage
    initializeMetaPixel();
  }, []);

  if (!pixelId) {
    console.warn('Meta Pixel ID not configured. Set NEXT_PUBLIC_META_PIXEL_ID in environment variables.');
    return null;
  }

  return (
    <>
      {/* Script d'initialisation Meta Pixel */}
      <Script
        id="meta-pixel-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            // Vérifier le consentement avant d'initialiser
            var hasConsent = false;
            try {
              var saved = localStorage.getItem('monster-phone-cookie-preferences');
              if (saved) {
                var prefs = JSON.parse(saved);
                hasConsent = prefs.marketing === true;
              }
            } catch(e) {}

            // Initialiser le pixel
            fbq('init', '${pixelId}');

            // Révoquer le consentement si pas accordé
            if (!hasConsent) {
              fbq('consent', 'revoke');
            }

            // PageView (sera trackée seulement si consentement accordé)
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* Noscript fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

/**
 * Composant noscript pour Meta Pixel (fallback pour navigateurs sans JS)
 * À placer dans le body si besoin
 */
export function MetaPixelNoscript() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  if (!pixelId) return null;

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
