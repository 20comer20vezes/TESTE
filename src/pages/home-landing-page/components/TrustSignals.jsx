import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: "Truck",
      title: "Frete Grátis",
      description: "Em compras acima de R$ 199",
      color: "text-success"
    },
    {
      icon: "Shield",
      title: "100% Autêntico",
      description: "Produtos originais garantidos",
      color: "text-primary"
    },
    {
      icon: "RotateCcw",
      title: "Troca Fácil",
      description: "30 dias para trocar ou devolver",
      color: "text-accent"
    },
    {
      icon: "CreditCard",
      title: "Pagamento Seguro",
      description: "PIX, cartão ou boleto",
      color: "text-warning"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Maria Silva",
      location: "São Paulo, SP",
      rating: 5,
      comment: "Produtos maravilhosos e entrega super rápida! Já sou cliente há 2 anos e sempre fico satisfeita.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Ana Costa",
      location: "Rio de Janeiro, RJ",
      rating: 5,
      comment: "A qualidade dos perfumes é excepcional. Comprei o Chanel No. 5 e chegou perfeitamente embalado.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Carla Mendes",
      location: "Belo Horizonte, MG",
      rating: 5,
      comment: "Atendimento impecável e produtos originais. Recomendo de olhos fechados!",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face"
    }
  ];

  const certifications = [
    {
      name: "SSL Seguro",
      icon: "Lock",
      description: "Certificado de segurança"
    },
    {
      name: "Reclame Aqui",
      icon: "Award",
      description: "Nota 9.2/10"
    },
    {
      name: "Google Reviews",
      icon: "Star",
      description: "4.8 estrelas"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < rating ? "text-accent fill-current" : "text-muted-foreground"}
      />
    ));
  };

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Trust Features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 ${feature.color} bg-current/10 rounded-full flex items-center justify-center`}>
                <Icon name={feature.icon} size={32} className={feature.color} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground font-caption">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Customer Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              O que nossas clientes dizem
            </h2>
            <p className="text-muted-foreground font-caption max-w-2xl mx-auto">
              Mais de 50.000 mulheres já escolheram a LuxeFragrance para suas fragrâncias favoritas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-card rounded-lg p-6 luxury-shadow-sm">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                  <div>
                    <h4 className="font-medium text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground font-caption">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-sm text-muted-foreground font-caption italic">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-muted/30 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
              Compre com Confiança
            </h3>
            <p className="text-muted-foreground font-caption">
              Certificações e garantias que comprovam nossa qualidade e segurança
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name={cert.icon} size={24} />
                </div>
                <h4 className="font-medium text-foreground mb-1">
                  {cert.name}
                </h4>
                <p className="text-sm text-muted-foreground font-caption">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Trust Info */}
          <div className="mt-8 pt-8 border-t border-border text-center">
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground font-caption">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} />
                <span>+50.000 clientes satisfeitas</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Package" size={16} />
                <span>+100.000 pedidos entregues</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} />
                <span>5 anos no mercado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;