import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderManagement = ({ isPreview }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Mock orders data
  const mockOrders = [
    {
      id: 'LUX-001',
      customerName: 'Maria Silva',
      customerEmail: 'maria@luxefragrance.com',
      products: ['Chanel No. 5', 'Dior Sauvage'],
      total: 649.80,
      status: 'completed',
      paymentMethod: 'credit_card',
      createdAt: '2025-01-18',
      updatedAt: '2025-01-19'
    },
    {
      id: 'LUX-002',
      customerName: 'João Santos',
      customerEmail: 'joao@email.com',
      products: ['Tom Ford Black Orchid'],
      total: 599.90,
      status: 'processing',
      paymentMethod: 'pix',
      createdAt: '2025-01-19',
      updatedAt: '2025-01-19'
    },
    {
      id: 'LUX-003',
      customerName: 'Ana Costa',
      customerEmail: 'ana@email.com',
      products: ['Versace Bright Crystal', 'Chanel No. 5'],
      total: 499.80,
      status: 'pending',
      paymentMethod: 'credit_card',
      createdAt: '2025-01-19',
      updatedAt: '2025-01-19'
    },
    {
      id: 'LUX-004',
      customerName: 'Carlos Lima',
      customerEmail: 'carlos@email.com',
      products: ['Dior Sauvage'],
      total: 349.90,
      status: 'shipped',
      paymentMethod: 'debit_card',
      createdAt: '2025-01-17',
      updatedAt: '2025-01-18'
    }
  ];

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning/10 text-warning';
      case 'processing': return 'bg-primary/10 text-primary';
      case 'shipped': return 'bg-accent/10 text-accent';
      case 'completed': return 'bg-success/10 text-success';
      case 'cancelled': return 'bg-error/10 text-error';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'processing': return 'Processando';
      case 'shipped': return 'Enviado';
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
      default: return 'Desconhecido';
    }
  };

  const getPaymentMethodText = (method) => {
    switch (method) {
      case 'credit_card': return 'Cartão de Crédito';
      case 'debit_card': return 'Cartão de Débito';
      case 'pix': return 'PIX';
      case 'bank_slip': return 'Boleto';
      default: return method;
    }
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    if (isPreview) {
      alert(`Modo de visualização: Atualizaria status do pedido ${orderId} para ${newStatus}`);
      return;
    }
    // TODO: Implement status update logic with Supabase
    console.log(`Updating order ${orderId} status to ${newStatus}`);
  };

  const handleViewOrder = (orderId) => {
    if (isPreview) {
      alert(`Modo de visualização: Visualizaria detalhes do pedido ${orderId}`);
      return;
    }
    // TODO: Navigate to order details page
    console.log(`Viewing order ${orderId}`);
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

      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Gerenciamento de Pedidos
          </h2>
          <p className="text-muted-foreground mt-1">
            Acompanhe e gerencie todos os pedidos da plataforma
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar pedidos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">Todos os Status</option>
            <option value="pending">Pendente</option>
            <option value="processing">Processando</option>
            <option value="shipped">Enviado</option>
            <option value="completed">Concluído</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Pedido
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Produtos
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Pagamento
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{order.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {order.products.map((product, index) => (
                        <p key={index} className="text-sm text-foreground">
                          {product}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">
                      R$ {order.total.toFixed(2)}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(order.status)}`}
                      disabled={isPreview}
                    >
                      <option value="pending">Pendente</option>
                      <option value="processing">Processando</option>
                      <option value="shipped">Enviado</option>
                      <option value="completed">Concluído</option>
                      <option value="cancelled">Cancelado</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-foreground">
                      {getPaymentMethodText(order.paymentMethod)}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewOrder(order.id)}
                      >
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Icon name="Printer" size={16} />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Icon name="MoreHorizontal" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <p className="text-2xl font-bold text-foreground">{mockOrders.length}</p>
          <p className="text-sm text-muted-foreground">Total de Pedidos</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <p className="text-2xl font-bold text-warning">{mockOrders.filter(o => o.status === 'pending').length}</p>
          <p className="text-sm text-muted-foreground">Pendentes</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <p className="text-2xl font-bold text-primary">{mockOrders.filter(o => o.status === 'processing').length}</p>
          <p className="text-sm text-muted-foreground">Processando</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <p className="text-2xl font-bold text-accent">{mockOrders.filter(o => o.status === 'shipped').length}</p>
          <p className="text-sm text-muted-foreground">Enviados</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <p className="text-2xl font-bold text-success">{mockOrders.filter(o => o.status === 'completed').length}</p>
          <p className="text-sm text-muted-foreground">Concluídos</p>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;