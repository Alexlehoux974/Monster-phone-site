import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContextSimple";
import StructuredData from "@/components/StructuredData";
import { Toaster } from "sonner";
import CookieConsent from "@/components/CookieConsent";
import GoogleTagManager, { GoogleTagManagerNoscript } from "@/components/tracking/GoogleTagManager";
import MetaPixel from "@/components/tracking/MetaPixel";

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
    default: "Monster Phone Boutique | Téléphones Gaming La Réunion 974",
    template: "%s | Monster Phone Boutique"
  },
  description: "Monster Phone Boutique - Spécialiste smartphones gaming HONOR, accessoires MUVIT à La Réunion. Service après-vente, livraison gratuite dès 50€.",
  keywords: ["Monster Phone", "smartphones gaming", "HONOR", "MUVIT", "La Réunion", "974", "accessoires téléphone", "gaming mobile"],
  authors: [{ name: "Monster Phone Boutique" }],
  creator: "Monster Phone Boutique",
  publisher: "Monster Phone Boutique",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://monsterphone.re'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://monsterphone.re',
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
    google: 'google-site-verification-code',
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
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
        {/* GTM noscript fallback */}
        <GoogleTagManagerNoscript />
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster position="bottom-right" richColors />
            <CookieConsent />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
