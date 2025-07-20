import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WishlistSection = ({ wishlistItems, onRemoveFromWishlist, onAddToCart }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('recent');

  const sortOptions = [
    { value: 'recent', label: 'Mais Recentes' },
    { value: 'name', label: 'Nome A-Z' },
    { value: 'price-low', label: 'Menor Preço' },
    { value: 'price-high', label: 'Maior Preço' }
  ];

  const sortedItems = [...wishlistItems].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'recent':
      default:
        return new Date(b.addedDate) - new Date(a.addedDate);
    }
  });

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map(item => item.id));
    }
  };

  const handleRemoveSelected = () => {
    selectedItems.forEach(itemId => {
      onRemoveFromWishlist(itemId);
    });
    setSelectedItems([]);
  };

  const handleAddSelectedToCart = () => {
    selectedItems.forEach(itemId => {
      const item = wishlistItems.find(w => w.id === itemId);
      if (item) {
        onAddToCart(item);
      }
    });
    setSelectedItems([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-heading font-semibold text-2xl text-foreground">
            Lista de Desejos
          </h2>
          <p className="text-muted-foreground">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item salvo' : 'itens salvos'}
          </p>
        </div>

        {wishlistItems.length > 0 && (
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Bulk Actions */}
            {selectedItems.length > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddSelectedToCart}
                  iconName="ShoppingCart"
                  iconPosition="left"
                >
                  Adicionar ao Carrinho
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveSelected}
                  iconName="Trash2"
                  iconPosition="left"
                >
                  Remover
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {wishlistItems.length > 0 && (
        /* Select All */
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedItems.length === wishlistItems.length}
              onChange={handleSelectAll}
              className="w-4 h-4 text-primary border-border rounded focus:ring-ring"
            />
            <span className="text-sm font-medium text-foreground">
              Selecionar todos ({wishlistItems.length})
            </span>
          </label>
          {selectedItems.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {selectedItems.length} selecionado{selectedItems.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      )}

      {/* Wishlist Items */}
      {wishlistItems.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedItems.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-lg overflow-hidden hover:luxury-shadow-md transition-luxury group">
              {/* Selection Checkbox */}
              <div className="absolute top-3 left-3 z-10">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-ring bg-background"
                  />
                </label>
              </div>

              {/* Product Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-luxury duration-500"
                />
                
                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-luxury flex items-center justify-center space-x-2">
                  <button
                    onClick={() => onAddToCart(item)}
                    className="p-2 bg-white rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-luxury"
                    title="Adicionar ao Carrinho"
                  >
                    <Icon name="ShoppingCart" size={20} />
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(item.id)}
                    className="p-2 bg-white rounded-full text-foreground hover:bg-error hover:text-error-foreground transition-luxury"
                    title="Remover da Lista"
                  >
                    <Icon name="Trash2" size={20} />
                  </button>
                </div>

                {/* Availability Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.inStock 
                      ? 'bg-success/10 text-success border border-success/20' :'bg-error/10 text-error border border-error/20'
                  }`}>
                    {item.inStock ? 'Em Estoque' : 'Indisponível'}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.brand}</p>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <span className="text-lg font-semibold text-accent">
                    R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="ml-2 text-sm text-muted-foreground line-through">
                      R$ {item.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  )}
                </div>

                {/* Size Options */}
                {item.sizes && item.sizes.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-1">Tamanhos disponíveis:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.sizes.map((size, index) => (
                        <span key={index} className="px-2 py-1 bg-muted text-xs rounded">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Added Date */}
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground">
                    Adicionado em {new Date(item.addedDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onAddToCart(item)}
                    disabled={!item.inStock}
                    iconName="ShoppingCart"
                    iconPosition="left"
                    className="flex-1"
                  >
                    {item.inStock ? 'Adicionar' : 'Indisponível'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRemoveFromWishlist(item.id)}
                    iconName="Heart"
                    className="px-3"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <Icon name="Heart" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
            Sua lista de desejos está vazia
          </h3>
          <p className="text-muted-foreground mb-6">
            Explore nossa coleção e salve suas fragrâncias favoritas
          </p>
          <Button
            variant="default"
            onClick={() => window.location.href = '/product-catalog-browse'}
            iconName="ShoppingBag"
            iconPosition="left"
          >
            Descobrir Fragrâncias
          </Button>
        </div>
      )}

      {/* Recommendations */}
      {wishlistItems.length > 0 && (
        <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Sparkles" size={20} className="text-accent" />
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Você também pode gostar
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Baseado nos itens da sua lista de desejos, recomendamos:
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              Fragrâncias Florais
            </span>
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
              Perfumes Premium
            </span>
            <span className="px-3 py-1 bg-secondary/10 text-secondary-foreground rounded-full text-sm">
              Edições Limitadas
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistSection;