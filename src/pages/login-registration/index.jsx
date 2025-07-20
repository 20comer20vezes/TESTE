import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Image from '../../components/AppImage';
import Icon from '../../components/AppIcon';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import GuestCheckoutOption from './components/GuestCheckoutOption';

const LoginRegistration = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/user-account-dashboard');
      return;
    }

    // Check URL params for initial tab
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    if (tab === 'register') {
      setActiveTab('register');
    }
  }, [navigate, location]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setShowForgotPassword(false);
    
    // Update URL without page reload
    const newUrl = tab === 'register' ? '/login-registration?tab=register': '/login-registration';
    window.history.replaceState({}, '', newUrl);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setActiveTab('login');
  };

  const breadcrumbItems = [
    { label: 'Início', path: '/home-landing-page' },
    { label: 'Entrar', path: '/login-registration' }
  ];

  return (
    <>
      <Helmet>
        <title>Entrar | LuxeFragrance - Sua Boutique de Fragrâncias Premium</title>
        <meta name="description" content="Entre na sua conta LuxeFragrance ou crie uma nova conta para acessar ofertas exclusivas, acompanhar pedidos e descobrir fragrâncias personalizadas." />
        <meta name="keywords" content="login, cadastro, conta, perfumes, fragrâncias, LuxeFragrance" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="relative">
          {/* Background Image */}
          <div className="fixed inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Luxury perfume bottles background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="container mx-auto px-4 lg:px-6 py-8">
              <Breadcrumb items={breadcrumbItems} />

              <div className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-200px)] gap-8 lg:gap-16">
                
                {/* Left Side - Brand Info (Desktop Only) */}
                <div className="hidden lg:block lg:w-1/2 max-w-lg">
                  <div className="text-center lg:text-left">
                    <div className="mb-8">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6">
                        <Icon name="Sparkles" size={40} className="text-primary" />
                      </div>
                      <h1 className="font-heading text-4xl lg:text-5xl font-semibold text-foreground mb-4">
                        Sua jornada de fragrâncias começa aqui
                      </h1>
                      <p className="text-lg text-muted-foreground font-caption leading-relaxed">
                        Descubra perfumes exclusivos, acompanhe seus pedidos e receba ofertas personalizadas na sua conta LuxeFragrance.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon name="Shield" size={20} className="text-success" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">Compra Segura</h3>
                          <p className="text-sm text-muted-foreground font-caption">
                            Seus dados protegidos com criptografia SSL
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon name="Award" size={20} className="text-accent" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">Produtos Autênticos</h3>
                          <p className="text-sm text-muted-foreground font-caption">
                            Garantia de originalidade em todos os perfumes
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon name="Heart" size={20} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">Experiência Personalizada</h3>
                          <p className="text-sm text-muted-foreground font-caption">
                            Recomendações baseadas no seu perfil
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Forms */}
                <div className="w-full lg:w-1/2 max-w-md">
                  <div className="bg-background/95 backdrop-blur-md border border-border rounded-2xl p-8 luxury-shadow-lg">
                    
                    {!showForgotPassword && (
                      <>
                        {/* Tab Navigation */}
                        <div className="flex bg-muted rounded-lg p-1 mb-8">
                          <button
                            onClick={() => handleTabSwitch('login')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-luxury ${
                              activeTab === 'login' ?'bg-background text-foreground luxury-shadow-sm' :'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            Entrar
                          </button>
                          <button
                            onClick={() => handleTabSwitch('register')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-luxury ${
                              activeTab === 'register' ?'bg-background text-foreground luxury-shadow-sm' :'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            Cadastrar
                          </button>
                        </div>

                        {/* Form Content */}
                        {activeTab === 'login' ? (
                          <LoginForm
                            onSwitchToRegister={() => handleTabSwitch('register')}
                            onForgotPassword={handleForgotPassword}
                          />
                        ) : (
                          <RegisterForm
                            onSwitchToLogin={() => handleTabSwitch('login')}
                          />
                        )}
                      </>
                    )}

                    {showForgotPassword && (
                      <ForgotPasswordForm onBackToLogin={handleBackToLogin} />
                    )}
                  </div>

                  {/* Guest Checkout Option */}
                  {!showForgotPassword && activeTab === 'login' && (
                    <div className="mt-8">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-background text-muted-foreground font-caption">
                            Ou
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <GuestCheckoutOption />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer Trust Signals */}
        <footer className="relative z-10 bg-background/95 backdrop-blur-md border-t border-border">
          <div className="container mx-auto px-4 lg:px-6 py-6">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground font-caption">
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={16} />
                <span>SSL Seguro</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} />
                <span>Dados Protegidos</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} />
                <span>Produtos Originais</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Truck" size={16} />
                <span>Entrega Garantida</span>
              </div>
            </div>
            
            <div className="text-center mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground font-caption">
                © {new Date().getFullYear()} LuxeFragrance. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LoginRegistration;