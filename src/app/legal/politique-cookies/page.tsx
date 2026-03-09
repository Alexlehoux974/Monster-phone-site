'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Cookie, Shield, BarChart3, Megaphone, CreditCard, Calendar, Settings } from 'lucide-react';

export default function PolitiqueCookiesPage() {
  useEffect(() => {
    document.title = 'Politique de Cookies | Monster Phone Boutique';
  }, []);

  const openCookieSettings = () => {
    window.dispatchEvent(new CustomEvent('openCookieSettings'));
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <div className="pt-[110px]">
          <Header />
        </div>

        <main className="px-4 sm:px-6 lg:px-8 py-8 pb-16">
          <div className="max-w-4xl mx-auto">

            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Cookie className="w-4 h-4" />
                COOKIES & TRACEURS
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Politique de Cookies
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transparence sur les cookies et traceurs utilises sur Monster Phone Boutique
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <Calendar className="w-4 h-4 inline mr-1" />
                Derniere mise a jour : 9 mars 2026
              </div>
            </motion.div>

            {/* Bouton gerer mes cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 text-center"
            >
              <button
                onClick={openCookieSettings}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium shadow-lg shadow-blue-600/25"
              >
                <Settings className="w-5 h-5" />
                Gerer mes preferences de cookies
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border p-8"
            >
              <div className="prose prose-gray max-w-none">

                {/* 1. Qu'est-ce qu'un cookie */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Cookie className="w-6 h-6 text-orange-600" />
                  1. Qu&apos;est-ce qu&apos;un cookie ?
                </h2>
                <p>
                  Un cookie est un petit fichier texte depose sur votre terminal (ordinateur, smartphone, tablette)
                  lors de la visite d&apos;un site web. Il permet au site de memoriser des informations sur votre visite,
                  comme votre langue preferee ou vos preferences d&apos;affichage, afin de faciliter votre prochaine visite.
                </p>
                <p>
                  Conformement a la reglementation europeenne (RGPD) et aux recommandations de la CNIL,
                  nous vous informons de maniere transparente sur les cookies utilises sur notre site et
                  vous permettons de les accepter ou de les refuser.
                </p>

                {/* 2. Cookies essentiels */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-green-600" />
                  2. Cookies strictement necessaires
                </h2>
                <p>
                  Ces cookies sont indispensables au fonctionnement du site. Ils ne peuvent pas etre desactives.
                </p>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-green-50">
                        <th className="text-left py-3 px-4 border border-green-200 font-semibold text-green-900">Cookie</th>
                        <th className="text-left py-3 px-4 border border-green-200 font-semibold text-green-900">Finalite</th>
                        <th className="text-left py-3 px-4 border border-green-200 font-semibold text-green-900">Duree</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border border-gray-200 font-mono text-xs">monster-phone-cookie-consent</td>
                        <td className="py-2 px-4 border border-gray-200">Enregistre votre choix de consentement cookies</td>
                        <td className="py-2 px-4 border border-gray-200">13 mois</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-2 px-4 border border-gray-200 font-mono text-xs">monster-phone-cookie-preferences</td>
                        <td className="py-2 px-4 border border-gray-200">Stocke vos preferences detaillees (analytiques, marketing)</td>
                        <td className="py-2 px-4 border border-gray-200">13 mois</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border border-gray-200 font-mono text-xs">sb-*-auth-token</td>
                        <td className="py-2 px-4 border border-gray-200">Session d&apos;authentification Supabase (connexion compte)</td>
                        <td className="py-2 px-4 border border-gray-200">Session</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-2 px-4 border border-gray-200 font-mono text-xs">mp-admin-auth</td>
                        <td className="py-2 px-4 border border-gray-200">Session d&apos;administration (acces panneau admin)</td>
                        <td className="py-2 px-4 border border-gray-200">Session</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 3. Cookies analytiques */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  3. Cookies analytiques (mesure d&apos;audience)
                </h2>
                <p>
                  Ces cookies nous permettent de mesurer l&apos;audience du site et de comprendre comment les visiteurs
                  l&apos;utilisent, afin d&apos;ameliorer son fonctionnement. Ils ne sont deposes qu&apos;avec votre consentement.
                </p>
                <p className="text-sm text-gray-500 italic">
                  Fournisseur : Google (Google Analytics 4 via Google Tag Manager)
                </p>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-blue-50">
                        <th className="text-left py-3 px-4 border border-blue-200 font-semibold text-blue-900">Cookie</th>
                        <th className="text-left py-3 px-4 border border-blue-200 font-semibold text-blue-900">Finalite</th>
                        <th className="text-left py-3 px-4 border border-blue-200 font-semibold text-blue-900">Duree</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border border-gray-200 font-mono text-xs">_ga</td>
                        <td className="py-2 px-4 border border-gray-200">Identifiant unique Google Analytics pour distinguer les visiteurs</td>
                        <td className="py-2 px-4 border border-gray-200">13 mois</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-2 px-4 border border-gray-200 font-mono text-xs">_ga_*</td>
                        <td className="py-2 px-4 border border-gray-200">Identifiant de session Google Analytics 4</td>
                        <td className="py-2 px-4 border border-gray-200">13 mois</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border border-gray-200 font-mono text-xs">_gid</td>
                        <td className="py-2 px-4 border border-gray-200">Identifiant temporaire pour regrouper les pages vues</td>
                        <td className="py-2 px-4 border border-gray-200">24 heures</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 4. Cookies marketing */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8 flex items-center gap-2">
                  <Megaphone className="w-6 h-6 text-purple-600" />
                  4. Cookies marketing (publicite ciblee)
                </h2>
                <p>
                  Ces cookies permettent d&apos;afficher des publicites personnalisees en fonction de votre navigation.
                  Ils ne sont deposes qu&apos;avec votre consentement.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">4.1 Meta Pixel (Facebook / Instagram)</h3>
                <p className="text-sm text-gray-500 italic">
                  Fournisseur : Meta Platforms, Inc.
                </p>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-purple-50">
                        <th className="text-left py-3 px-4 border border-purple-200 font-semibold text-purple-900">Cookie</th>
                        <th className="text-left py-3 px-4 border border-purple-200 font-semibold text-purple-900">Finalite</th>
                        <th className="text-left py-3 px-4 border border-purple-200 font-semibold text-purple-900">Duree</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border border-gray-200 font-mono text-xs">_fbp</td>
                        <td className="py-2 px-4 border border-gray-200">Identifiant du navigateur pour le suivi publicitaire Meta</td>
                        <td className="py-2 px-4 border border-gray-200">3 mois</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-2 px-4 border border-gray-200 font-mono text-xs">_fbc</td>
                        <td className="py-2 px-4 border border-gray-200">Stocke le clic publicitaire Facebook (fbclid)</td>
                        <td className="py-2 px-4 border border-gray-200">3 mois</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4">
                  <h4 className="font-semibold text-purple-900 mb-2">Meta Conversion API (CAPI)</h4>
                  <p className="text-sm text-purple-900">
                    En complement du Meta Pixel, nous utilisons la <strong>Conversion API</strong> de Meta.
                    Cette technologie envoie les evenements de conversion (consultation produit, ajout au panier, achat)
                    directement depuis notre serveur vers les serveurs de Meta, de maniere securisee.
                    Elle permet une mesure plus fiable des performances publicitaires. Les donnees envoyees
                    sont limitees aux evenements de commerce et sont soumises a votre consentement marketing.
                    Un identifiant de deduplication (event_id) empeche le double comptage entre le Pixel et la CAPI.
                  </p>
                </div>

                {/* 5. Cookies paiement */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-emerald-600" />
                  5. Cookies de paiement
                </h2>
                <p>
                  Ces cookies sont deposes par notre prestataire de paiement <strong>Stripe</strong> lors du processus
                  de commande. Ils sont necessaires a la securisation des transactions et a la prevention de la fraude.
                </p>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-emerald-50">
                        <th className="text-left py-3 px-4 border border-emerald-200 font-semibold text-emerald-900">Cookie</th>
                        <th className="text-left py-3 px-4 border border-emerald-200 font-semibold text-emerald-900">Finalite</th>
                        <th className="text-left py-3 px-4 border border-emerald-200 font-semibold text-emerald-900">Duree</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border border-gray-200 font-mono text-xs">__stripe_mid</td>
                        <td className="py-2 px-4 border border-gray-200">Identifiant machine pour la prevention de fraude Stripe</td>
                        <td className="py-2 px-4 border border-gray-200">1 an</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-2 px-4 border border-gray-200 font-mono text-xs">__stripe_sid</td>
                        <td className="py-2 px-4 border border-gray-200">Identifiant de session pour la securisation du paiement</td>
                        <td className="py-2 px-4 border border-gray-200">30 minutes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 6. Gerer vos cookies */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8 flex items-center gap-2">
                  <Settings className="w-6 h-6 text-gray-600" />
                  6. Comment gerer vos cookies ?
                </h2>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">6.1 Via notre bandeau de consentement</h3>
                <p>
                  Lors de votre premiere visite, un bandeau vous permet d&apos;accepter ou de refuser les cookies par categorie.
                  Vous pouvez modifier vos choix a tout moment en cliquant sur le bouton ci-dessous ou sur le lien
                  &laquo; Gerer mes cookies &raquo; present dans le pied de page du site.
                </p>
                <div className="mt-4 mb-4">
                  <button
                    onClick={openCookieSettings}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-colors text-sm font-medium"
                  >
                    <Settings className="w-4 h-4" />
                    Modifier mes preferences
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">6.2 Via votre navigateur</h3>
                <p>
                  Vous pouvez egalement configurer votre navigateur pour accepter, refuser ou supprimer les cookies.
                  Voici les liens vers les instructions des principaux navigateurs :
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li><strong>Chrome</strong> : Parametres &gt; Confidentialite et securite &gt; Cookies</li>
                  <li><strong>Firefox</strong> : Parametres &gt; Vie privee et securite &gt; Cookies</li>
                  <li><strong>Safari</strong> : Preferences &gt; Confidentialite &gt; Cookies</li>
                  <li><strong>Edge</strong> : Parametres &gt; Cookies et autorisations de site</li>
                </ul>
                <p className="text-sm text-gray-500 mt-2">
                  Note : la desactivation de certains cookies peut affecter le fonctionnement du site
                  (panier, connexion a votre compte).
                </p>

                {/* 7. Base legale */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">7. Base legale et references</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Reglement (UE) 2016/679</strong> (RGPD) - Protection des donnees personnelles</li>
                  <li><strong>Directive 2002/58/CE</strong> (ePrivacy) - Vie privee et communications electroniques</li>
                  <li><strong>Loi n°78-17 du 6 janvier 1978</strong> modifiee (Informatique et Libertes)</li>
                  <li><strong>Recommandations CNIL</strong> du 17 septembre 2020 sur les cookies et traceurs</li>
                </ul>

                {/* 8. Contact */}
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Contact</h3>
                  <p className="text-blue-900 text-sm">
                    Pour toute question relative a notre politique de cookies, contactez-nous :<br />
                    Email : <strong>contact@monster-phone.re</strong><br />
                    Courrier : Monster Phone Boutique - 16 Rue Claude Chappe, ZAE 2000 - 97290 Le Port Cedex<br />
                    Vous pouvez egalement deposer une reclamation aupres de la <strong>CNIL</strong> : www.cnil.fr
                  </p>
                </div>

              </div>
            </motion.div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
