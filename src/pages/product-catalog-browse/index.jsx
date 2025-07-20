import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';

import Button from '../../components/ui/Button';
import FilterChips from './components/FilterChips';
import FilterSidebar from './components/FilterSidebar';
import FilterOverlay from './components/FilterOverlay';
import ProductGrid from './components/ProductGrid';
import SortDropdown from './components/SortDropdown';
import QuickAddModal from './components/QuickAddModal';

const ProductCatalogBrowse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isFilterOverlayOpen, setIsFilterOverlayOpen] = useState(false);
  const [isQuickAddModalOpen, setIsQuickAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentSort, setCurrentSort] = useState('relevance');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    fragranceType: [],
    gender: [],
    occasion: [],
    priceRange: [],
    brand: []
  });

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: "Chanel No. 5 Eau de Parfum",
      brand: "Chanel",
      price: 450.00,
      originalPrice: 450.00,
      salePrice: null,
      isOnSale: false,
      isNew: false,
      rating: 4.8,
      reviewCount: 1247,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=500&fit=crop",
      sizes: ["30ml", "50ml", "100ml"],
      isWishlisted: false,
      installments: { count: 10, value: 45.00 }
    },
    {
      id: 2,
      name: "Dior J'adore Eau de Parfum",
      brand: "Dior",
      price: 380.00,
      originalPrice: 420.00,
      salePrice: 380.00,
      isOnSale: true,
      discountPercentage: 10,
      isNew: false,
      rating: 4.7,
      reviewCount: 892,
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=500&fit=crop",
      sizes: ["30ml", "50ml", "100ml"],
      isWishlisted: true,
      installments: { count: 10, value: 38.00 }
    },
    {
      id: 3,
      name: "Versace Bright Crystal",
      brand: "Versace",
      price: 280.00,
      originalPrice: 280.00,
      salePrice: null,
      isOnSale: false,
      isNew: true,
      rating: 4.6,
      reviewCount: 634,
      image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=500&fit=crop",
      sizes: ["30ml", "50ml", "90ml"],
      isWishlisted: false,
      installments: { count: 8, value: 35.00 }
    },
    {
      id: 4,
      name: "Prada Candy Eau de Parfum",
      brand: "Prada",
      price: 320.00,
      originalPrice: 320.00,
      salePrice: null,
      isOnSale: false,
      isNew: false,
      rating: 4.5,
      reviewCount: 456,
      image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400&h=500&fit=crop",
      sizes: ["30ml", "50ml", "80ml"],
      isWishlisted: false,
      installments: { count: 10, value: 32.00 }
    },
    {
      id: 5,
      name: "Gucci Bloom Eau de Parfum",
      brand: "Gucci",
      price: 350.00,
      originalPrice: 400.00,
      salePrice: 350.00,
      isOnSale: true,
      discountPercentage: 12,
      isNew: false,
      rating: 4.7,
      reviewCount: 723,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=500&fit=crop",
      sizes: ["30ml", "50ml", "100ml"],
      isWishlisted: true,
      installments: { count: 10, value: 35.00 }
    },
    {
      id: 6,
      name: "YSL Black Opium",
      brand: "Yves Saint Laurent",
      price: 390.00,
      originalPrice: 390.00,
      salePrice: null,
      isOnSale: false,
      isNew: true,
      rating: 4.8,
      reviewCount: 1089,
      image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&h=500&fit=crop",
      sizes: ["30ml", "50ml", "90ml"],
      isWishlisted: false,
      installments: { count: 10, value: 39.00 }
    },
    {
      id: 7,
      name: "Tom Ford Black Orchid",
      brand: "Tom Ford",
      price: 580.00,
      originalPrice: 580.00,
      salePrice: null,
      isOnSale: false,
      isNew: false,
      rating: 4.9,
      reviewCount: 567,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=500&fit=crop",
      sizes: ["30ml", "50ml", "100ml"],
      isWishlisted: false,
      installments: { count: 12, value: 48.33 }
    },
    {
      id: 8,
      name: "Marc Jacobs Daisy",
      brand: "Marc Jacobs",
      price: 240.00,
      originalPrice: 280.00,
      salePrice: 240.00,
      isOnSale: true,
      discountPercentage: 14,
      isNew: false,
      rating: 4.4,
      reviewCount: 834,
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=500&fit=crop",
      sizes: ["30ml", "50ml", "100ml"],
      isWishlisted: true,
      installments: { count: 8, value: 30.00 }
    }
  ];

  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  // Get search query from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const search = urlParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, [location.search]);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    Object.keys(filters).forEach(filterKey => {
      if (filters[filterKey].length > 0) {
        // Mock filter logic - in real app, this would match product properties
        // For demo purposes, we'll keep all products
      }
    });

    // Apply sorting
    switch (currentSort) {
      case 'price-asc':
        filtered.sort((a, b) => (a.isOnSale ? a.salePrice : a.price) - (b.isOnSale ? b.salePrice : b.price));
        break;
      case 'price-desc':
        filtered.sort((a, b) => (b.isOnSale ? b.salePrice : b.price) - (a.isOnSale ? a.salePrice : a.price));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // relevance - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, filters, currentSort, searchQuery]);

  const handleFilterChange = (category, value, checked) => {
    setFilters(prev => ({
      ...prev,
      [category]: checked
        ? [...prev[category], value]
        : prev[category].filter(item => item !== value)
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      fragranceType: [],
      gender: [],
      occasion: [],
      priceRange: [],
      brand: []
    });
  };

  const getActiveFilters = () => {
    const active = [];
    Object.keys(filters).forEach(category => {
      filters[category].forEach(value => {
        active.push({
          category,
          value,
          label: `${category}: ${value}`
        });
      });
    });
    return active;
  };

  const handleRemoveFilter = (filter) => {
    handleFilterChange(filter.category, filter.value, false);
  };

  const handleWishlistToggle = (productId, isWishlisted) => {
    // Update local state
    setProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, isWishlisted }
          : product
      )
    );

    // Update localStorage
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
    if (isWishlisted) {
      const product = products.find(p => p.id === productId);
      if (product && !wishlistItems.find(item => item.id === productId)) {
        wishlistItems.push(product);
      }
    } else {
      const index = wishlistItems.findIndex(item => item.id === productId);
      if (index > -1) {
        wishlistItems.splice(index, 1);
      }
    }
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  };

  const handleQuickAdd = (product) => {
    setSelectedProduct(product);
    setIsQuickAddModalOpen(true);
  };

  const handleAddToCart = (productData) => {
    // Add to cart logic
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = cartItems.find(item => 
      item.id === productData.id && item.selectedSize === productData.selectedSize
    );

    if (existingItem) {
      existingItem.quantity += productData.quantity;
    } else {
      cartItems.push({
        ...productData,
        addedAt: new Date().toISOString()
      });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Show success message (in real app, use toast notification)
    alert('Produto adicionado ao carrinho!');
  };

  const breadcrumbItems = [
    { label: 'Início', path: '/home-landing-page' },
    { label: 'Produtos', path: '/product-catalog-browse' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 lg:px-6 py-6">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="font-heading font-semibold text-2xl lg:text-3xl text-foreground mb-2">
              Catálogo de Perfumes
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
              {searchQuery && ` para "${searchQuery}"`}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <Button
              variant="outline"
              onClick={() => setIsFilterOverlayOpen(true)}
              className="lg:hidden"
              iconName="Filter"
              iconPosition="left"
            >
              Filtros
            </Button>
            
            <SortDropdown
              currentSort={currentSort}
              onSortChange={setCurrentSort}
            />
          </div>
        </div>

        {/* Active Filters */}
        <FilterChips
          activeFilters={getActiveFilters()}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearFilters}
        />

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid
              products={filteredProducts}
              onWishlistToggle={handleWishlistToggle}
              onQuickAdd={handleQuickAdd}
              loading={loading}
            />

            {/* Load More Button */}
            {filteredProducts.length > 0 && filteredProducts.length % 12 === 0 && (
              <div className="flex justify-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    setLoading(true);
                    // Simulate loading more products
                    setTimeout(() => {
                      setLoading(false);
                    }, 1000);
                  }}
                  loading={loading}
                >
                  Carregar Mais Produtos
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      <FilterOverlay
        isOpen={isFilterOverlayOpen}
        onClose={() => setIsFilterOverlayOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={() => setIsFilterOverlayOpen(false)}
        onClearFilters={handleClearFilters}
      />

      {/* Quick Add Modal */}
      <QuickAddModal
        isOpen={isQuickAddModalOpen}
        onClose={() => {
          setIsQuickAddModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductCatalogBrowse;