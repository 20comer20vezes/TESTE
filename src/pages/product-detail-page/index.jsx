import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductDescription from './components/ProductDescription';
import CustomerReviews from './components/CustomerReviews';
import RelatedProducts from './components/RelatedProducts';

const ProductDetailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  // Mock product data - in real app this would come from API based on product ID
  const product = {
    id: 1,
    name: "Floral Symphony",
    brand: "Luxe Parfum",
    price: 289.90,
    originalPrice: 349.90,
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=800&h=800&fit=crop",
    rating: 4.8,
    reviewCount: 124,
    sizes: [
      { volume: "30ml", price: 189.90 },
      { volume: "50ml", price: 289.90 },
      { volume: "100ml", price: 389.90 }
    ],
    notes: {
      top: "Bergamota, Limão Siciliano, Pêra",
      middle: "Rosa Búlgara, Peônia, Lírio do Vale",
      base: "Almíscar Branco, Sândalo, Âmbar"
    },
    description: `Floral Symphony é uma fragrância feminina sofisticada que celebra a elegância natural da mulher moderna. Criada com ingredientes premium selecionados, esta composição olfativa única combina frescor cítrico com delicadeza floral.\n\nAs notas de saída proporcionam uma abertura vibrante e energizante, enquanto o coração floral revela toda a feminilidade e romantismo da fragrância. As notas de fundo garantem fixação duradoura com toque sensual e envolvente.\n\nPerfeita para mulheres que buscam uma assinatura olfativa marcante e inesquecível.`,
    occasions: ["Trabalho", "Encontros", "Eventos Especiais", "Dia a Dia"],
    longevity: 4,
    sillage: 4,
    family: "Floral Frutal",
    concentration: "Eau de Parfum",
    gender: "Feminino",
    year: "2024",
    perfumer: "Sophie Laurent",
    country: "França",
    sku: "LUX-FS-001"
  };

  const breadcrumbItems = [
    { label: 'Início', path: '/home-landing-page' },
    { label: 'Produtos', path: '/product-catalog-browse' },
    { label: product.name, path: `/product-detail-page?id=${product.id}` }
  ];

  useEffect(() => {
    // Check if product is in wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
    setIsInWishlist(wishlist.some(item => item.id === product.id));
  }, [product.id]);

  const handleAddToCart = (productData) => {
    // Get existing cart items
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(
      item => item.id === productData.id && item.selectedSize.volume === productData.selectedSize.volume
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += productData.quantity;
      existingCart[existingItemIndex].totalPrice = 
        existingCart[existingItemIndex].selectedSize.price * existingCart[existingItemIndex].quantity;
    } else {
      // Add new item to cart
      existingCart.push({
        ...productData,
        addedAt: new Date().toISOString()
      });
    }

    // Save to localStorage
    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    
    // Show success message
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 3000);

    // Trigger cart update event for header
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleToggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
    
    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter(item => item.id !== product.id);
      localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
    } else {
      // Add to wishlist
      const wishlistItem = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        addedAt: new Date().toISOString()
      };
      wishlist.push(wishlistItem);
      localStorage.setItem('wishlistItems', JSON.stringify(wishlist));
      setIsInWishlist(true);
    }

    // Trigger wishlist update event for header
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-6 py-6">
        <Breadcrumb items={breadcrumbItems} />

        {/* Success Message */}
        {showAddedToCart && (
          <div className="fixed top-20 right-4 bg-success text-success-foreground px-6 py-3 rounded-lg luxury-shadow-lg z-50 animate-in slide-in-from-right">
            <div className="flex items-center space-x-2">
              <span>✓</span>
              <span className="font-caption">Produto adicionado ao carrinho!</span>
            </div>
          </div>
        )}

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Product Images */}
          <div className="order-1">
            <ProductImageGallery product={product} />
          </div>

          {/* Product Information */}
          <div className="order-2">
            <ProductInfo
              product={product}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isInWishlist={isInWishlist}
            />
          </div>
        </div>

        {/* Product Description */}
        <div className="mb-12">
          <ProductDescription product={product} />
        </div>

        {/* Customer Reviews */}
        <div className="mb-12">
          <CustomerReviews product={product} />
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <RelatedProducts currentProduct={product} />
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;