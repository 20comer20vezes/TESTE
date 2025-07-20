import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationsSection = ({ notifications, preferences, onUpdatePreferences, onMarkAsRead, onDeleteNotification }) => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [filterType, setFilterType] = useState('all');

  const notificationTypes = {
    order: { label: 'Pedidos', icon: 'Package', color: 'text-primary' },
    promotion: { label: 'Promoções', icon: 'Tag', color: 'text-accent' },
    product: { label: 'Produtos', icon: 'Heart', color: 'text-error' },
    account: { label: 'Conta', icon: 'User', color: 'text-success' },
    system: { label: 'Sistema', icon: 'Bell', color: 'text-warning' }
  };

  const filteredNotifications = filterType === 'all' 
    ? notifications 
    : notifications.filter(notification => notification.type === filterType);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handlePreferenceChange = (category, value) => {
    const updatedPreferences = {
      ...preferences,
      [category]: value
    };
    onUpdatePreferences(updatedPreferences);
  };

  const handleMarkAllAsRead = () => {
    notifications.forEach(notification => {
      if (!notification.read) {
        onMarkAsRead(notification.id);
      }
    });
  };

  const formatNotificationTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInHours = Math.floor((now - notificationTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Agora mesmo';
    } else if (diffInHours < 24) {
      return `${diffInHours}h atrás`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays === 1) {
        return 'Ontem';
      } else if (diffInDays < 7) {
        return `${diffInDays} dias atrás`;
      } else {
        return notificationTime.toLocaleDateString('pt-BR');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-semibold text-2xl text-foreground">
            Notificações
          </h2>
          <p className="text-muted-foreground">
            Gerencie suas notificações e preferências de comunicação
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllAsRead}
            iconName="CheckCheck"
            iconPosition="left"
          >
            Marcar todas como lidas ({unreadCount})
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-luxury ${
            activeTab === 'notifications'
              ? 'bg-background text-foreground luxury-shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Bell" size={16} />
            <span>Notificações</span>
            {unreadCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </div>
        </button>
        <button
          onClick={() => setActiveTab('preferences')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-luxury ${
            activeTab === 'preferences' ?'bg-background text-foreground luxury-shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Settings" size={16} />
            <span>Preferências</span>
          </div>
        </button>
      </div>

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-full text-sm font-caption transition-luxury ${
                filterType === 'all' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              Todas ({notifications.length})
            </button>
            {Object.entries(notificationTypes).map(([type, config]) => {
              const count = notifications.filter(n => n.type === type).length;
              return (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-full text-sm font-caption transition-luxury ${
                    filterType === type
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {config.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-card border rounded-lg p-4 transition-luxury hover:luxury-shadow-sm ${
                  notification.read ? 'border-border' : 'border-primary/30 bg-primary/5'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    notification.read ? 'bg-muted' : 'bg-primary/10'
                  }`}>
                    <Icon 
                      name={notificationTypes[notification.type]?.icon || 'Bell'} 
                      size={20} 
                      className={notificationTypes[notification.type]?.color || 'text-primary'} 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`font-medium mb-1 ${
                          notification.read ? 'text-foreground' : 'text-foreground font-semibold'
                        }`}>
                          {notification.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{formatNotificationTime(notification.timestamp)}</span>
                          <span className="capitalize">{notificationTypes[notification.type]?.label}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onMarkAsRead(notification.id)}
                            iconName="Check"
                            title="Marcar como lida"
                          />
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteNotification(notification.id)}
                          iconName="Trash2"
                          title="Excluir notificação"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                Nenhuma notificação encontrada
              </h3>
              <p className="text-muted-foreground">
                {filterType === 'all' ?'Você não tem notificações no momento.'
                  : `Nenhuma notificação do tipo "${notificationTypes[filterType]?.label}" encontrada.`
                }
              </p>
            </div>
          )}
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="space-y-8">
          {/* Email Notifications */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-6">
              Notificações por Email
            </h3>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-medium text-foreground">Pedidos e Entregas</span>
                  <p className="text-sm text-muted-foreground">
                    Atualizações sobre status de pedidos, envio e entrega
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications.orders}
                  onChange={(e) => handlePreferenceChange('emailNotifications', {
                    ...preferences.emailNotifications,
                    orders: e.target.checked
                  })}
                  className="w-5 h-5 text-primary border-border rounded focus:ring-ring"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-medium text-foreground">Promoções e Ofertas</span>
                  <p className="text-sm text-muted-foreground">
                    Descontos exclusivos, liquidações e lançamentos
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications.promotions}
                  onChange={(e) => handlePreferenceChange('emailNotifications', {
                    ...preferences.emailNotifications,
                    promotions: e.target.checked
                  })}
                  className="w-5 h-5 text-primary border-border rounded focus:ring-ring"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-medium text-foreground">Produtos Favoritos</span>
                  <p className="text-sm text-muted-foreground">
                    Quando itens da sua lista de desejos entrarem em promoção
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications.wishlist}
                  onChange={(e) => handlePreferenceChange('emailNotifications', {
                    ...preferences.emailNotifications,
                    wishlist: e.target.checked
                  })}
                  className="w-5 h-5 text-primary border-border rounded focus:ring-ring"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-medium text-foreground">Newsletter Semanal</span>
                  <p className="text-sm text-muted-foreground">
                    Dicas de beleza, tendências e novidades do mundo das fragrâncias
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications.newsletter}
                  onChange={(e) => handlePreferenceChange('emailNotifications', {
                    ...preferences.emailNotifications,
                    newsletter: e.target.checked
                  })}
                  className="w-5 h-5 text-primary border-border rounded focus:ring-ring"
                />
              </label>
            </div>
          </div>

          {/* SMS Notifications */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-6">
              Notificações por SMS
            </h3>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-medium text-foreground">Atualizações de Entrega</span>
                  <p className="text-sm text-muted-foreground">
                    SMS quando seu pedido sair para entrega
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.smsNotifications.delivery}
                  onChange={(e) => handlePreferenceChange('smsNotifications', {
                    ...preferences.smsNotifications,
                    delivery: e.target.checked
                  })}
                  className="w-5 h-5 text-primary border-border rounded focus:ring-ring"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-medium text-foreground">Ofertas Relâmpago</span>
                  <p className="text-sm text-muted-foreground">
                    Promoções por tempo limitado e flash sales
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.smsNotifications.flashSales}
                  onChange={(e) => handlePreferenceChange('smsNotifications', {
                    ...preferences.smsNotifications,
                    flashSales: e.target.checked
                  })}
                  className="w-5 h-5 text-primary border-border rounded focus:ring-ring"
                />
              </label>
            </div>
          </div>

          {/* Push Notifications */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-6">
              Notificações Push
            </h3>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-medium text-foreground">Ativar Notificações Push</span>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações instantâneas no seu navegador
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.pushNotifications.enabled}
                  onChange={(e) => handlePreferenceChange('pushNotifications', {
                    ...preferences.pushNotifications,
                    enabled: e.target.checked
                  })}
                  className="w-5 h-5 text-primary border-border rounded focus:ring-ring"
                />
              </label>

              {preferences.pushNotifications.enabled && (
                <div className="ml-6 space-y-3 pt-2 border-t border-border">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-foreground">Atualizações de pedidos</span>
                    <input
                      type="checkbox"
                      checked={preferences.pushNotifications.orders}
                      onChange={(e) => handlePreferenceChange('pushNotifications', {
                        ...preferences.pushNotifications,
                        orders: e.target.checked
                      })}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-ring"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-foreground">Promoções especiais</span>
                    <input
                      type="checkbox"
                      checked={preferences.pushNotifications.promotions}
                      onChange={(e) => handlePreferenceChange('pushNotifications', {
                        ...preferences.pushNotifications,
                        promotions: e.target.checked
                      })}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-ring"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Frequency Settings */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-6">
              Frequência de Comunicação
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Frequência de emails promocionais
                </label>
                <select
                  value={preferences.emailFrequency}
                  onChange={(e) => handlePreferenceChange('emailFrequency', e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="daily">Diariamente</option>
                  <option value="weekly">Semanalmente</option>
                  <option value="monthly">Mensalmente</option>
                  <option value="never">Nunca</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Horário preferido para notificações
                </label>
                <select
                  value={preferences.preferredTime}
                  onChange={(e) => handlePreferenceChange('preferredTime', e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="morning">Manhã (8h - 12h)</option>
                  <option value="afternoon">Tarde (12h - 18h)</option>
                  <option value="evening">Noite (18h - 22h)</option>
                  <option value="anytime">Qualquer horário</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6 border border-primary/10">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Privacidade e Controle</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Você pode alterar suas preferências a qualquer momento</li>
                  <li>• Respeitamos sua privacidade e não compartilhamos seus dados</li>
                  <li>• Use o link "Descadastrar" em qualquer email para parar de receber</li>
                  <li>• Notificações de segurança e pedidos não podem ser desativadas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsSection;