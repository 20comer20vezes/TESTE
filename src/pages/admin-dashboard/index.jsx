import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import StatsCard from './components/StatsCard';
import UserManagement from './components/UserManagement';
import ProductManagement from './components/ProductManagement';
import OrderManagement from './components/OrderManagement';
import AnalyticsDashboard from './components/AnalyticsDashboard';

const AdminDashboard = () => {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardStats, setDashboardStats] = useState({
    totalOrders: 156,
    totalRevenue: 45679.90,
    totalUsers: 1247,
    totalProducts: 89,
    pendingOrders: 12,
    lowStockProducts: 5
  });

  // TODO: Before production deployment
  // 1. Wrap protected routes with <ProtectedRoute> component
  // 2. Remove preview mode fallbacks
  // 3. Test all authentication flows
  // 4. Verify role-based access controls

  useEffect(() => {
    // Redirect non-admin users after auth loads
    if (!loading && (!user || userProfile?.role !== 'admin')) {
      navigate('/home-landing-page');
    }
  }, [user, userProfile, loading, navigate]);

  // Show loading state while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  // Preview Mode - Show content with clear indicators for development
  const isPreviewMode = !user || userProfile?.role !== 'admin';

  const tabs = [
    { id: 'overview', name: 'Visão Geral', icon: 'BarChart' },
    { id: 'users', name: 'Usuários', icon: 'Users' },
    { id: 'products', name: 'Produtos', icon: 'Package' },
    { id: 'orders', name: 'Pedidos', icon: 'ShoppingCart' },
    { id: 'analytics', name: 'Análises', icon: 'TrendingUp' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Key Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total de Pedidos"
                value={dashboardStats.totalOrders}
                icon="ShoppingCart"
                trend="+12%"
                trendUp={true}
              />
              <StatsCard
                title="Receita Total"
                value={`R$ ${dashboardStats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                icon="DollarSign"
                trend="+8%"
                trendUp={true}
              />
              <StatsCard
                title="Usuários Registrados"
                value={dashboardStats.totalUsers}
                icon="Users"
                trend="+23%"
                trendUp={true}
              />
              <StatsCard
                title="Produtos Ativos"
                value={dashboardStats.totalProducts}
                icon="Package"
                trend="+5%"
                trendUp={true}
              />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-lg font-semibold">Pedidos Pendentes</h3>
                  <span className="bg-warning/10 text-warning px-2 py-1 rounded-full text-sm font-medium">
                    {dashboardStats.pendingOrders}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Pedidos aguardando processamento
                </p>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setActiveTab('orders')}
                  className="w-full"
                >
                  Ver Pedidos
                </Button>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-lg font-semibold">Estoque Baixo</h3>
                  <span className="bg-error/10 text-error px-2 py-1 rounded-full text-sm font-medium">
                    {dashboardStats.lowStockProducts}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Produtos com estoque crítico
                </p>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setActiveTab('products')}
                  className="w-full"
                >
                  Ver Produtos
                </Button>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-lg font-semibold">Ações Rápidas</h3>
                  <Icon name="Zap" size={18} className="text-accent" />
                </div>
                <div className="space-y-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setActiveTab('products')}
                    className="w-full justify-start"
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    Adicionar Produto
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setActiveTab('users')}
                    className="w-full justify-start"
                  >
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Gerenciar Usuários
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'users':
        return <UserManagement isPreview={isPreviewMode} />;
      case 'products':
        return <ProductManagement isPreview={isPreviewMode} />;
      case 'orders':
        return <OrderManagement isPreview={isPreviewMode} />;
      case 'analytics':
        return <AnalyticsDashboard isPreview={isPreviewMode} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Preview Mode Banner */}
      {isPreviewMode && (
        <div className="bg-primary/10 border-b border-primary/20 px-4 py-3">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Eye" size={18} className="text-primary" />
                <div>
                  <p className="font-medium text-primary">Modo de Visualização - Painel Admin</p>
                  <p className="text-sm text-primary/80">
                    Esta é uma prévia do painel administrativo. Faça login como admin para acesso completo.
                  </p>
                </div>
              </div>
              <Button 
                size="sm"
                onClick={() => navigate('/login-registration')}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Fazer Login
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Painel Administrativo
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerencie sua plataforma LuxeFragrance
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">
                {isPreviewMode ? 'Modo Visualização' : userProfile?.full_name}
              </p>
              <p className="text-xs text-muted-foreground">
                {isPreviewMode ? 'Admin Preview' : 'Administrador'}
              </p>
            </div>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-border mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-luxury ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={18} />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;