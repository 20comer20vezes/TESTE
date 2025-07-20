import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserManagement = ({ isPreview }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  
  // Mock users data
  const mockUsers = [
    {
      id: '1',
      name: 'Maria Silva',
      email: 'maria@luxefragrance.com',
      role: 'member',
      status: 'active',
      orders: 12,
      joinDate: '2024-01-15',
      lastLogin: '2025-01-18'
    },
    {
      id: '2',
      name: 'Admin LuxeFragrance',
      email: 'admin@luxefragrance.com',
      role: 'admin',
      status: 'active',
      orders: 0,
      joinDate: '2023-12-01',
      lastLogin: '2025-01-19'
    },
    {
      id: '3',
      name: 'João Santos',
      email: 'joao@email.com',
      role: 'member',
      status: 'inactive',
      orders: 3,
      joinDate: '2024-03-20',
      lastLogin: '2024-12-15'
    },
    {
      id: '4',
      name: 'Ana Costa',
      email: 'ana@email.com',
      role: 'manager',
      status: 'active',
      orders: 25,
      joinDate: '2024-02-10',
      lastLogin: '2025-01-19'
    }
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-error/10 text-error';
      case 'manager': return 'bg-warning/10 text-warning';
      case 'member': return 'bg-primary/10 text-primary';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success';
      case 'inactive': return 'bg-muted/10 text-muted-foreground';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  const handleRoleChange = (userId, newRole) => {
    if (isPreview) {
      alert(`Modo de visualização: Mudaria o papel do usuário ${userId} para ${newRole}`);
      return;
    }
    // TODO: Implement role change logic with Supabase
    console.log(`Changing user ${userId} role to ${newRole}`);
  };

  const handleStatusToggle = (userId, currentStatus) => {
    if (isPreview) {
      alert(`Modo de visualização: Mudaria o status do usuário ${userId} para ${currentStatus === 'active' ? 'inactive' : 'active'}`);
      return;
    }
    // TODO: Implement status toggle logic with Supabase
    console.log(`Toggling user ${userId} status from ${currentStatus}`);
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

      {/* Header and Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Gerenciamento de Usuários
          </h2>
          <p className="text-muted-foreground mt-1">
            Visualize e gerencie contas de usuários da plataforma
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">Todos os Papéis</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="member">Membro</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Papel
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Pedidos
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Último Login
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <Icon name="User" size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">
                          Cadastrado em {new Date(user.joinDate).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${getRoleColor(user.role)}`}
                      disabled={isPreview}
                    >
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="member">Membro</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="ShoppingCart" size={16} className="text-muted-foreground" />
                      <span className="text-foreground font-medium">{user.orders}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-foreground">
                      {new Date(user.lastLogin).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(user.lastLogin).toLocaleTimeString('pt-BR')}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusToggle(user.id, user.status)}
                      >
                        <Icon name={user.status === 'active' ? 'UserX' : 'UserCheck'} size={16} />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Icon name="Edit" size={16} />
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <p className="text-2xl font-bold text-foreground">{mockUsers.length}</p>
          <p className="text-sm text-muted-foreground">Total de Usuários</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <p className="text-2xl font-bold text-success">{mockUsers.filter(u => u.status === 'active').length}</p>
          <p className="text-sm text-muted-foreground">Usuários Ativos</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <p className="text-2xl font-bold text-error">{mockUsers.filter(u => u.role === 'admin').length}</p>
          <p className="text-sm text-muted-foreground">Administradores</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <p className="text-2xl font-bold text-primary">{mockUsers.reduce((sum, u) => sum + u.orders, 0)}</p>
          <p className="text-sm text-muted-foreground">Total de Pedidos</p>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;