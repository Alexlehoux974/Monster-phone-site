'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import ComptePageContent from './compte-content';

// Force dynamic rendering - disable prerendering/caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ComptePage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <ComptePageContent />
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
