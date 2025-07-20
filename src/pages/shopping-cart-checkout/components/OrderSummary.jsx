import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ 
  subtotal, 
  discount, 
  shipping, 
  total, 
  itemCount,
  promoCode,
  onPromoCodeChange,
  onApplyPromo,
  promoError,
  promoSuccess 
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="bg-card rounded-lg border border-border luxury-shadow-sm p-6">
      <h2 className="font-heading font-semibold text-lg text-foreground mb-4">
        Resumo do Pedido
      </h2>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})
          </span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-success">Desconto</span>
            <span className="text-success font-medium">-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Frete</span>
          <span className="font-medium">
            {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
          </span>
        </div>

        <div className="border-t border-border pt-3">
          <div className="flex justify-between">
            <span className="font-heading font-semibold text-foreground">Total</span>
            <span className="font-heading font-semibold text-lg text-foreground">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Promo Code Section */}
      <div className="border-t border-border pt-4">
        <div className="space-y-3">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Código promocional"
              value={promoCode}
              onChange={(e) => onPromoCodeChange(e.target.value)}
              className="flex-1 h-10 px-3 bg-input border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-luxury"
            />
            <button
              onClick={onApplyPromo}
              className="px-4 h-10 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-luxury"
            >
              Aplicar
            </button>
          </div>

          {promoError && (
            <div className="flex items-center space-x-2 text-sm text-error">
              <Icon name="AlertCircle" size={16} />
              <span>{promoError}</span>
            </div>
          )}

          {promoSuccess && (
            <div className="flex items-center space-x-2 text-sm text-success">
              <Icon name="CheckCircle" size={16} />
              <span>{promoSuccess}</span>
            </div>
          )}
        </div>
      </div>

      {/* Trust Signals */}
      <div className="border-t border-border pt-4 mt-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Shield" size={14} />
            <span>Compra 100% segura</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Truck" size={14} />
            <span>Frete grátis acima de R$ 199</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="RotateCcw" size={14} />
            <span>Troca grátis em 30 dias</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;