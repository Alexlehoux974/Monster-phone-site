import Header from '@/components/Header';
import MonsterPhoneHero from '@/components/MonsterPhoneHero';
import TrustSection from '@/components/TrustSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import FeaturesSection from '@/components/FeaturesSection';
// import CollectionsSection from '@/components/CollectionsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <MonsterPhoneHero />
      <FeaturedProducts />
      <TrustSection />
      <FeaturesSection />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}