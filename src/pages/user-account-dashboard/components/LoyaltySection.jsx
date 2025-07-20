import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LoyaltySection = ({ loyaltyData, pointsHistory, availableRewards }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tiers = [
    { name: 'Bronze', min: 0, max: 4999, color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
    { name: 'Prata', min: 5000, max: 14999, color: 'text-gray-600', bgColor: 'bg-gray-50', borderColor: 'border-gray-200' },
    { name: 'Ouro', min: 15000, max: 29999, color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
    { name: 'Platina', min: 30000, max: 49999, color: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
    { name: 'Diamante', min: 50000, max: Infinity, color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' }
  ];

  const currentTier = tiers.find(tier => loyaltyData.totalPoints >= tier.min && loyaltyData.totalPoints <= tier.max);
  const nextTier = tiers.find(tier => tier.min > loyaltyData.totalPoints);
  const progressToNext = nextTier ? ((loyaltyData.totalPoints - currentTier.min) / (nextTier.min - currentTier.min)) * 100 : 100;

  const benefits = {
    Bronze: [
      'Pontos em todas as compras',
      'Aniversário com desconto especial',
      'Acesso a promoções exclusivas'
    ],
    Prata: [
      'Frete grátis em compras acima de R$ 199',
      'Desconto de 5% em produtos selecionados',
      'Acesso antecipado a liquidações',
      'Amostras grátis em todos os pedidos'
    ],
    Ouro: [
      'Frete grátis em todas as compras',
      'Desconto de 10% em produtos selecionados',
      'Consultoria personalizada de fragrâncias',
      'Convites para eventos exclusivos'
    ],
    Platina: [
      'Desconto de 15% em toda a loja',
      'Atendimento prioritário',
      'Produtos exclusivos da categoria Platina',
      'Embalagem premium gratuita'
    ],
    Diamante: [
      'Desconto de 20% em toda a loja',
      'Personal shopper dedicado',
      'Acesso a fragrâncias limitadas',
      'Experiências VIP e eventos privados'
    ]
  };

  const handleRedeemReward = (rewardId) => {
    // Mock redeem functionality
    console.log('Redeeming reward:', rewardId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'earned': return 'Plus';
      case 'redeemed': return 'Minus';
      case 'expired': return 'Clock';
      default: return 'Circle';
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'earned': return 'text-success';
      case 'redeemed': return 'text-primary';
      case 'expired': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-heading font-semibold text-2xl text-foreground">
          Programa Fidelidade
        </h2>
        <p className="text-muted-foreground">
          Acumule pontos e desfrute de benefícios exclusivos
        </p>
      </div>

      {/* Current Status Card */}
      <div className={`${currentTier.bgColor} ${currentTier.borderColor} border rounded-lg p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
              <Icon name="Crown" size={24} className="text-accent-foreground" />
            </div>
            <div>
              <h3 className={`font-heading font-semibold text-xl ${currentTier.color}`}>
                Nível {currentTier.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Membro desde {formatDate(loyaltyData.memberSince)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-heading font-bold text-accent">
              {loyaltyData.availablePoints.toLocaleString('pt-BR')}
            </div>
            <p className="text-sm text-muted-foreground">pontos disponíveis</p>
          </div>
        </div>

        {/* Progress to Next Tier */}
        {nextTier && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progresso para {nextTier.name}</span>
              <span className="text-foreground font-medium">
                {loyaltyData.totalPoints.toLocaleString('pt-BR')} / {nextTier.min.toLocaleString('pt-BR')}
              </span>
            </div>
            <div className="w-full bg-white/50 rounded-full h-3 mb-2">
              <div 
                className="bg-accent h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progressToNext, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Faltam {(nextTier.min - loyaltyData.totalPoints).toLocaleString('pt-BR')} pontos para o próximo nível
            </p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-luxury ${
            activeTab === 'overview' ?'bg-background text-foreground luxury-shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Visão Geral
        </button>
        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-luxury ${
            activeTab === 'rewards' ?'bg-background text-foreground luxury-shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Recompensas
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-luxury ${
            activeTab === 'history' ?'bg-background text-foreground luxury-shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Histórico
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="TrendingUp" size={24} className="text-success" />
              </div>
              <div className="text-2xl font-heading font-semibold text-foreground mb-1">
                {loyaltyData.totalPoints.toLocaleString('pt-BR')}
              </div>
              <p className="text-sm text-muted-foreground">Total de Pontos Ganhos</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Gift" size={24} className="text-primary" />
              </div>
              <div className="text-2xl font-heading font-semibold text-foreground mb-1">
                {loyaltyData.redeemedRewards}
              </div>
              <p className="text-sm text-muted-foreground">Recompensas Resgatadas</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="ShoppingBag" size={24} className="text-accent" />
              </div>
              <div className="text-2xl font-heading font-semibold text-foreground mb-1">
                R$ {loyaltyData.totalSaved.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-sm text-muted-foreground">Total Economizado</p>
            </div>
          </div>

          {/* Current Tier Benefits */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
              Seus Benefícios Atuais - Nível {currentTier.name}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits[currentTier.name].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-success" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Tier Preview */}
          {nextTier && (
            <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg p-6 border border-accent/10">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                Próximo Nível - {nextTier.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Desbloqueie estes benefícios adicionais:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits[nextTier.name].slice(benefits[currentTier.name].length).map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Icon name="Star" size={16} className="text-accent" />
                    <span className="text-sm text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How to Earn Points */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
              Como Ganhar Pontos
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="ShoppingCart" size={20} className="text-primary" />
                  <span className="text-sm text-foreground">Compras na loja</span>
                </div>
                <span className="text-sm font-medium text-accent">1 ponto = R$ 1,00</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Star" size={20} className="text-primary" />
                  <span className="text-sm text-foreground">Avaliação de produtos</span>
                </div>
                <span className="text-sm font-medium text-accent">50 pontos</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Users" size={20} className="text-primary" />
                  <span className="text-sm text-foreground">Indicação de amigos</span>
                </div>
                <span className="text-sm font-medium text-accent">500 pontos</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Calendar" size={20} className="text-primary" />
                  <span className="text-sm text-foreground">Aniversário</span>
                </div>
                <span className="text-sm font-medium text-accent">200 pontos</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rewards Tab */}
      {activeTab === 'rewards' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableRewards.map((reward) => (
              <div key={reward.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name={reward.icon} size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{reward.title}</h4>
                    <p className="text-sm text-muted-foreground">{reward.description}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Custo:</span>
                    <span className="font-semibold text-accent">
                      {reward.pointsCost.toLocaleString('pt-BR')} pontos
                    </span>
                  </div>
                  {reward.value && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Valor:</span>
                      <span className="text-sm text-foreground">
                        R$ {reward.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  variant={loyaltyData.availablePoints >= reward.pointsCost ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleRedeemReward(reward.id)}
                  disabled={loyaltyData.availablePoints < reward.pointsCost}
                  iconName="Gift"
                  iconPosition="left"
                  className="w-full"
                >
                  {loyaltyData.availablePoints >= reward.pointsCost ? 'Resgatar' : 'Pontos Insuficientes'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {pointsHistory.map((transaction) => (
            <div key={transaction.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'earned' ? 'bg-success/10' : 
                    transaction.type === 'redeemed' ? 'bg-primary/10' : 'bg-error/10'
                  }`}>
                    <Icon 
                      name={getTransactionIcon(transaction.type)} 
                      size={20} 
                      className={getTransactionColor(transaction.type)} 
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{transaction.description}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(transaction.date)}
                      {transaction.orderId && ` • Pedido #${transaction.orderId}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`font-semibold ${
                    transaction.type === 'earned' ? 'text-success' : 
                    transaction.type === 'redeemed' ? 'text-primary' : 'text-error'
                  }`}>
                    {transaction.type === 'earned' ? '+' : '-'}{transaction.points.toLocaleString('pt-BR')}
                  </span>
                  <p className="text-xs text-muted-foreground">pontos</p>
                </div>
              </div>
            </div>
          ))}

          {pointsHistory.length === 0 && (
            <div className="text-center py-12">
              <Icon name="History" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                Nenhuma transação encontrada
              </h3>
              <p className="text-muted-foreground">
                Suas atividades de pontos aparecerão aqui
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoyaltySection;