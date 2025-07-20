import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Por favor, insira seu e-mail');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Por favor, insira um e-mail válido');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }, 1000);
  };

  const benefits = [
    {
      icon: "Gift",
      title: "15% de desconto",
      description: "Na sua primeira compra"
    },
    {
      icon: "Bell",
      title: "Novidades em primeira mão",
      description: "Seja a primeira a saber dos lançamentos"
    },
    {
      icon: "Star",
      title: "Ofertas exclusivas",
      description: "Promoções especiais para assinantes"
    },
    {
      icon: "Heart",
      title: "Dicas de beleza",
      description: "Conteúdo exclusivo sobre fragrâncias"
    }
  ];

  if (isSubscribed) {
    return (
      <section className="py-12 lg:py-16 bg-primary/5">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-success text-success-foreground rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Check" size={32} />
            </div>
            <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              Bem-vinda ao nosso clube!
            </h2>
            <p className="text-muted-foreground font-caption">
              Obrigada por se inscrever! Você receberá seu cupom de 15% de desconto por e-mail em alguns minutos.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16 bg-primary/5">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl luxury-shadow-md overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Form */}
              <div className="p-8 lg:p-12">
                <div className="mb-8">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                    <Icon name="Mail" size={24} />
                  </div>
                  <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground mb-4">
                    Ganhe 15% de desconto
                  </h2>
                  <p className="text-muted-foreground font-caption">
                    Inscreva-se na nossa newsletter e receba ofertas exclusivas, novidades e dicas de beleza diretamente no seu e-mail.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    label="Seu melhor e-mail"
                    placeholder="exemplo@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error}
                    required
                  />
                  
                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    fullWidth
                    loading={isLoading}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    {isLoading ? 'Inscrevendo...' : 'Quero meu desconto'}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground font-caption mt-4">
                  Ao se inscrever, você concorda em receber e-mails promocionais. 
                  Você pode cancelar a inscrição a qualquer momento.
                </p>
              </div>

              {/* Right Side - Benefits */}
              <div className="bg-muted/30 p-8 lg:p-12">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                  O que você vai receber:
                </h3>
                
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name={benefit.icon} size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-sm text-muted-foreground font-caption">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground font-caption">
                    <div className="flex items-center space-x-1">
                      <Icon name="Shield" size={16} />
                      <span>Dados protegidos</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={16} />
                      <span>+50k assinantes</span>
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

export default NewsletterSignup;