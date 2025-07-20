import React from 'react';
import Icon from '../../../components/AppIcon';

const AccountSidebar = ({ activeSection, onSectionChange, userInfo, isOpen, onClose }) => {
  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: 'LayoutDashboard' },
    { id: 'orders', label: 'Meus Pedidos', icon: 'Package' },
    { id: 'wishlist', label: 'Lista de Desejos', icon: 'Heart' },
    { id: 'profile', label: 'Perfil', icon: 'User' },
    { id: 'addresses', label: 'Endereços', icon: 'MapPin' },
    { id: 'payment', label: 'Pagamentos', icon: 'CreditCard' },
    { id: 'notifications', label: 'Notificações', icon: 'Bell' },
    { id: 'loyalty', label: 'Programa Fidelidade', icon: 'Star' },
    { id: 'support', label: 'Suporte', icon: 'HelpCircle' }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
          <div className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-background border-r border-border luxury-shadow-lg">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-heading font-semibold text-lg">Minha Conta</span>
                <button
                  onClick={onClose}
                  className="p-2 text-muted-foreground hover:text-foreground transition-luxury"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <SidebarContent 
                  menuItems={menuItems}
                  activeSection={activeSection}
                  onSectionChange={onSectionChange}
                  userInfo={userInfo}
                  onClose={onClose}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-card border-r border-border luxury-shadow-sm">
        <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
          <SidebarContent 
            menuItems={menuItems}
            activeSection={activeSection}
            onSectionChange={onSectionChange}
            userInfo={userInfo}
          />
        </div>
      </div>
    </>
  );
};

const SidebarContent = ({ menuItems, activeSection, onSectionChange, userInfo, onClose }) => {
  const handleSectionChange = (sectionId) => {
    onSectionChange(sectionId);
    if (onClose) onClose();
  };

  return (
    <div className="p-6">
      {/* User Profile Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-semibold text-xl">
              {userInfo.name.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className="font-heading font-semibold text-lg text-foreground">
              {userInfo.name}
            </h2>
            <p className="text-sm text-muted-foreground">{userInfo.email}</p>
            <div className="flex items-center mt-1">
              <Icon name="Star" size={14} className="text-accent mr-1" />
              <span className="text-xs text-accent font-medium">{userInfo.loyaltyTier}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSectionChange(item.id)}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-luxury ${
              activeSection === item.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={item.icon} size={20} />
            <span className="font-caption">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Loyalty Points Summary */}
      <div className="mt-8 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Pontos LuxeFragrance</span>
          <Icon name="Gift" size={16} className="text-accent" />
        </div>
        <div className="text-2xl font-heading font-semibold text-accent mb-1">
          {userInfo.loyaltyPoints.toLocaleString('pt-BR')}
        </div>
        <p className="text-xs text-muted-foreground">
          Próximo nível em {(5000 - (userInfo.loyaltyPoints % 5000)).toLocaleString('pt-BR')} pontos
        </p>
      </div>
    </div>
  );
};

export default AccountSidebar;