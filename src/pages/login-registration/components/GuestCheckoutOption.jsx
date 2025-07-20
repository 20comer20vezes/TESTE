import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GuestCheckoutOption = () => {
  const navigate = useNavigate();

  const handleGuestCheckout = () => {
    // Set guest mode flag
    localStorage.setItem('isGuestUser', 'true');
    localStorage.setItem('guestSessionId', `guest-${Date.now()}`);
    
    // Navigate to checkout
    navigate('/shopping-cart-checkout');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg p-6 luxury-shadow-sm">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="ShoppingBag" size={24} className="text-accent" />
          </div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
            Finalizar como Convidado
          </h3>
          <p className="text-sm text-muted-foreground font-caption">
            Continue sua compra sem criar uma conta
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3 text-sm">
            <Icon name="Check" size={16} className="text-success flex-shrink-0" />
            <span className="text-muted-foreground font-caption">Checkout rápido e seguro</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Icon name="Check" size={16} className="text-success flex-shrink-0" />
            <span className="text-muted-foreground font-caption">Acompanhe seu pedido por email</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Icon name="Check" size={16} className="text-success flex-shrink-0" />
            <span className="text-muted-foreground font-caption">Mesmas opções de pagamento</span>
          </div>
        </div>

        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={handleGuestCheckout}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continuar como Convidado
        </Button>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground font-caption">
            Você pode criar uma conta após finalizar a compra
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuestCheckoutOption;