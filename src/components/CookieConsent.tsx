'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Check } from 'lucide-react';
import Link from 'next/link';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_CONSENT_KEY = 'monster-phone-cookie-consent';
const COOKIE_PREFERENCES_KEY = 'monster-phone-cookie-preferences';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsented) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    }
  }, []);

  const saveConsent = (acceptAll: boolean) => {
    const finalPreferences = acceptAll
      ? { necessary: true, analytics: true, marketing: true }
      : preferences;

    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(finalPreferences));
    setPreferences(finalPreferences);
    setIsVisible(false);

    // Mettre à jour Google Consent Mode V2
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': finalPreferences.analytics ? 'granted' : 'denied',
        'ad_storage': finalPreferences.marketing ? 'granted' : 'denied',
        'ad_user_data': finalPreferences.marketing ? 'granted' : 'denied',
        'ad_personalization': finalPreferences.marketing ? 'granted' : 'denied',
      });
    }

    // Mettre à jour Meta Pixel consent
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      if (finalPreferences.marketing) {
        window.fbq('consent', 'grant');
      } else {
        window.fbq('consent', 'revoke');
      }
    }

    // Dispatch event for analytics initialization if accepted
    if (finalPreferences.analytics) {
      window.dispatchEvent(new CustomEvent('cookieConsentGranted', {
        detail: { analytics: true }
      }));
    }
    if (finalPreferences.marketing) {
      window.dispatchEvent(new CustomEvent('cookieConsentGranted', {
        detail: { marketing: true }
      }));
    }
  };

  const handleAcceptAll = () => {
    saveConsent(true);
  };

  const handleAcceptSelected = () => {
    saveConsent(false);
  };

  const handleRejectAll = () => {
    setPreferences({ necessary: true, analytics: false, marketing: false });
    saveConsent(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Main Banner */}
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-blue-100 rounded-xl">
                  <Cookie className="w-6 h-6 text-blue-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    🍪 Nous utilisons des cookies
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Ce site utilise des cookies pour améliorer votre expérience de navigation,
                    analyser le trafic et personnaliser le contenu. En cliquant sur « Tout accepter »,
                    vous consentez à notre utilisation des cookies.{' '}
                    <Link
                      href="/politique-de-confidentialite"
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      Politique de confidentialité
                    </Link>
                  </p>
                </div>

                <button
                  onClick={() => setIsVisible(false)}
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cookie Details */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                      {/* Necessary Cookies */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <h4 className="font-medium text-gray-900">Cookies essentiels</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Nécessaires au fonctionnement du site (panier, connexion).
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">Toujours actif</span>
                          <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1 cursor-not-allowed">
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </div>
                        </div>
                      </div>

                      {/* Analytics Cookies */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <h4 className="font-medium text-gray-900">Cookies analytiques</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Nous aident à comprendre comment vous utilisez le site.
                          </p>
                        </div>
                        <button
                          onClick={() => togglePreference('analytics')}
                          className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                            preferences.analytics ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'
                          }`}
                        >
                          <div className="w-4 h-4 bg-white rounded-full shadow" />
                        </button>
                      </div>

                      {/* Marketing Cookies */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <h4 className="font-medium text-gray-900">Cookies marketing</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Permettent d&apos;afficher des publicités personnalisées.
                          </p>
                        </div>
                        <button
                          onClick={() => togglePreference('marketing')}
                          className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                            preferences.marketing ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'
                          }`}
                        >
                          <div className="w-4 h-4 bg-white rounded-full shadow" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-xl transition-colors text-sm font-medium"
                >
                  <Settings className="w-4 h-4" />
                  {showDetails ? 'Masquer les options' : 'Personnaliser'}
                </button>

                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2.5 text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-xl transition-colors text-sm font-medium"
                >
                  Tout refuser
                </button>

                {showDetails ? (
                  <button
                    onClick={handleAcceptSelected}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors text-sm font-medium shadow-lg shadow-blue-600/25"
                  >
                    <Check className="w-4 h-4" />
                    Enregistrer mes choix
                  </button>
                ) : (
                  <button
                    onClick={handleAcceptAll}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors text-sm font-medium shadow-lg shadow-blue-600/25 sm:ml-auto"
                  >
                    <Check className="w-4 h-4" />
                    Tout accepter
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Helper hook to check consent status from other components
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (savedPreferences) {
      setConsent(JSON.parse(savedPreferences));
    }

    // Listen for consent changes
    const handleConsentChange = () => {
      const updated = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (updated) {
        setConsent(JSON.parse(updated));
      }
    };

    window.addEventListener('cookieConsentGranted', handleConsentChange);
    return () => window.removeEventListener('cookieConsentGranted', handleConsentChange);
  }, []);

  return consent;
}
