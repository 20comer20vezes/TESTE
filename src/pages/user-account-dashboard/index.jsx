import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';

import Button from '../../components/ui/Button';

// Import all components
import AccountSidebar from './components/AccountSidebar';
import OverviewSection from './components/OverviewSection';
import OrdersSection from './components/OrdersSection';
import WishlistSection from './components/WishlistSection';
import ProfileSection from './components/ProfileSection';
import AddressesSection from './components/AddressesSection';
import PaymentSection from './components/PaymentSection';
import NotificationsSection from './components/NotificationsSection';
import LoyaltySection from './components/LoyaltySection';
import SupportSection from './components/SupportSection';

const UserAccountDashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState(searchParams.get('section') || 'overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock user data - in real app, this would come from API/context
  const [userInfo] = useState({
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    phone: '(11) 99999-9999',
    birthDate: '1990-05-15',
    gender: 'Feminino',
    memberSince: 'Janeiro 2023',
    loyaltyTier: 'Ouro',
    loyaltyPoints: 15750,
    totalOrders: 12,
    wishlistCount: 8,
    reviewsCount: 5,
    membershipDays: 365,
    preferences: {
      fragranceTypes: ['Floral', 'Amadeirado', 'Cítrico'],
      occasions: ['Dia a dia', 'Trabalho', 'Noite'],
      priceRange: '200-500',
      newsletter: true,
      smsNotifications: false
    }
  });

  const [recentOrders] = useState([
    {
      id: '2024001',
      date: '15/01/2024',
      status: 'Entregue',
      total: 299.90,
      items: [
        {
          name: 'Chanel No. 5 Eau de Parfum',
          image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop',
          quantity: 1,
          price: 299.90,
          brand: 'Chanel',
          size: '50ml'
        }
      ],
      deliveryAddress: 'Rua das Flores, 123 - São Paulo, SP',
      trackingCode: 'BR123456789',
      estimatedDelivery: '20/01/2024',
      paymentMethod: 'Cartão de Crédito',
      shipping: 0
    },
    {
      id: '2024002',
      date: '10/01/2024',
      status: 'Enviado',
      total: 459.80,
      items: [
        {
          name: 'Dior J\'adore Infinissime',
          image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300&h=300&fit=crop',
          quantity: 1,
          price: 449.90,
          brand: 'Dior',
          size: '100ml'
        }
      ],
      deliveryAddress: 'Rua das Flores, 123 - São Paulo, SP',
      trackingCode: 'BR987654321',
      estimatedDelivery: '18/01/2024',
      paymentMethod: 'PIX',
      shipping: 9.90
    }
  ]);

  const [wishlistItems] = useState([
    {
      id: 1,
      name: 'Tom Ford Black Orchid',
      brand: 'Tom Ford',
      price: 899.90,
      originalPrice: 999.90,
      image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=300&h=300&fit=crop',
      inStock: true,
      sizes: ['50ml', '100ml'],
      addedDate: '2024-01-10'
    },
    {
      id: 2,
      name: 'Yves Saint Laurent Black Opium',
      brand: 'YSL',
      price: 649.90,
      image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=300&h=300&fit=crop',
      inStock: true,
      sizes: ['30ml', '50ml', '90ml'],
      addedDate: '2024-01-08'
    }
  ]);

  const [addresses] = useState([
    {
      id: 1,
      label: 'Casa',
      name: 'Maria Silva',
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      isDefault: true
    }
  ]);

  const [paymentMethods] = useState([
    {
      id: 1,
      type: 'credit',
      cardNumber: '4532 1234 5678 9012',
      cardName: 'MARIA SILVA',
      expiryDate: '12/26',
      brand: 'visa',
      isDefault: true
    },
    {
      id: 2,
      type: 'pix',
      pixKey: 'maria.silva@email.com',
      pixKeyType: 'email',
      isDefault: false
    }
  ]);

  const [notifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'Pedido #2024002 foi enviado',
      message: 'Seu pedido saiu para entrega e chegará em 2-3 dias úteis.',
      timestamp: '2024-01-15T10:30:00Z',
      read: false
    },
    {
      id: 2,
      type: 'promotion',
      title: 'Oferta especial: 20% OFF',
      message: 'Aproveite 20% de desconto em fragrâncias selecionadas até domingo.',
      timestamp: '2024-01-14T09:00:00Z',
      read: true
    }
  ]);

  const [notificationPreferences] = useState({
    emailNotifications: {
      orders: true,
      promotions: true,
      wishlist: false,
      newsletter: true
    },
    smsNotifications: {
      delivery: true,
      flashSales: false
    },
    pushNotifications: {
      enabled: true,
      orders: true,
      promotions: false
    },
    emailFrequency: 'weekly',
    preferredTime: 'morning'
  });

  const [loyaltyData] = useState({
    totalPoints: 15750,
    availablePoints: 12500,
    redeemedRewards: 8,
    totalSaved: 450.00,
    memberSince: '2023-01-15'
  });

  const [pointsHistory] = useState([
    {
      id: 1,
      type: 'earned',
      description: 'Compra realizada',
      points: 300,
      date: '2024-01-15',
      orderId: '2024001'
    },
    {
      id: 2,
      type: 'redeemed',
      description: 'Desconto de R$ 50 resgatado',
      points: 2500,
      date: '2024-01-10'
    }
  ]);

  const [availableRewards] = useState([
    {
      id: 1,
      title: 'Desconto R$ 25',
      description: 'Válido para qualquer produto',
      pointsCost: 1250,
      value: 25.00,
      icon: 'Gift'
    },
    {
      id: 2,
      title: 'Frete Grátis',
      description: 'Frete grátis na próxima compra',
      pointsCost: 500,
      icon: 'Truck'
    }
  ]);

  const [supportTickets] = useState([
    {
      id: 'SUP001',
      subject: 'Problema com entrega',
      category: 'order',
      priority: 'high',
      status: 'in-progress',
      message: 'Meu pedido não chegou no prazo previsto.',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12',
      responses: [
        {
          author: 'Suporte LuxeFragrance',
          message: 'Olá Maria, estamos verificando com a transportadora. Em breve teremos uma resposta.',
          date: '2024-01-12'
        }
      ]
    }
  ]);

  // Update URL when section changes
  useEffect(() => {
    setSearchParams({ section: activeSection });
  }, [activeSection, setSearchParams]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  const handleUpdateProfile = (updatedData) => {
    console.log('Updating profile:', updatedData);
    // In real app, would make API call
  };

  const handleAddAddress = (addressData) => {
    console.log('Adding address:', addressData);
    // In real app, would make API call
  };

  const handleUpdateAddress = (id, addressData) => {
    console.log('Updating address:', id, addressData);
    // In real app, would make API call
  };

  const handleDeleteAddress = (id) => {
    console.log('Deleting address:', id);
    // In real app, would make API call
  };

  const handleSetDefaultAddress = (id) => {
    console.log('Setting default address:', id);
    // In real app, would make API call
  };

  const handleAddPayment = (paymentData) => {
    console.log('Adding payment method:', paymentData);
    // In real app, would make API call
  };

  const handleUpdatePayment = (id, paymentData) => {
    console.log('Updating payment method:', id, paymentData);
    // In real app, would make API call
  };

  const handleDeletePayment = (id) => {
    console.log('Deleting payment method:', id);
    // In real app, would make API call
  };

  const handleSetDefaultPayment = (id) => {
    console.log('Setting default payment method:', id);
    // In real app, would make API call
  };

  const handleRemoveFromWishlist = (id) => {
    console.log('Removing from wishlist:', id);
    // In real app, would make API call
  };

  const handleAddToCart = (item) => {
    console.log('Adding to cart:', item);
    // In real app, would add to cart context/state
  };

  const handleUpdateNotificationPreferences = (preferences) => {
    console.log('Updating notification preferences:', preferences);
    // In real app, would make API call
  };

  const handleMarkAsRead = (notificationId) => {
    console.log('Marking notification as read:', notificationId);
    // In real app, would make API call
  };

  const handleDeleteNotification = (notificationId) => {
    console.log('Deleting notification:', notificationId);
    // In real app, would make API call
  };

  const handleCreateSupportTicket = (ticketData) => {
    console.log('Creating support ticket:', ticketData);
    // In real app, would make API call
  };

  const breadcrumbItems = [
    { label: 'Início', href: '/' },
    { label: 'Minha Conta', href: '/account' }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <OverviewSection
            userInfo={userInfo}
            recentOrders={recentOrders}
            wishlistItems={wishlistItems}
            onSectionChange={handleSectionChange}
          />
        );
      case 'orders':
        return <OrdersSection orders={recentOrders} />;
      case 'wishlist':
        return (
          <WishlistSection
            wishlistItems={wishlistItems}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onAddToCart={handleAddToCart}
          />
        );
      case 'profile':
        return (
          <ProfileSection
            userInfo={userInfo}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      case 'addresses':
        return (
          <AddressesSection
            addresses={addresses}
            onAddAddress={handleAddAddress}
            onUpdateAddress={handleUpdateAddress}
            onDeleteAddress={handleDeleteAddress}
            onSetDefault={handleSetDefaultAddress}
          />
        );
      case 'payment':
        return (
          <PaymentSection
            paymentMethods={paymentMethods}
            onAddPayment={handleAddPayment}
            onUpdatePayment={handleUpdatePayment}
            onDeletePayment={handleDeletePayment}
            onSetDefault={handleSetDefaultPayment}
          />
        );
      case 'notifications':
        return (
          <NotificationsSection
            notifications={notifications}
            preferences={notificationPreferences}
            onUpdatePreferences={handleUpdateNotificationPreferences}
            onMarkAsRead={handleMarkAsRead}
            onDeleteNotification={handleDeleteNotification}
          />
        );
      case 'loyalty':
        return (
          <LoyaltySection
            loyaltyData={loyaltyData}
            pointsHistory={pointsHistory}
            availableRewards={availableRewards}
          />
        );
      case 'support':
        return (
          <SupportSection
            supportTickets={supportTickets}
            onCreateTicket={handleCreateSupportTicket}
          />
        );
      default:
        return (
          <OverviewSection
            userInfo={userInfo}
            recentOrders={recentOrders}
            wishlistItems={wishlistItems}
            onSectionChange={handleSectionChange}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando sua conta...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading font-semibold text-xl text-foreground">
                Minha Conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Olá, {userInfo.name.split(' ')[0]}!
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              iconName="Menu"
              iconPosition="left"
            >
              Menu
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <AccountSidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            userInfo={userInfo}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {renderActiveSection()}
          </div>
        </div>
      </div>

      {/* Quick Actions FAB (Mobile) */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <div className="flex flex-col space-y-3">
          <Button
            variant="default"
            size="sm"
            onClick={() => handleSectionChange('support')}
            iconName="HelpCircle"
            className="rounded-full w-12 h-12 p-0"
            title="Suporte"
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleSectionChange('orders')}
            iconName="Package"
            className="rounded-full w-12 h-12 p-0"
            title="Pedidos"
          />
        </div>
      </div>
    </div>
  );
};

export default UserAccountDashboard;