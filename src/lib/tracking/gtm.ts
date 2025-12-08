/**
 * Utilitaires Google Tag Manager et Consent Mode V2
 */

import type { DataLayerEvent, ConsentState, CookiePreferences } from './types';

const COOKIE_PREFERENCES_KEY = 'monster-phone-cookie-preferences';

/**
 * Pousse un événement dans le dataLayer
 */
export function pushToDataLayer(event: DataLayerEvent): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

/**
 * Efface les données e-commerce précédentes avant un nouvel événement
 * (Recommandé par Google pour éviter la pollution des données)
 */
export function clearEcommerceData(): void {
  pushToDataLayer({ ecommerce: null });
}

/**
 * Initialise le Consent Mode V2 avec les valeurs par défaut (tout refusé)
 * DOIT être appelé AVANT le chargement de GTM
 */
export function initializeConsentMode(): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];

  // Fonction gtag pour le consent mode
  // Note: gtag utilise un format spécial où les arguments sont poussés comme un array
  function gtag(...args: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window.dataLayer as any[]).push(args);
  }

  // Définir gtag sur window pour utilisation ultérieure
  window.gtag = gtag;

  // Défauts : tout refusé en attendant le consentement
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'wait_for_update': 500, // Attendre 500ms pour le consentement
  });

  // Vérifier si un consentement existe déjà en localStorage
  const savedPreferences = getSavedCookiePreferences();
  if (savedPreferences) {
    updateConsentFromPreferences(savedPreferences);
  }
}

/**
 * Récupère les préférences de cookies sauvegardées
 */
export function getSavedCookiePreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;

  try {
    const saved = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (saved) {
      return JSON.parse(saved) as CookiePreferences;
    }
  } catch {
    // Ignore les erreurs de parsing
  }
  return null;
}

/**
 * Met à jour le Consent Mode à partir des préférences utilisateur
 */
export function updateConsentFromPreferences(preferences: CookiePreferences): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  const consentState: ConsentState = {
    analytics_storage: preferences.analytics ? 'granted' : 'denied',
    ad_storage: preferences.marketing ? 'granted' : 'denied',
    ad_user_data: preferences.marketing ? 'granted' : 'denied',
    ad_personalization: preferences.marketing ? 'granted' : 'denied',
  };

  window.gtag('consent', 'update', consentState);

  // Pousser un événement pour que GTM puisse déclencher des tags
  pushToDataLayer({
    event: 'consent_update',
    consent_analytics: preferences.analytics,
    consent_marketing: preferences.marketing,
  });
}

/**
 * Vérifie si le consentement analytics est accordé
 */
export function hasAnalyticsConsent(): boolean {
  const preferences = getSavedCookiePreferences();
  return preferences?.analytics ?? false;
}

/**
 * Vérifie si le consentement marketing est accordé
 */
export function hasMarketingConsent(): boolean {
  const preferences = getSavedCookiePreferences();
  return preferences?.marketing ?? false;
}

/**
 * Génère l'ID GTM à partir des variables d'environnement
 */
export function getGtmId(): string | undefined {
  return process.env.NEXT_PUBLIC_GTM_ID;
}

/**
 * Génère l'ID GA4 à partir des variables d'environnement
 */
export function getGa4Id(): string | undefined {
  return process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
}
