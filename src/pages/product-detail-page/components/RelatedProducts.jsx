import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ currentProduct }) => {
  const navigate = useNavigate();

  const relatedProducts = [
    {
      id: 2,
      name: "Essence of Rose",
      brand: "Chanel",
      price: 329.90,
      originalPrice: 399.90,
      image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 89,
      isNew: false,
      discount: 18
    },
    {
      id: 3,
      name: "Midnight Garden",
      brand: "Tom Ford",
      price: 459.90,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop",
      rating: 4.9,
      reviewCount: 156,
      isNew: true,
      discount: 0
    },
    {
      id: 4,
      name: "Golden Amber",
      brand: "Dior",
      price: 389.90,
      originalPrice: 449.90,
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop",
      rating: 4.6,
      reviewCount: 67,
      isNew: false,
      discount: 13
    },
    {
      id: 5,
      name: "Ocean Breeze",
      brand: "Hermès",
      price: 299.90,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
      rating: 4.4,
      reviewCount: 43,
      isNew: false,
      discount: 0
    }
  ];

  const handleProductClick = (productId) => {
    navigate(`/product-detail-page?id=${productId}`);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    // Add to cart logic would go here
    console.log('Added to cart:', product);
  };

  const handleToggleWishlist = (product, e) => {
    e.stopPropagation();
    // Toggle wishlist logic would go here
    console.log('Toggled wishlist:', product);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={index < Math.floor(rating) ? 'text-accent fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Produtos Relacionados
        </h2>
        <Button
          onClick={() => navigate('/product-catalog-browse')}
          variant="ghost"
          iconName="ArrowRight"
          iconPosition="right"
          className="text-primary hover:text-primary/80"
        >
          Ver todos
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className="group bg-card rounded-lg border border-border overflow-hidden cursor-pointer transition-luxury hover:luxury-shadow-md"
          >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-luxury"
              />
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col space-y-1">
                {product.isNew && (
                  <span className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full font-caption font-medium">
                    Novo
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full font-caption font-medium">
                    -{product.discount}%
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={(e) => handleToggleWishlist(product, e)}
                className="absolute top-2 right-2 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-background transition-luxury opacity-0 group-hover:opacity-100"
              >
                <Icon name="Heart" size={16} />
              </button>

              {/* Quick Add Button */}
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-luxury">
                <Button
                  onClick={(e) => handleAddToCart(product, e)}
                  size="sm"
                  fullWidth
                  iconName="ShoppingBag"
                  iconPosition="left"
                  className="bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm"
                >
                  Adicionar
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-3 space-y-2">
              <div>
                <p className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
                  {product.brand}
                </p>
                <h3 className="font-medium text-foreground text-sm line-clamp-1">
                  {product.name}
                </h3>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1">
                <div className="flex items-center space-x-0.5">
                  {renderStars(product.rating)}
                </div>
                <span className="text-xs text-muted-foreground font-caption">
                  ({product.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="font-heading font-semibold text-foreground">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;