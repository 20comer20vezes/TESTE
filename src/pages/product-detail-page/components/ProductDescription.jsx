import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductDescription = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Descrição', icon: 'FileText' },
    { id: 'details', label: 'Detalhes', icon: 'Info' },
    { id: 'shipping', label: 'Entrega', icon: 'Truck' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-4">
            <p className="text-muted-foreground font-caption leading-relaxed">
              {product.description}
            </p>
            <div className="space-y-3">
              <h4 className="font-heading font-medium text-foreground">Ocasiões Recomendadas:</h4>
              <div className="flex flex-wrap gap-2">
                {product.occasions.map((occasion, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full font-caption"
                  >
                    {occasion}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <h4 className="font-heading font-medium text-foreground mb-2">Fixação:</h4>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }, (_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-4 rounded-sm ${
                          index < product.longevity ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground font-caption">
                    {product.longevity}/5
                  </span>
                </div>
              </div>
              <div>
                <h4 className="font-heading font-medium text-foreground mb-2">Projeção:</h4>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }, (_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-4 rounded-sm ${
                          index < product.sillage ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground font-caption">
                    {product.sillage}/5
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'details':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-caption text-muted-foreground">Marca:</span>
                  <span className="font-medium">{product.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-caption text-muted-foreground">Família Olfativa:</span>
                  <span className="font-medium">{product.family}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-caption text-muted-foreground">Concentração:</span>
                  <span className="font-medium">{product.concentration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-caption text-muted-foreground">Gênero:</span>
                  <span className="font-medium">{product.gender}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-caption text-muted-foreground">Ano de Lançamento:</span>
                  <span className="font-medium">{product.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-caption text-muted-foreground">Perfumista:</span>
                  <span className="font-medium">{product.perfumer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-caption text-muted-foreground">País de Origem:</span>
                  <span className="font-medium">{product.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-caption text-muted-foreground">Código:</span>
                  <span className="font-medium font-mono text-sm">{product.sku}</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'shipping':
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-heading font-medium text-foreground">Opções de Entrega:</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <Icon name="Truck" size={20} className="text-primary" />
                    <div>
                      <p className="font-medium">Frete Grátis</p>
                      <p className="text-sm text-muted-foreground font-caption">
                        Para compras acima de R$ 199,00
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">5-7 dias úteis</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <Icon name="Zap" size={20} className="text-accent" />
                    <div>
                      <p className="font-medium">Entrega Expressa</p>
                      <p className="text-sm text-muted-foreground font-caption">
                        Receba em até 2 dias úteis
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">R$ 19,90</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <Icon name="MapPin" size={20} className="text-success" />
                    <div>
                      <p className="font-medium">Retirada na Loja</p>
                      <p className="text-sm text-muted-foreground font-caption">
                        Disponível em 2 horas
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-success">Grátis</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <h4 className="font-heading font-medium text-foreground mb-3">Política de Troca:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground font-caption">
                <li className="flex items-start space-x-2">
                  <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span>30 dias para trocas e devoluções</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span>Produto deve estar lacrado e sem uso</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                  <span>Embalagem original preservada</span>
                </li>
              </ul>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-luxury ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductDescription;