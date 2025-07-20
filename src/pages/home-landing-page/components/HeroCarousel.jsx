import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroCarousel = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1920&h=800&fit=crop",
      title: "Nova Coleção Primavera",
      subtitle: "Descubra fragrâncias florais que despertam seus sentidos",
      description: "Perfumes exclusivos com notas de jasmim, peônia e bergamota",
      ctaText: "Explorar Coleção",
      ctaAction: () => navigate('/product-catalog-browse?collection=primavera'),
      discount: "30% OFF"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1920&h=800&fit=crop",
      title: "Fragrâncias Exclusivas",
      subtitle: "Edição limitada de perfumes artesanais",
      description: "Criações únicas desenvolvidas por perfumistas renomados",
      ctaText: "Ver Exclusivos",
      ctaAction: () => navigate('/product-catalog-browse?category=exclusivos'),
      badge: "LIMITADO"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=1920&h=800&fit=crop",
      title: "Presentes Especiais",
      subtitle: "Kits e embalagens para presentear",
      description: "Conjuntos elegantes com embalagem premium",
      ctaText: "Ver Presentes",
      ctaAction: () => navigate('/product-catalog-browse?category=presentes'),
      highlight: "FRETE GRÁTIS"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-muted">
      {/* Slides */}
      <div className="relative w-full h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="container mx-auto px-4 lg:px-6">
                  <div className="max-w-2xl text-center text-white">
                    {/* Badge */}
                    {slide.discount && (
                      <div className="inline-flex items-center px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full mb-4">
                        {slide.discount}
                      </div>
                    )}
                    {slide.badge && (
                      <div className="inline-flex items-center px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full mb-4">
                        {slide.badge}
                      </div>
                    )}
                    {slide.highlight && (
                      <div className="inline-flex items-center px-3 py-1 bg-success text-success-foreground text-sm font-medium rounded-full mb-4">
                        {slide.highlight}
                      </div>
                    )}
                    
                    <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
                      {slide.title}
                    </h1>
                    
                    <p className="text-lg md:text-xl mb-2 opacity-90">
                      {slide.subtitle}
                    </p>
                    
                    <p className="text-sm md:text-base mb-8 opacity-80 font-caption">
                      {slide.description}
                    </p>
                    
                    <Button
                      variant="default"
                      size="lg"
                      onClick={slide.ctaAction}
                      className="bg-white text-foreground hover:bg-white/90"
                    >
                      {slide.ctaText}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-luxury"
        aria-label="Slide anterior"
      >
        <Icon name="ChevronLeft" size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-luxury"
        aria-label="Próximo slide"
      >
        <Icon name="ChevronRight" size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-luxury ${
              index === currentSlide
                ? 'bg-white' :'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;