'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { initializeConsentMode, getGtmId } from '@/lib/tracking/gtm';

/**
 * Composant pour injecter Google Tag Manager avec Consent Mode V2
 *
 * IMPORTANT: Le Consent Mode est initialisé AVANT le chargement de GTM
 * pour respecter la conformité RGPD
 */
export default function GoogleTagManager() {
  const gtmId = getGtmId();

  useEffect(() => {
    // Initialiser le Consent Mode au montage du composant
    initializeConsentMode();
  }, []);

  if (!gtmId) {
    console.warn('GTM ID not configured. Set NEXT_PUBLIC_GTM_ID in environment variables.');
    return null;
  }

  return (
    <>
      {/* Script de configuration du Consent Mode - DOIT être avant GTM */}
      <Script
        id="gtm-consent-mode"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Consent Mode V2 - Défauts RGPD (tout refusé)
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'wait_for_update': 500
            });

            // Vérifier le consentement existant
            try {
              var saved = localStorage.getItem('monster-phone-cookie-preferences');
              if (saved) {
                var prefs = JSON.parse(saved);
                gtag('consent', 'update', {
                  'analytics_storage': prefs.analytics ? 'granted' : 'denied',
                  'ad_storage': prefs.marketing ? 'granted' : 'denied',
                  'ad_user_data': prefs.marketing ? 'granted' : 'denied',
                  'ad_personalization': prefs.marketing ? 'granted' : 'denied'
                });
              }
            } catch(e) {}
          `,
        }}
      />

      {/* Google Tag Manager Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
    </>
  );
}

/**
 * Composant noscript pour GTM (fallback pour navigateurs sans JS)
 * À placer juste après l'ouverture de <body>
 */
export function GoogleTagManagerNoscript() {
  const gtmId = getGtmId();

  if (!gtmId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
