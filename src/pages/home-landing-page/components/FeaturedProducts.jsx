import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState(new Set());

  const featuredProducts = [
    {
      id: 1,
      name: "Chanel No. 5",
      brand: "Chanel",
      price: 450.00,
      originalPrice: 520.00,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 2847,
      isNew: false,
      isBestseller: true,
      discount: 13,
      notes: ["Rosa", "Jasmim", "Sândalo"],
      category: "Floral"
    },
    {
      id: 2,
      name: "Dior Sauvage",
      brand: "Dior",
      price: 380.00,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop",
      rating: 4.9,
      reviewCount: 1923,
      isNew: true,
      isBestseller: false,
      discount: 0,
      notes: ["Bergamota", "Pimenta", "Âmbar"],
      category: "Amadeirado"
    },
    {
      id: 3,
      name: "Tom Ford Black Orchid",
      brand: "Tom Ford",
      price: 620.00,
      originalPrice: 750.00,
      image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 856,
      isNew: false,
      isBestseller: false,
      discount: 17,
      notes: ["Orquídea", "Chocolate", "Baunilha"],
      category: "Oriental"
    },
    {
      id: 4,
      name: "Hermès Twilly",
      brand: "Hermès",
      price: 290.00,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=400&fit=crop",
      rating: 4.6,
      reviewCount: 1247,
      isNew: true,
      isBestseller: true,
      discount: 0,
      notes: ["Gengibre", "Tuberosa", "Sândalo"],
      category: "Floral"
    }
  ];

  const toggleWishlist = (productId) => {
    const newWishlist = new Set(wishlistItems);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlistItems(newWishlist);

    // Update localStorage
    const savedWishlist = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
    const updatedWishlist = newWishlist.has(productId)
      ? [...savedWishlist, productId]
      : savedWishlist.filter(id => id !== productId);
    localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
  };

  const addToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Show success feedback (you could add a toast notification here)
    console.log(`${product.name} adicionado ao carrinho`);
  };

  const handleProductClick = (productId) => {
    navigate(`/product-detail-page?id=${productId}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={14} className="text-accent fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={14} className="text-accent fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-muted-foreground" />
      );
    }

    return stars;
  };

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            Produtos em Destaque
          </h2>
          <p className="text-muted-foreground font-caption max-w-2xl mx-auto">
            Descubra nossa seleção especial de fragrâncias premium, escolhidas pelos nossos especialistas
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-lg overflow-hidden luxury-shadow-sm hover:luxury-shadow-md transition-luxury"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-luxury cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && (
                    <span className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full font-medium">
                      NOVO
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                      BESTSELLER
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full font-medium">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-luxury"
                  aria-label="Adicionar aos favoritos"
                >
                  <Icon
                    name="Heart"
                    size={16}
                    className={wishlistItems.has(product.id) ? 'text-error fill-current' : 'text-muted-foreground'}
                  />
                </button>

                {/* Quick Actions */}
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-luxury">
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleProductClick(product.id)}
                      className="flex-1 bg-white/90 backdrop-blur-sm hover:bg-white"
                      iconName="Eye"
                      iconSize={14}
                    >
                      Ver
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => addToCart(product)}
                      className="flex-1"
                      iconName="ShoppingBag"
                      iconSize={14}
                    >
                      Comprar
                    </Button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <p className="text-xs text-muted-foreground font-caption uppercase tracking-wide">
                    {product.brand}
                  </p>
                  <h3 className="font-medium text-foreground line-clamp-2 cursor-pointer hover:text-primary transition-luxury"
                      onClick={() => handleProductClick(product.id)}>
                    {product.name}
                  </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-muted-foreground font-caption">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Notes */}
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground font-caption">
                    {product.notes.slice(0, 2).join(', ')}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through font-caption">
                        R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground font-caption">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/product-catalog-browse')}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Ver Todos os Produtos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;