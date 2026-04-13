import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContextSimple";
import StructuredData from "@/components/StructuredData";
import { Toaster } from "sonner";
import CookieConsent from "@/components/CookieConsent";
import FloatingContact from "@/components/FloatingContact";
import GoogleTagManager, { GoogleTagManagerNoscript } from "@/components/tracking/GoogleTagManager";
import MetaPixel from "@/components/tracking/MetaPixel";
import PageViewTracker from "@/components/tracking/PageViewTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Monster Phone Boutique | Téléphones & Multimédia La Réunion 974",
    template: "%s | Monster Phone Boutique"
  },
  description: "Monster Phone Boutique - Spécialiste smartphones HONOR, accessoires MUVIT et multimédia à La Réunion. Service après-vente, livraison gratuite dès 100€.",
  keywords: ["Monster Phone", "smartphones", "HONOR", "MUVIT", "La Réunion", "974", "accessoires téléphone", "multimédia", "écouteurs", "montres connectées"],
  authors: [{ name: "Monster Phone Boutique" }],
  creator: "Monster Phone Boutique",
  publisher: "Monster Phone Boutique",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://monster-phone.re'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://monster-phone.re',
    siteName: 'Monster Phone Boutique',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@monsterphone974',
    creator: '@monsterphone974',
  },
  verification: {
    google: 'GAc5MnONdB2RrX_xzWG2d24tMIH6-Vp4DkZw8jhvP_0',
  },
  category: 'e-commerce',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Favicon configuration for Google and browsers */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#E31E24" />
        <StructuredData type="organization" />
        <StructuredData type="website" />
        {/* Google Tag Manager avec Consent Mode V2 */}
        <GoogleTagManager />
        {/* Meta Pixel avec gestion du consentement */}
        <MetaPixel />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        {/* Lien d'accessibilité : aller au contenu principal */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-lg"
        >
          Aller au contenu principal
        </a>
        {/* GTM noscript fallback */}
        <GoogleTagManagerNoscript />
        <PageViewTracker />
        <AuthProvider>
          <CartProvider>
            <main id="main-content">
              {children}
            </main>
            <Toaster position="bottom-right" richColors />
            <FloatingContact />
            <CookieConsent />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
