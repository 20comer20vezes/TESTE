import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatsCard from './StatsCard';

const AnalyticsDashboard = ({ isPreview }) => {
  const [dateRange, setDateRange] = useState('30days');
  
  // Mock analytics data
  const analyticsData = {
    revenue: {
      current: 45679.90,
      previous: 42150.30,
      trend: '+8.4%'
    },
    orders: {
      current: 156,
      previous: 139,
      trend: '+12.2%'
    },
    customers: {
      current: 1247,
      previous: 1089,
      trend: '+14.5%'
    },
    conversionRate: {
      current: 3.2,
      previous: 2.8,
      trend: '+14.3%'
    },
    topProducts: [
      { name: 'Chanel No. 5', sales: 156, revenue: 46724.40 },
      { name: 'Dior Sauvage', sales: 134, revenue: 46886.60 },
      { name: 'Tom Ford Black Orchid', sales: 89, revenue: 53391.10 },
      { name: 'Versace Bright Crystal', sales: 67, revenue: 13393.30 }
    ],
    salesByCategory: [
      { category: 'Feminino', percentage: 45, sales: 267, revenue: 32500.50 },
      { category: 'Masculino', percentage: 35, sales: 189, revenue: 28450.20 },
      { category: 'Unissex', percentage: 20, sales: 98, revenue: 15729.20 }
    ],
    recentActivity: [
      { type: 'order', message: 'Novo pedido #LUX-156 criado', time: '2 min atrás' },
      { type: 'user', message: 'Novo usuário cadastrado: Ana Silva', time: '5 min atrás' },
      { type: 'product', message: 'Estoque baixo: Tom Ford Black Orchid', time: '10 min atrás' },
      { type: 'order', message: 'Pedido #LUX-155 enviado', time: '15 min atrás' }
    ]
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'order': return 'ShoppingCart';
      case 'user': return 'UserPlus';
      case 'product': return 'Package';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'order': return 'text-success';
      case 'user': return 'text-primary';
      case 'product': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {isPreview && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Eye" size={18} className="text-primary" />
            <p className="text-sm text-primary font-medium">
              Modo de Visualização - Os dados mostrados são exemplos para demonstração
            </p>
          </div>
        </div>
      )}

      {/* Header and Date Range */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Analytics e Relatórios
          </h2>
          <p className="text-muted-foreground mt-1">
            Insights detalhados sobre o desempenho da plataforma
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="7days">Últimos 7 dias</option>
            <option value="30days">Últimos 30 dias</option>
            <option value="90days">Últimos 90 dias</option>
            <option value="1year">Último ano</option>
          </select>
          <Button variant="outline">
            <Icon name="Download" size={18} className="mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Receita Total"
          value={`R$ ${analyticsData.revenue.current.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon="DollarSign"
          trend={analyticsData.revenue.trend}
          trendUp={true}
          description="Comparado ao período anterior"
        />
        <StatsCard
          title="Pedidos"
          value={analyticsData.orders.current}
          icon="ShoppingCart"
          trend={analyticsData.orders.trend}
          trendUp={true}
          description="Total de pedidos"
        />
        <StatsCard
          title="Novos Clientes"
          value={analyticsData.customers.current}
          icon="Users"
          trend={analyticsData.customers.trend}
          trendUp={true}
          description="Usuários registrados"
        />
        <StatsCard
          title="Taxa de Conversão"
          value={`${analyticsData.conversionRate.current}%`}
          icon="TrendingUp"
          trend={analyticsData.conversionRate.trend}
          trendUp={true}
          description="Visitantes que compraram"
        />
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-lg font-semibold text-foreground">
              Produtos Mais Vendidos
            </h3>
            <Icon name="TrendingUp" size={20} className="text-primary" />
          </div>
          <div className="space-y-4">
            {analyticsData.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} vendas</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">
                    R$ {product.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-lg font-semibold text-foreground">
              Vendas por Categoria
            </h3>
            <Icon name="PieChart" size={20} className="text-primary" />
          </div>
          <div className="space-y-4">
            {analyticsData.salesByCategory.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{category.category}</span>
                  <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{category.sales} vendas</span>
                  <span>R$ {category.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading text-lg font-semibold text-foreground">
            Atividade Recente
          </h3>
          <Button size="sm" variant="outline">
            Ver Todas
          </Button>
        </div>
        <div className="space-y-4">
          {analyticsData.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 hover:bg-muted/50 rounded-lg transition-luxury">
              <div className={`p-2 rounded-full bg-muted/50 ${getActivityColor(activity.type)}`}>
                <Icon name={getActivityIcon(activity.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;