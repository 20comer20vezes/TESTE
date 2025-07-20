import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const PaymentForm = ({ selectedMethod, onMethodChange, paymentData, onPaymentDataChange, errors }) => {
  const [showPixQR, setShowPixQR] = useState(false);

  const paymentMethods = [
    {
      id: 'credit',
      name: 'Cartão de Crédito',
      description: 'Visa, Mastercard, Elo',
      icon: 'CreditCard'
    },
    {
      id: 'pix',
      name: 'PIX',
      description: 'Pagamento instantâneo',
      icon: 'Smartphone'
    },
    {
      id: 'installments',
      name: 'Parcelamento',
      description: 'Até 12x sem juros',
      icon: 'Calendar'
    }
  ];

  const installmentOptions = [
    { value: '1', label: '1x sem juros' },
    { value: '2', label: '2x sem juros' },
    { value: '3', label: '3x sem juros' },
    { value: '6', label: '6x sem juros' },
    { value: '12', label: '12x sem juros' }
  ];

  const formatCardNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiryDate = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{2})/, '$1/$2');
  };

  return (
    <div className="bg-card rounded-lg border border-border luxury-shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="CreditCard" size={20} className="text-primary" />
        <h2 className="font-heading font-semibold text-lg text-foreground">
          Forma de Pagamento
        </h2>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-3 mb-6">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-luxury ${
              selectedMethod === method.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
          >
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={(e) => onMethodChange(e.target.value)}
              className="sr-only"
            />
            
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              selectedMethod === method.id
                ? 'border-primary' :'border-muted-foreground'
            }`}>
              {selectedMethod === method.id && (
                <div className="w-2 h-2 bg-primary rounded-full" />
              )}
            </div>

            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              selectedMethod === method.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              <Icon name={method.icon} size={16} />
            </div>

            <div className="flex-1">
              <h3 className="font-medium text-foreground">{method.name}</h3>
              <p className="text-sm text-muted-foreground">{method.description}</p>
            </div>
          </label>
        ))}
      </div>

      {/* Credit Card Form */}
      {selectedMethod === 'credit' && (
        <div className="space-y-4 border-t border-border pt-4">
          <Input
            label="Número do Cartão"
            type="text"
            placeholder="0000 0000 0000 0000"
            value={formatCardNumber(paymentData.cardNumber || '')}
            onChange={(e) => onPaymentDataChange('cardNumber', e.target.value)}
            error={errors.cardNumber}
            required
            maxLength={19}
          />

          <Input
            label="Nome no Cartão"
            type="text"
            placeholder="Como está impresso no cartão"
            value={paymentData.cardName || ''}
            onChange={(e) => onPaymentDataChange('cardName', e.target.value)}
            error={errors.cardName}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Validade"
              type="text"
              placeholder="MM/AA"
              value={formatExpiryDate(paymentData.expiryDate || '')}
              onChange={(e) => onPaymentDataChange('expiryDate', e.target.value)}
              error={errors.expiryDate}
              required
              maxLength={5}
            />

            <Input
              label="CVV"
              type="text"
              placeholder="123"
              value={paymentData.cvv || ''}
              onChange={(e) => onPaymentDataChange('cvv', e.target.value)}
              error={errors.cvv}
              required
              maxLength={4}
            />
          </div>
        </div>
      )}

      {/* PIX Payment */}
      {selectedMethod === 'pix' && (
        <div className="border-t border-border pt-4">
          <div className="text-center p-6 bg-muted/50 rounded-lg">
            <Icon name="Smartphone" size={48} className="text-primary mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-foreground mb-2">
              Pagamento via PIX
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Após confirmar o pedido, você receberá o código PIX para pagamento
            </p>
            <div className="flex items-center justify-center space-x-2 text-xs text-success">
              <Icon name="CheckCircle" size={14} />
              <span>Aprovação instantânea</span>
            </div>
          </div>
        </div>
      )}

      {/* Installments */}
      {selectedMethod === 'installments' && (
        <div className="space-y-4 border-t border-border pt-4">
          <Select
            label="Número de Parcelas"
            placeholder="Escolha o parcelamento"
            options={installmentOptions}
            value={paymentData.installments || ''}
            onChange={(value) => onPaymentDataChange('installments', value)}
            error={errors.installments}
            required
          />

          <Input
            label="Número do Cartão"
            type="text"
            placeholder="0000 0000 0000 0000"
            value={formatCardNumber(paymentData.cardNumber || '')}
            onChange={(e) => onPaymentDataChange('cardNumber', e.target.value)}
            error={errors.cardNumber}
            required
            maxLength={19}
          />

          <Input
            label="Nome no Cartão"
            type="text"
            placeholder="Como está impresso no cartão"
            value={paymentData.cardName || ''}
            onChange={(e) => onPaymentDataChange('cardName', e.target.value)}
            error={errors.cardName}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Validade"
              type="text"
              placeholder="MM/AA"
              value={formatExpiryDate(paymentData.expiryDate || '')}
              onChange={(e) => onPaymentDataChange('expiryDate', e.target.value)}
              error={errors.expiryDate}
              required
              maxLength={5}
            />

            <Input
              label="CVV"
              type="text"
              placeholder="123"
              value={paymentData.cvv || ''}
              onChange={(e) => onPaymentDataChange('cvv', e.target.value)}
              error={errors.cvv}
              required
              maxLength={4}
            />
          </div>
        </div>
      )}

      {/* Gift Wrapping Option */}
      <div className="border-t border-border pt-4 mt-6">
        <Checkbox
          label="Embalagem para presente (+R$ 9,90)"
          description="Embalagem especial com laço dourado"
          checked={paymentData.giftWrap || false}
          onChange={(e) => onPaymentDataChange('giftWrap', e.target.checked)}
        />
      </div>

      {/* Security Info */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Shield" size={16} className="text-success mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">Pagamento Seguro</p>
            <p className="text-xs text-muted-foreground">
              Seus dados são protegidos com criptografia SSL de 256 bits
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;