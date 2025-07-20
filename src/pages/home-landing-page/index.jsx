import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import HeroCarousel from './components/HeroCarousel';
import FeaturedProducts from './components/FeaturedProducts';
import CategoryShowcase from './components/CategoryShowcase';
import NewsletterSignup from './components/NewsletterSignup';
import TrustSignals from './components/TrustSignals';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';

const HomeLandingPage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'LuxeFragrance - Perfumes Premium e Fragrâncias Exclusivas';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Descubra a maior seleção de perfumes premium e fragrâncias exclusivas. Produtos autênticos, frete grátis e entrega rápida. Sua loja de confiança desde 2019.');
    }

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroCarousel />
        
        {/* Featured Products Section */}
        <FeaturedProducts />
        
        {/* Category Showcase Section */}
        <CategoryShowcase />
        
        {/* Trust Signals Section */}
        <TrustSignals />
        
        {/* Newsletter Signup Section */}
        <NewsletterSignup />
        
        {/* Social Proof Section */}
        <SocialProof />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeLandingPage;