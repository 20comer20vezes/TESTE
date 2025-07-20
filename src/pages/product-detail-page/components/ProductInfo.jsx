import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product, onAddToCart, onToggleWishlist, isInWishlist }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [showInstallments, setShowInstallments] = useState(false);

  const sizes = [
    { volume: "30ml", price: 189.90 },
    { volume: "50ml", price: 289.90 },
    { volume: "100ml", price: 389.90 }
  ];

  const installmentOptions = [
    { installments: 1, value: selectedSize.price, total: selectedSize.price },
    { installments: 2, value: selectedSize.price / 2, total: selectedSize.price },
    { installments: 3, value: selectedSize.price / 3, total: selectedSize.price },
    { installments: 6, value: selectedSize.price / 6, total: selectedSize.price * 1.05 },
    { installments: 12, value: selectedSize.price / 12, total: selectedSize.price * 1.15 }
  ];

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedSize,
      quantity,
      totalPrice: selectedSize.price * quantity
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < Math.floor(rating) ? 'text-accent fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Brand and Name */}
      <div>
        <p className="text-sm font-caption text-muted-foreground uppercase tracking-wide mb-1">
          {product.brand}
        </p>
        <h1 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground">
          {product.name}
        </h1>
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1">
          {renderStars(product.rating)}
        </div>
        <span className="text-sm font-caption text-muted-foreground">
          {product.rating} ({product.reviewCount} avaliações)
        </span>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-heading font-semibold text-foreground">
            R$ {selectedSize.price.toFixed(2).replace('.', ',')}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              R$ {product.originalPrice.toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>
        
        <button
          onClick={() => setShowInstallments(!showInstallments)}
          className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-luxury"
        >
          <span>Ver parcelamento</span>
          <Icon name={showInstallments ? "ChevronUp" : "ChevronDown"} size={16} />
        </button>

        {showInstallments && (
          <div className="bg-card p-4 rounded-lg border border-border space-y-2">
            {installmentOptions.map((option) => (
              <div key={option.installments} className="flex justify-between text-sm">
                <span className="font-caption">
                  {option.installments}x de R$ {option.value.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-muted-foreground">
                  Total: R$ {option.total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Size Selection */}
      <div className="space-y-3">
        <h3 className="font-heading font-medium text-foreground">Tamanho:</h3>
        <div className="flex space-x-2">
          {sizes.map((size) => (
            <button
              key={size.volume}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 rounded-lg border transition-luxury ${
                selectedSize.volume === size.volume
                  ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-muted-foreground'
              }`}
            >
              <div className="text-center">
                <div className="font-medium">{size.volume}</div>
                <div className="text-xs text-muted-foreground">
                  R$ {size.price.toFixed(2).replace('.', ',')}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selection */}
      <div className="space-y-3">
        <h3 className="font-heading font-medium text-foreground">Quantidade:</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-luxury disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="Minus" size={16} />
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= 10}
            className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-luxury disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="Plus" size={16} />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleAddToCart}
          variant="default"
          size="lg"
          fullWidth
          iconName="ShoppingBag"
          iconPosition="left"
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Adicionar ao Carrinho - R$ {(selectedSize.price * quantity).toFixed(2).replace('.', ',')}
        </Button>

        <Button
          onClick={onToggleWishlist}
          variant="outline"
          size="lg"
          fullWidth
          iconName="Heart"
          iconPosition="left"
          className={isInWishlist ? 'border-primary text-primary' : ''}
        >
          {isInWishlist ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        </Button>
      </div>

      {/* Fragrance Notes */}
      <div className="space-y-4 pt-6 border-t border-border">
        <h3 className="font-heading font-medium text-foreground">Notas Olfativas:</h3>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Notas de Saída:</h4>
            <p className="text-sm text-muted-foreground font-caption">{product.notes.top}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Notas de Coração:</h4>
            <p className="text-sm text-muted-foreground font-caption">{product.notes.middle}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Notas de Fundo:</h4>
            <p className="text-sm text-muted-foreground font-caption">{product.notes.base}</p>
          </div>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-success" />
          <span className="text-sm font-caption">Produto Autêntico</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Truck" size={20} className="text-success" />
          <span className="text-sm font-caption">Frete Grátis</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="RotateCcw" size={20} className="text-success" />
          <span className="text-sm font-caption">Troca Garantida</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Gift" size={20} className="text-success" />
          <span className="text-sm font-caption">Embalagem Presente</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;