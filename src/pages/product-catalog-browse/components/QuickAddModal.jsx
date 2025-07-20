import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const QuickAddModal = ({ isOpen, onClose, product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor, selecione um tamanho');
      return;
    }

    onAddToCart({
      ...product,
      selectedSize,
      quantity
    });

    onClose();
    setSelectedSize('');
    setQuantity(1);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-card border border-border rounded-lg luxury-shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-heading font-semibold text-lg">Adicionar ao Carrinho</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-luxury"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex gap-4 mb-6">
            <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs font-caption text-muted-foreground uppercase tracking-wide mb-1">
                {product.brand}
              </p>
              <h3 className="font-heading font-medium text-foreground mb-2 line-clamp-2">
                {product.name}
              </h3>
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
            </div>
          </div>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-3">
                Tamanho *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 text-sm border rounded-lg transition-luxury ${
                      selectedSize === size
                        ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-muted-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-3">
              Quantidade
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={decrementQuantity}
                className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:bg-muted transition-luxury"
                disabled={quantity <= 1}
              >
                <Icon name="Minus" size={16} />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:bg-muted transition-luxury"
              >
                <Icon name="Plus" size={16} />
              </button>
            </div>
          </div>

          {/* Total Price */}
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total:</span>
              <span className="font-semibold text-lg text-foreground">
                R$ {((product.isOnSale ? product.salePrice : product.price) * quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddToCart}
              className="flex-1"
              disabled={product.sizes && product.sizes.length > 0 && !selectedSize}
            >
              Adicionar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAddModal;