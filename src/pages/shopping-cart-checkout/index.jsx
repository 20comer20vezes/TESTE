import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import ShippingForm from './components/ShippingForm';
import DeliveryOptions from './components/DeliveryOptions';
import PaymentForm from './components/PaymentForm';
import NewsletterSignup from './components/NewsletterSignup';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ShoppingCartCheckout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('cart'); // cart, shipping, payment
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [discount, setDiscount] = useState(0);

  // Form states
  const [shippingData, setShippingData] = useState({});
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [paymentData, setPaymentData] = useState({});
  const [errors, setErrors] = useState({});

  // Load cart items on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      // Mock cart data for demonstration
      const mockCartItems = [
        {
          id: 1,
          name: "Chanel No. 5 Eau de Parfum",
          brand: "Chanel",
          size: "100ml",
          price: 899.90,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop"
        },
        {
          id: 2,
          name: "Dior J'adore Infinissime",
          brand: "Dior",
          size: "50ml",
          price: 649.90,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400&h=400&fit=crop"
        },
        {
          id: 3,
          name: "Tom Ford Black Orchid",
          brand: "Tom Ford",
          size: "30ml",
          price: 459.90,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop"
        }
      ];
      setCartItems(mockCartItems);
      localStorage.setItem('cartItems', JSON.stringify(mockCartItems));
    }
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = deliveryOption === 'standard' ? 0 : deliveryOption === 'express' ? 15.90 : 29.90;
  const giftWrapCost = paymentData.giftWrap ? 9.90 : 0;
  const total = subtotal - discount + shipping + giftWrapCost;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');

    // Mock promo codes
    const validCodes = {
      'LUXE10': { discount: subtotal * 0.1, message: 'Desconto de 10% aplicado!' },
      'PRIMEIRA20': { discount: subtotal * 0.2, message: 'Desconto de primeira compra aplicado!' },
      'FRETEGRATIS': { discount: shipping, message: 'Frete grátis aplicado!' }
    };

    if (validCodes[promoCode.toUpperCase()]) {
      const promo = validCodes[promoCode.toUpperCase()];
      setDiscount(promo.discount);
      setPromoSuccess(promo.message);
      setPromoCode('');
    } else {
      setPromoError('Código promocional inválido');
    }
  };

  const handleShippingFormChange = (field, value) => {
    setShippingData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePaymentDataChange = (field, value) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateShippingForm = () => {
    const newErrors = {};
    
    if (!shippingData.fullName) newErrors.fullName = 'Nome completo é obrigatório';
    if (!shippingData.cep) newErrors.cep = 'CEP é obrigatório';
    if (!shippingData.street) newErrors.street = 'Endereço é obrigatório';
    if (!shippingData.number) newErrors.number = 'Número é obrigatório';
    if (!shippingData.neighborhood) newErrors.neighborhood = 'Bairro é obrigatório';
    if (!shippingData.city) newErrors.city = 'Cidade é obrigatória';
    if (!shippingData.state) newErrors.state = 'Estado é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentForm = () => {
    const newErrors = {};

    if (paymentMethod === 'credit' || paymentMethod === 'installments') {
      if (!paymentData.cardNumber) newErrors.cardNumber = 'Número do cartão é obrigatório';
      if (!paymentData.cardName) newErrors.cardName = 'Nome no cartão é obrigatório';
      if (!paymentData.expiryDate) newErrors.expiryDate = 'Data de validade é obrigatória';
      if (!paymentData.cvv) newErrors.cvv = 'CVV é obrigatório';
      
      if (paymentMethod === 'installments' && !paymentData.installments) {
        newErrors.installments = 'Selecione o número de parcelas';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToShipping = () => {
    if (cartItems.length === 0) return;
    setCurrentStep('shipping');
  };

  const handleContinueToPayment = () => {
    if (validateShippingForm()) {
      setCurrentStep('payment');
    }
  };

  const handlePlaceOrder = async () => {
    if (!validatePaymentForm()) return;

    setIsLoading(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Clear cart and redirect to success page
    localStorage.removeItem('cartItems');
    navigate('/user-account-dashboard?tab=orders&success=true');
  };

  const breadcrumbItems = [
    { label: 'Início', path: '/home-landing-page' },
    { label: 'Carrinho', path: '/shopping-cart-checkout' }
  ];

  if (cartItems.length === 0 && currentStep === 'cart') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="ShoppingBag" size={48} className="text-muted-foreground" />
            </div>
            <h1 className="font-heading font-semibold text-2xl text-foreground mb-4">
              Seu carrinho está vazio
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Explore nossa coleção de fragrâncias exclusivas e encontre o perfume perfeito para você
            </p>
            <Button
              variant="default"
              onClick={() => navigate('/product-catalog-browse')}
              iconName="ArrowRight"
              iconPosition="right"
            >
              Explorar Produtos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 lg:px-6 py-8">
        <Breadcrumb items={breadcrumbItems} />

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[
              { id: 'cart', label: 'Carrinho', icon: 'ShoppingBag' },
              { id: 'shipping', label: 'Entrega', icon: 'MapPin' },
              { id: 'payment', label: 'Pagamento', icon: 'CreditCard' }
            ].map((step, index) => (
              <React.Fragment key={step.id}>
                <div className={`flex items-center space-x-2 ${
                  currentStep === step.id ? 'text-primary' : 
                  ['cart', 'shipping'].includes(step.id) && currentStep === 'payment' ? 'text-success' :
                  step.id === 'shipping'&& currentStep === 'shipping' ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === step.id ? 'bg-primary text-primary-foreground' :
                    ['cart', 'shipping'].includes(step.id) && currentStep === 'payment' ? 'bg-success text-success-foreground' :
                    step.id === 'shipping' && currentStep === 'shipping' ? 'bg-primary text-primary-foreground' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={step.icon} size={16} />
                  </div>
                  <span className="font-medium text-sm">{step.label}</span>
                </div>
                {index < 2 && (
                  <div className={`w-8 h-0.5 ${
                    (step.id === 'cart' && ['shipping', 'payment'].includes(currentStep)) ||
                    (step.id === 'shipping' && currentStep === 'payment')
                      ? 'bg-success' : 'bg-muted'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items */}
            {currentStep === 'cart' && (
              <>
                <div className="bg-card rounded-lg border border-border luxury-shadow-sm p-6">
                  <h1 className="font-heading font-semibold text-2xl text-foreground mb-6">
                    Seu Carrinho ({itemCount} {itemCount === 1 ? 'item' : 'itens'})
                  </h1>
                  
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemoveItem}
                      />
                    ))}
                  </div>
                </div>

                <NewsletterSignup />
              </>
            )}

            {/* Shipping Form */}
            {currentStep === 'shipping' && (
              <>
                <ShippingForm
                  formData={shippingData}
                  onFormChange={handleShippingFormChange}
                  errors={errors}
                />
                <DeliveryOptions
                  selectedOption={deliveryOption}
                  onOptionChange={setDeliveryOption}
                />
              </>
            )}

            {/* Payment Form */}
            {currentStep === 'payment' && (
              <PaymentForm
                selectedMethod={paymentMethod}
                onMethodChange={setPaymentMethod}
                paymentData={paymentData}
                onPaymentDataChange={handlePaymentDataChange}
                errors={errors}
              />
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              shipping={shipping + giftWrapCost}
              total={total}
              itemCount={itemCount}
              promoCode={promoCode}
              onPromoCodeChange={setPromoCode}
              onApplyPromo={handleApplyPromo}
              promoError={promoError}
              promoSuccess={promoSuccess}
            />

            {/* Action Buttons */}
            <div className="space-y-3">
              {currentStep === 'cart' && (
                <Button
                  variant="default"
                  fullWidth
                  onClick={handleContinueToShipping}
                  disabled={cartItems.length === 0}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Continuar para Entrega
                </Button>
              )}

              {currentStep === 'shipping' && (
                <>
                  <Button
                    variant="default"
                    fullWidth
                    onClick={handleContinueToPayment}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Continuar para Pagamento
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setCurrentStep('cart')}
                    iconName="ArrowLeft"
                    iconPosition="left"
                  >
                    Voltar ao Carrinho
                  </Button>
                </>
              )}

              {currentStep === 'payment' && (
                <>
                  <Button
                    variant="default"
                    fullWidth
                    onClick={handlePlaceOrder}
                    loading={isLoading}
                    iconName="CheckCircle"
                    iconPosition="left"
                  >
                    {isLoading ? 'Processando...' : 'Finalizar Pedido'}
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setCurrentStep('shipping')}
                    iconName="ArrowLeft"
                    iconPosition="left"
                    disabled={isLoading}
                  >
                    Voltar para Entrega
                  </Button>
                </>
              )}

              <Button
                variant="ghost"
                fullWidth
                onClick={() => navigate('/product-catalog-browse')}
                iconName="Plus"
                iconPosition="left"
              >
                Continuar Comprando
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartCheckout;