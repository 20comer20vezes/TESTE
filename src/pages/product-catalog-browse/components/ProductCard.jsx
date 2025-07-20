import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onWishlistToggle, onQuickAdd }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted || false);
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product-detail-page?id=${product.id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onWishlistToggle(product.id, !isWishlisted);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    onQuickAdd(product);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={12} className="text-accent fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={12} className="text-accent fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-muted-foreground" />
      );
    }

    return stars;
  };

  return (
    <div
      className={`group bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-luxury ${
        isHovered ? 'luxury-shadow-md scale-[1.02]' : 'luxury-shadow-sm'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-luxury duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-luxury"
        >
          <Icon
            name="Heart"
            size={16}
            className={`transition-luxury ${
              isWishlisted ? 'text-error fill-current' : 'text-muted-foreground hover:text-foreground'
            }`}
          />
        </button>

        {/* Sale Badge */}
        {product.isOnSale && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-error text-error-foreground text-xs font-medium rounded-full">
            -{product.discountPercentage}%
          </div>
        )}

        {/* New Badge */}
        {product.isNew && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
            Novo
          </div>
        )}

        {/* Quick Add Button - Shows on Hover */}
        <div className={`absolute bottom-3 left-3 right-3 transition-luxury ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <Button
            onClick={handleQuickAdd}
            size="sm"
            className="w-full bg-background/90 text-foreground hover:bg-background backdrop-blur-sm"
          >
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        {/* Brand */}
        <p className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
          {product.brand}
        </p>

        {/* Name */}
        <h3 className="font-heading font-medium text-foreground line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          {product.isOnSale ? (
            <>
              <span className="font-semibold text-foreground">
                R$ {product.salePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                R$ {product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </>
          ) : (
            <span className="font-semibold text-foreground">
              R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>

        {/* Installments */}
        {product.installments && (
          <p className="text-xs text-muted-foreground">
            ou {product.installments.count}x de R$ {product.installments.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} sem juros
          </p>
        )}

        {/* Size Options */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex items-center gap-1 pt-1">
            <span className="text-xs text-muted-foreground">Tamanhos:</span>
            {product.sizes.map((size, index) => (
              <span key={index} className="text-xs text-muted-foreground">
                {size}{index < product.sizes.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;