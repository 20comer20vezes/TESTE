import React from 'react';
import Icon from '../../../components/AppIcon';

const DeliveryOptions = ({ selectedOption, onOptionChange }) => {
  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Entrega Padrão',
      description: 'Correios - 5 a 8 dias úteis',
      price: 0,
      icon: 'Package'
    },
    {
      id: 'express',
      name: 'Entrega Expressa',
      description: 'Transportadora - 2 a 3 dias úteis',
      price: 15.90,
      icon: 'Zap'
    },
    {
      id: 'same-day',
      name: 'Entrega no Mesmo Dia',
      description: 'Disponível para SP capital - até 18h',
      price: 29.90,
      icon: 'Clock'
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="bg-card rounded-lg border border-border luxury-shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Truck" size={20} className="text-primary" />
        <h2 className="font-heading font-semibold text-lg text-foreground">
          Opções de Entrega
        </h2>
      </div>

      <div className="space-y-3">
        {deliveryOptions.map((option) => (
          <label
            key={option.id}
            className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-luxury ${
              selectedOption === option.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
          >
            <input
              type="radio"
              name="delivery"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={(e) => onOptionChange(e.target.value)}
              className="sr-only"
            />
            
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              selectedOption === option.id
                ? 'border-primary' :'border-muted-foreground'
            }`}>
              {selectedOption === option.id && (
                <div className="w-2 h-2 bg-primary rounded-full" />
              )}
            </div>

            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              selectedOption === option.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              <Icon name={option.icon} size={16} />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">{option.name}</h3>
                <span className="font-heading font-semibold text-foreground">
                  {option.price === 0 ? 'Grátis' : formatPrice(option.price)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{option.description}</p>
            </div>
          </label>
        ))}
      </div>

      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Informações importantes:</p>
            <ul className="space-y-1 text-xs">
              <li>• Frete grátis para pedidos acima de R$ 199</li>
              <li>• Entrega no mesmo dia disponível apenas para SP capital</li>
              <li>• Prazo de entrega não inclui finais de semana</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOptions;