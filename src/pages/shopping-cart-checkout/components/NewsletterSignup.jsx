import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Por favor, insira seu e-mail');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor, insira um e-mail válido');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
  };

  if (isSubscribed) {
    return (
      <div className="bg-success/10 border border-success/20 rounded-lg p-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
          <h3 className="font-heading font-semibold text-foreground mb-2">
            Inscrição Realizada!
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Você receberá um cupom de 10% de desconto em seu e-mail
          </p>
          <div className="inline-flex items-center space-x-2 text-xs text-success bg-success/10 px-3 py-1 rounded-full">
            <Icon name="Gift" size={14} />
            <span>Desconto aplicado automaticamente</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-6">
      <div className="text-center mb-4">
        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
          <Icon name="Mail" size={24} className="text-primary" />
        </div>
        <h3 className="font-heading font-semibold text-foreground mb-2">
          Ganhe 10% de Desconto
        </h3>
        <p className="text-sm text-muted-foreground">
          Inscreva-se na nossa newsletter e receba ofertas exclusivas
        </p>
      </div>

      <form onSubmit={handleSubscribe} className="space-y-3">
        <Input
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          className="text-center"
        />

        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          fullWidth
          iconName="Gift"
          iconPosition="left"
        >
          {isLoading ? 'Inscrevendo...' : 'Ganhar Desconto'}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Ao se inscrever, você concorda com nossa{' '}
          <button className="text-primary hover:underline">
            Política de Privacidade
          </button>
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;