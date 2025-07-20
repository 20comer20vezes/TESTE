import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OverviewSection = ({ userInfo, recentOrders, wishlistItems, onSectionChange }) => {
  const quickActions = [
    { id: 'orders', label: 'Ver Pedidos', icon: 'Package', count: recentOrders.length },
    { id: 'wishlist', label: 'Lista de Desejos', icon: 'Heart', count: wishlistItems.length },
    { id: 'profile', label: 'Editar Perfil', icon: 'User' },
    { id: 'support', label: 'Suporte', icon: 'HelpCircle' }
  ];

  const recommendations = [
    {
      id: 1,
      name: "Chanel No. 5 Eau de Parfum",
      brand: "Chanel",
      price: 899.90,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop",
      reason: "Baseado no seu histórico de compras"
    },
    {
      id: 2,
      name: "Dior J'adore Infinissime",
      brand: "Dior",
      price: 749.90,
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300&h=300&fit=crop",
      reason: "Fragrância floral similar às suas favoritas"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading font-semibold text-2xl text-foreground mb-2">
              Bem-vinda, {userInfo.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-muted-foreground">
              Gerencie sua conta e descubra novas fragrâncias exclusivas
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Membro desde</div>
              <div className="font-medium text-foreground">{userInfo.memberSince}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => onSectionChange(action.id)}
            className="p-4 bg-card border border-border rounded-lg hover:luxury-shadow-md transition-luxury group"
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-luxury">
                <Icon name={action.icon} size={24} className="text-primary" />
              </div>
              <span className="font-caption font-medium text-sm text-foreground">
                {action.label}
              </span>
              {action.count !== undefined && (
                <span className="text-xs text-muted-foreground">
                  {action.count} {action.count === 1 ? 'item' : 'itens'}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Account Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Pedidos Recentes
            </h3>
            <button
              onClick={() => onSectionChange('orders')}
              className="text-primary hover:text-primary/80 transition-luxury"
            >
              <Icon name="ArrowRight" size={20} />
            </button>
          </div>
          <div className="space-y-3">
            {recentOrders.slice(0, 2).map((order) => (
              <div key={order.id} className="flex items-center space-x-3">
                <Image
                  src={order.items[0].image}
                  alt={order.items[0].name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    Pedido #{order.id}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.date} • {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loyalty Status */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Status Fidelidade
            </h3>
            <Icon name="Star" size={20} className="text-accent" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-heading font-semibold text-accent mb-2">
              {userInfo.loyaltyPoints.toLocaleString('pt-BR')}
            </div>
            <p className="text-sm text-muted-foreground mb-3">pontos acumulados</p>
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-500"
                style={{ width: `${(userInfo.loyaltyPoints % 5000) / 5000 * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {(5000 - (userInfo.loyaltyPoints % 5000)).toLocaleString('pt-BR')} pontos para o próximo nível
            </p>
          </div>
        </div>

        {/* Wishlist Preview */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Lista de Desejos
            </h3>
            <button
              onClick={() => onSectionChange('wishlist')}
              className="text-primary hover:text-primary/80 transition-luxury"
            >
              <Icon name="ArrowRight" size={20} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {wishlistItems.slice(0, 4).map((item) => (
              <div key={item.id} className="relative group">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-full h-20 rounded-lg object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-luxury rounded-lg flex items-center justify-center">
                  <Icon name="Heart" size={16} className="text-white" />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item salvo' : 'itens salvos'}
          </p>
        </div>
      </div>

      {/* Personalized Recommendations */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Recomendações Personalizadas
            </h3>
            <p className="text-sm text-muted-foreground">
              Fragrâncias selecionadas especialmente para você
            </p>
          </div>
          <Icon name="Sparkles" size={24} className="text-accent" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {recommendations.map((product) => (
            <div key={product.id} className="flex space-x-4 p-4 border border-border rounded-lg hover:luxury-shadow-sm transition-luxury">
              <Image
                src={product.image}
                alt={product.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">{product.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                <p className="text-xs text-muted-foreground mb-2">{product.reason}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-accent">
                    R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <button className="text-primary hover:text-primary/80 transition-luxury">
                    <Icon name="Plus" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Member Benefits */}
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-6 border border-accent/20">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Crown" size={24} className="text-accent" />
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Benefícios Exclusivos
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <Icon name="Truck" size={32} className="text-accent mx-auto mb-2" />
            <h4 className="font-medium text-foreground mb-1">Frete Grátis</h4>
            <p className="text-xs text-muted-foreground">Em compras acima de R$ 299</p>
          </div>
          <div className="text-center">
            <Icon name="Gift" size={32} className="text-accent mx-auto mb-2" />
            <h4 className="font-medium text-foreground mb-1">Amostras Grátis</h4>
            <p className="text-xs text-muted-foreground">Em todos os pedidos</p>
          </div>
          <div className="text-center">
            <Icon name="Calendar" size={32} className="text-accent mx-auto mb-2" />
            <h4 className="font-medium text-foreground mb-1">Acesso Antecipado</h4>
            <p className="text-xs text-muted-foreground">Lançamentos exclusivos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;