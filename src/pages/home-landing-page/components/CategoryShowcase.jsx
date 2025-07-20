import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CategoryShowcase = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Florais",
      description: "Fragrâncias delicadas e femininas",
      image: "https://images.pexels.com/photos/1055379/pexels-photo-1055379.jpeg?w=400&h=300&fit=crop",
      productCount: 45,
      color: "bg-pink-50",
      route: "/product-catalog-browse?category=florais"
    },
    {
      id: 2,
      name: "Amadeirados",
      description: "Perfumes sofisticados e marcantes",
      image: "https://images.pixabay.com/photo/2020/05/11/22/31/perfume-5160517_1280.jpg?w=400&h=300&fit=crop",
      productCount: 32,
      color: "bg-amber-50",
      route: "/product-catalog-browse?category=amadeirados"
    },
    {
      id: 3,
      name: "Cítricos",
      description: "Frescor e energia para o dia",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=300&fit=crop",
      productCount: 28,
      color: "bg-yellow-50",
      route: "/product-catalog-browse?category=citricos"
    },
    {
      id: 4,
      name: "Orientais",
      description: "Mistério e sensualidade",
      image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?w=400&h=300&fit=crop",
      productCount: 38,
      color: "bg-purple-50",
      route: "/product-catalog-browse?category=orientais"
    }
  ];

  const handleCategoryClick = (category) => {
    navigate(category.route);
  };

  return (
    <section className="py-12 lg:py-16 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            Explore por Categoria
          </h2>
          <p className="text-muted-foreground font-caption max-w-2xl mx-auto">
            Encontre a fragrância perfeita navegando pelas nossas categorias cuidadosamente selecionadas
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="bg-card rounded-lg overflow-hidden luxury-shadow-sm hover:luxury-shadow-md transition-luxury">
                {/* Category Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-luxury"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-luxury" />
                  
                  {/* Product Count Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-foreground text-xs px-2 py-1 rounded-full font-medium">
                    {category.productCount} produtos
                  </div>
                </div>

                {/* Category Info */}
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-luxury">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground font-caption text-sm mb-4">
                    {category.description}
                  </p>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto font-medium text-primary hover:text-primary/80"
                    iconName="ArrowRight"
                    iconPosition="right"
                    iconSize={16}
                  >
                    Explorar categoria
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special Collections */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground mb-4">
                  Coleções Especiais
                </h3>
                <p className="text-muted-foreground font-caption mb-6">
                  Descubra nossas coleções exclusivas criadas em parceria com perfumistas renomados. 
                  Fragrâncias únicas que contam histórias e despertam emoções.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="default"
                    onClick={() => navigate('/product-catalog-browse?collection=exclusiva')}
                    iconName="Sparkles"
                    iconPosition="left"
                  >
                    Ver Coleção Exclusiva
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/product-catalog-browse?collection=limitada')}
                    iconName="Clock"
                    iconPosition="left"
                  >
                    Edição Limitada
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="h-32 bg-primary/20 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-heading font-semibold">Exclusiva</span>
                    </div>
                    <div className="h-20 bg-accent/20 rounded-lg flex items-center justify-center">
                      <span className="text-accent font-heading font-medium text-sm">Artesanal</span>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="h-20 bg-success/20 rounded-lg flex items-center justify-center">
                      <span className="text-success font-heading font-medium text-sm">Natural</span>
                    </div>
                    <div className="h-32 bg-secondary/40 rounded-lg flex items-center justify-center">
                      <span className="text-secondary-foreground font-heading font-semibold">Premium</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;