import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userProfile, signOut } = useAuth();

  useEffect(() => {
    // Load cart count from localStorage
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      setCartItemCount(cartItems.length);
    }

    // Load wishlist count from localStorage
    const savedWishlist = localStorage.getItem('wishlistItems');
    if (savedWishlist) {
      const wishlistItems = JSON.parse(savedWishlist);
      setWishlistCount(wishlistItems.length);
    }
  }, []);

  const handleLogoClick = () => {
    navigate('/home-landing-page');
    setIsMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product-catalog-browse?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleWishlistClick = () => {
    if (user) {
      navigate('/user-account-dashboard?tab=wishlist');
    } else {
      navigate('/login-registration');
    }
  };

  const handleCartClick = () => {
    navigate('/shopping-cart-checkout');
  };

  const handleAccountClick = () => {
    if (user) {
      navigate('/user-account-dashboard');
    } else {
      navigate('/login-registration');
    }
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      // Clear any remaining local storage
      localStorage.removeItem('rememberMe');
      navigate('/home-landing-page');
      setIsMenuOpen(false);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const handleAdminDashboard = () => {
    navigate('/admin-dashboard');
    setIsMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isAdmin = userProfile?.role === 'admin';

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={handleLogoClick}
                className="flex items-center space-x-2 transition-luxury hover:opacity-80"
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-heading font-semibold text-lg lg:text-xl">L</span>
                </div>
                <span className="font-heading font-semibold text-xl lg:text-2xl text-foreground">
                  LuxeFragrance
                </span>
              </button>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearchSubmit} className="w-full relative">
                <input
                  type="search"
                  placeholder="Buscar fragrâncias..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 px-4 pr-10 bg-input border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-luxury"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-luxury"
                >
                  <Icon name="Search" size={18} />
                </button>
              </form>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {isAdmin && (
                <button
                  onClick={handleAdminDashboard}
                  className="p-2 text-muted-foreground hover:text-foreground transition-luxury"
                  title="Painel Admin"
                >
                  <Icon name="Shield" size={22} />
                </button>
              )}

              <button
                onClick={handleWishlistClick}
                className="relative p-2 text-muted-foreground hover:text-foreground transition-luxury"
                title="Lista de Desejos"
              >
                <Icon name="Heart" size={22} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={handleCartClick}
                className="relative p-2 text-muted-foreground hover:text-foreground transition-luxury"
                title="Carrinho de Compras"
              >
                <Icon name="ShoppingBag" size={22} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </button>

              <button
                onClick={handleAccountClick}
                className="p-2 text-muted-foreground hover:text-foreground transition-luxury"
                title={user ? "Minha Conta" : "Entrar"}
              >
                <Icon name="User" size={22} />
              </button>

              {user && (
                <button
                  onClick={handleLogout}
                  className="p-2 text-muted-foreground hover:text-foreground transition-luxury"
                  title="Sair"
                >
                  <Icon name="LogOut" size={22} />
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={handleCartClick}
                className="relative p-2 text-muted-foreground hover:text-foreground transition-luxury"
              >
                <Icon name="ShoppingBag" size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium text-[10px]">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </button>

              <button
                onClick={toggleMenu}
                className="p-2 text-muted-foreground hover:text-foreground transition-luxury"
              >
                <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="search"
                placeholder="Buscar fragrâncias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 px-4 pr-10 bg-input border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-luxury"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-luxury"
              >
                <Icon name="Search" size={18} />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={toggleMenu} />
          <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-background border-l border-border luxury-shadow-lg">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-heading font-semibold text-lg">Menu</span>
                <button
                  onClick={toggleMenu}
                  className="p-2 text-muted-foreground hover:text-foreground transition-luxury"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {user && (
                  <div className="p-4 border-b border-border">
                    <div className="text-sm">
                      <p className="font-medium text-foreground">{userProfile?.full_name}</p>
                      <p className="text-muted-foreground">{user?.email}</p>
                      {isAdmin && (
                        <span className="inline-flex items-center px-2 py-1 mt-1 text-xs rounded-full bg-primary/10 text-primary">
                          <Icon name="Shield" size={12} className="mr-1" />
                          Admin
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <nav className="p-4 space-y-2">
                  <button
                    onClick={() => handleNavigation('/home-landing-page')}
                    className="w-full flex items-center space-x-3 p-3 text-left hover:bg-muted rounded-lg transition-luxury"
                  >
                    <Icon name="Home" size={20} />
                    <span>Início</span>
                  </button>

                  <button
                    onClick={() => handleNavigation('/product-catalog-browse')}
                    className="w-full flex items-center space-x-3 p-3 text-left hover:bg-muted rounded-lg transition-luxury"
                  >
                    <Icon name="Package" size={20} />
                    <span>Produtos</span>
                  </button>

                  <button
                    onClick={handleWishlistClick}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-muted rounded-lg transition-luxury"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="Heart" size={20} />
                      <span>Lista de Desejos</span>
                    </div>
                    {wishlistCount > 0 && (
                      <span className="bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                        {wishlistCount > 9 ? '9+' : wishlistCount}
                      </span>
                    )}
                  </button>

                  {isAdmin && (
                    <button
                      onClick={handleAdminDashboard}
                      className="w-full flex items-center space-x-3 p-3 text-left hover:bg-muted rounded-lg transition-luxury"
                    >
                      <Icon name="Shield" size={20} />
                      <span>Painel Admin</span>
                    </button>
                  )}

                  <button
                    onClick={handleAccountClick}
                    className="w-full flex items-center space-x-3 p-3 text-left hover:bg-muted rounded-lg transition-luxury"
                  >
                    <Icon name="User" size={20} />
                    <span>{user ? 'Minha Conta' : 'Entrar'}</span>
                  </button>

                  {user && (
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 p-3 text-left hover:bg-muted rounded-lg transition-luxury text-error"
                    >
                      <Icon name="LogOut" size={20} />
                      <span>Sair</span>
                    </button>
                  )}
                </nav>

                <div className="p-4 border-t border-border mt-4">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <button
                      onClick={() => handleNavigation('/help')}
                      className="w-full flex items-center space-x-3 p-2 text-left hover:text-foreground transition-luxury"
                    >
                      <Icon name="HelpCircle" size={18} />
                      <span>Ajuda</span>
                    </button>
                    <button
                      onClick={() => handleNavigation('/contact')}
                      className="w-full flex items-center space-x-3 p-2 text-left hover:text-foreground transition-luxury"
                    >
                      <Icon name="MessageCircle" size={18} />
                      <span>Contato</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;