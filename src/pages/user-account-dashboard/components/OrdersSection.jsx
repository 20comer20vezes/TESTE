import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrdersSection = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const statusColors = {
    'Processando': 'bg-warning/10 text-warning border-warning/20',
    'Enviado': 'bg-primary/10 text-primary border-primary/20',
    'Entregue': 'bg-success/10 text-success border-success/20',
    'Cancelado': 'bg-error/10 text-error border-error/20'
  };

  const statusIcons = {
    'Processando': 'Clock',
    'Enviado': 'Truck',
    'Entregue': 'CheckCircle',
    'Cancelado': 'XCircle'
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status.toLowerCase() === filterStatus);

  const handleTrackOrder = (trackingCode) => {
    // Mock tracking functionality
    window.open(`https://rastreamento.correios.com.br/app/index.php?codigo=${trackingCode}`, '_blank');
  };

  const handleReorder = (orderId) => {
    // Mock reorder functionality
    console.log('Reordering:', orderId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-heading font-semibold text-2xl text-foreground">
            Meus Pedidos
          </h2>
          <p className="text-muted-foreground">
            Acompanhe o status dos seus pedidos e histórico de compras
          </p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {['all', 'processando', 'enviado', 'entregue'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-full text-sm font-caption transition-luxury ${
                filterStatus === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {status === 'all' ? 'Todos' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-card border border-border rounded-lg p-6 hover:luxury-shadow-sm transition-luxury">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Order Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Pedido #{order.id}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {order.date} • {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusColors[order.status]}`}>
                      <Icon name={statusIcons[order.status]} size={12} className="mr-1" />
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="flex flex-wrap gap-3 mb-4">
                  {order.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate max-w-32">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qtd: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg">
                      <span className="text-xs text-muted-foreground">
                        +{order.items.length - 3}
                      </span>
                    </div>
                  )}
                </div>

                {/* Order Total */}
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg text-foreground">
                    Total: R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 lg:flex-col lg:w-40">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                  iconName="Eye"
                  iconPosition="left"
                  className="w-full"
                >
                  {selectedOrder === order.id ? 'Ocultar' : 'Detalhes'}
                </Button>
                
                {order.status === 'Enviado' && order.trackingCode && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleTrackOrder(order.trackingCode)}
                    iconName="Truck"
                    iconPosition="left"
                    className="w-full"
                  >
                    Rastrear
                  </Button>
                )}
                
                {order.status === 'Entregue' && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleReorder(order.id)}
                    iconName="RotateCcw"
                    iconPosition="left"
                    className="w-full"
                  >
                    Recomprar
                  </Button>
                )}
              </div>
            </div>

            {/* Expanded Order Details */}
            {selectedOrder === order.id && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Delivery Info */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Informações de Entrega</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Endereço:</span>
                        <span className="text-foreground text-right max-w-48">
                          {order.deliveryAddress}
                        </span>
                      </div>
                      {order.trackingCode && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Código de Rastreamento:</span>
                          <span className="text-foreground font-mono">{order.trackingCode}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Previsão de Entrega:</span>
                        <span className="text-foreground">{order.estimatedDelivery}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Informações de Pagamento</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Método:</span>
                        <span className="text-foreground">{order.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span className="text-foreground">
                          R$ {(order.total - order.shipping).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Frete:</span>
                        <span className="text-foreground">
                          {order.shipping === 0 ? 'Grátis' : `R$ ${order.shipping.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold pt-2 border-t border-border">
                        <span className="text-foreground">Total:</span>
                        <span className="text-foreground">
                          R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* All Items */}
                <div className="mt-6">
                  <h4 className="font-semibold text-foreground mb-3">Itens do Pedido</h4>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                        <Image
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium text-foreground">{item.name}</h5>
                          <p className="text-sm text-muted-foreground">{item.brand}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.size} • Qtd: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">
                            R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Unitário
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
            Nenhum pedido encontrado
          </h3>
          <p className="text-muted-foreground mb-6">
            {filterStatus === 'all' ?'Você ainda não fez nenhum pedido.'
              : `Nenhum pedido com status "${filterStatus}" encontrado.`
            }
          </p>
          <Button
            variant="default"
            onClick={() => window.location.href = '/product-catalog-browse'}
            iconName="ShoppingBag"
            iconPosition="left"
          >
            Começar a Comprar
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrdersSection;