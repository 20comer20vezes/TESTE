import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call
    onUpdateQuantity(item.id, newQuantity);
    setIsUpdating(false);
  };

  const handleRemove = () => {
    onRemove(item.id);
    setShowRemoveModal(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <>
      <div className="flex items-start space-x-4 p-4 bg-card rounded-lg border border-border luxury-shadow-sm">
        <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg">
          <Image
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-medium text-foreground mb-1 truncate">
            {item.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {item.brand} • {item.size}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="xs"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={item.quantity <= 1 || isUpdating}
                iconName="Minus"
                className="w-8 h-8 p-0"
              />
              
              <span className="w-8 text-center text-sm font-medium">
                {isUpdating ? '...' : item.quantity}
              </span>
              
              <Button
                variant="outline"
                size="xs"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={isUpdating}
                iconName="Plus"
                className="w-8 h-8 p-0"
              />
            </div>

            <div className="text-right">
              <p className="font-heading font-semibold text-foreground">
                {formatPrice(item.price * item.quantity)}
              </p>
              {item.quantity > 1 && (
                <p className="text-xs text-muted-foreground">
                  {formatPrice(item.price)} cada
                </p>
              )}
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="xs"
          onClick={() => setShowRemoveModal(true)}
          iconName="Trash2"
          className="text-muted-foreground hover:text-error"
        />
      </div>

      {/* Remove Confirmation Modal */}
      {showRemoveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setShowRemoveModal(false)} />
          <div className="relative bg-background rounded-lg border border-border luxury-shadow-lg max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">
                  Remover Item
                </h3>
                <p className="text-sm text-muted-foreground">
                  Esta ação não pode ser desfeita
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Tem certeza que deseja remover <strong>{item.name}</strong> do seu carrinho?
            </p>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowRemoveModal(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={handleRemove}
                className="flex-1"
              >
                Remover
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;