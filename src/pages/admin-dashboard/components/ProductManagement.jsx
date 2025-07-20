import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProductManagement = ({ isPreview }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Mock products data
  const mockProducts = [
    {
      id: '1',
      name: 'Chanel No. 5',
      description: 'Icônica fragrância floral atemporal',
      price: 299.90,
      stock: 45,
      category: 'Feminino',
      status: 'active',
      image: '/api/placeholder/100/100',
      sales: 156
    },
    {
      id: '2',
      name: 'Dior Sauvage',
      description: 'Fragrância masculina fresca e intensa',
      price: 349.90,
      stock: 23,
      category: 'Masculino',
      status: 'active',
      image: '/api/placeholder/100/100',
      sales: 134
    },
    {
      id: '3',
      name: 'Tom Ford Black Orchid',
      description: 'Fragrância unissex misteriosa e sedutora',
      price: 599.90,
      stock: 8,
      category: 'Unissex',
      status: 'low_stock',
      image: '/api/placeholder/100/100',
      sales: 89
    },
    {
      id: '4',
      name: 'Versace Bright Crystal',
      description: 'Fragrância feminina delicada e luminosa',
      price: 199.90,
      stock: 0,
      category: 'Feminino',
      status: 'out_of_stock',
      image: '/api/placeholder/100/100',
      sales: 67
    }
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success';
      case 'low_stock': return 'bg-warning/10 text-warning';
      case 'out_of_stock': return 'bg-error/10 text-error';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'low_stock': return 'Estoque Baixo';
      case 'out_of_stock': return 'Sem Estoque';
      default: return 'Desconhecido';
    }
  };

  const handlePriceUpdate = (productId, newPrice) => {
    if (isPreview) {
      alert(`Modo de visualização: Atualizaria preço do produto ${productId} para R$ ${newPrice}`);
      return;
    }
    // TODO: Implement price update logic with Supabase
    console.log(`Updating product ${productId} price to ${newPrice}`);
  };

  const handleStockUpdate = (productId, newStock) => {
    if (isPreview) {
      alert(`Modo de visualização: Atualizaria estoque do produto ${productId} para ${newStock}`);
      return;
    }
    // TODO: Implement stock update logic with Supabase
    console.log(`Updating product ${productId} stock to ${newStock}`);
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
            Gerenciamento de Produtos
          </h2>
          <p className="text-muted-foreground mt-1">
            Gerencie o catálogo de fragrâncias da plataforma
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">Todas as Categorias</option>
            <option value="Feminino">Feminino</option>
            <option value="Masculino">Masculino</option>
            <option value="Unissex">Unissex</option>
          </select>
          <Button variant="default">
            <Icon name="Plus" size={18} className="mr-2" />
            Novo Produto
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-luxury">
            <div className="aspect-square bg-muted/50 flex items-center justify-center">
              <Icon name="Package" size={48} className="text-muted-foreground" />
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-foreground truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {product.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(product.status)}`}>
                      {getStatusText(product.status)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Preço</p>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-foreground">
                      R$ {product.price.toFixed(2)}
                    </p>
                    <button 
                      onClick={() => handlePriceUpdate(product.id, product.price)}
                      className="text-primary hover:text-primary/80"
                    >
                      <Icon name="Edit" size={14} />
                    </button>
                  </div>
                </div>
                
                <div>
                  <p className="text-muted-foreground">Estoque</p>
                  <div className="flex items-center space-x-2">
                    <p className={`font-medium ${
                      product.stock === 0 ? 'text-error' : 
                      product.stock < 10 ? 'text-warning' : 'text-foreground'
                    }`}>
                      {product.stock} un.
                    </p>
                    <button 
                      onClick={() => handleStockUpdate(product.id, product.stock)}
                      className="text-primary hover:text-primary/80"
                    >
                      <Icon name="Edit" size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Icon name="ShoppingCart" size={14} />
                    <span>{product.sales} vendas</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Icon name="MoreHorizontal" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <p className="text-2xl font-bold text-foreground">{mockProducts.length}</p>
          <p className="text-sm text-muted-foreground">Total de Produtos</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <p className="text-2xl font-bold text-success">{mockProducts.filter(p => p.status === 'active').length}</p>
          <p className="text-sm text-muted-foreground">Produtos Ativos</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <p className="text-2xl font-bold text-warning">{mockProducts.filter(p => p.status === 'low_stock').length}</p>
          <p className="text-sm text-muted-foreground">Estoque Baixo</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <p className="text-2xl font-bold text-error">{mockProducts.filter(p => p.status === 'out_of_stock').length}</p>
          <p className="text-sm text-muted-foreground">Sem Estoque</p>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;