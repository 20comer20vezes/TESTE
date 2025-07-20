import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentSection = ({ paymentMethods, onAddPayment, onUpdatePayment, onDeletePayment, onSetDefault }) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [paymentType, setPaymentType] = useState('credit');
  const [formData, setFormData] = useState({
    type: 'credit',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    pixKey: '',
    pixKeyType: 'email',
    isDefault: false
  });
  const [errors, setErrors] = useState({});

  const cardBrands = {
    visa: { name: 'Visa', icon: 'CreditCard', color: 'text-blue-600' },
    mastercard: { name: 'Mastercard', icon: 'CreditCard', color: 'text-red-600' },
    amex: { name: 'American Express', icon: 'CreditCard', color: 'text-green-600' },
    elo: { name: 'Elo', icon: 'CreditCard', color: 'text-yellow-600' }
  };

  const pixKeyTypes = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Telefone' },
    { value: 'cpf', label: 'CPF' },
    { value: 'random', label: 'Chave Aleatória' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const detectCardBrand = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '');
    if (/^4/.test(number)) return 'visa';
    if (/^5[1-5]/.test(number)) return 'mastercard';
    if (/^3[47]/.test(number)) return 'amex';
    if (/^636368|^438935|^504175|^451416|^636297/.test(number)) return 'elo';
    return null;
  };

  const validateForm = () => {
    const newErrors = {};

    if (paymentType === 'credit') {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Número do cartão é obrigatório';
      } else if (formData.cardNumber.replace(/\s/g, '').length < 13) {
        newErrors.cardNumber = 'Número do cartão inválido';
      }

      if (!formData.cardName.trim()) {
        newErrors.cardName = 'Nome no cartão é obrigatório';
      }

      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = 'Data de validade é obrigatória';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Formato inválido (MM/AA)';
      }

      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV é obrigatório';
      } else if (formData.cvv.length < 3) {
        newErrors.cvv = 'CVV inválido';
      }
    } else if (paymentType === 'pix') {
      if (!formData.pixKey.trim()) {
        newErrors.pixKey = 'Chave PIX é obrigatória';
      } else {
        // Basic PIX key validation
        const { pixKeyType, pixKey } = formData;
        if (pixKeyType === 'email' && !/\S+@\S+\.\S+/.test(pixKey)) {
          newErrors.pixKey = 'Email inválido';
        } else if (pixKeyType === 'phone' && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(pixKey)) {
          newErrors.pixKey = 'Formato: (11) 99999-9999';
        } else if (pixKeyType === 'cpf' && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(pixKey)) {
          newErrors.pixKey = 'Formato: 000.000.000-00';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const paymentData = {
        ...formData,
        type: paymentType,
        brand: paymentType === 'credit' ? detectCardBrand(formData.cardNumber) : null
      };

      if (editingId) {
        onUpdatePayment(editingId, paymentData);
        setEditingId(null);
      } else {
        onAddPayment(paymentData);
        setIsAddingNew(false);
      }
      resetForm();
    }
  };

  const handleEdit = (payment) => {
    setFormData(payment);
    setPaymentType(payment.type);
    setEditingId(payment.id);
    setIsAddingNew(false);
  };

  const handleCancel = () => {
    resetForm();
    setIsAddingNew(false);
    setEditingId(null);
  };

  const resetForm = () => {
    setFormData({
      type: 'credit',
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      pixKey: '',
      pixKeyType: 'email',
      isDefault: false
    });
    setPaymentType('credit');
    setErrors({});
  };

  const handleAddNew = () => {
    resetForm();
    setIsAddingNew(true);
    setEditingId(null);
  };

  const getPaymentIcon = (payment) => {
    if (payment.type === 'pix') {
      return 'Smartphone';
    }
    return cardBrands[payment.brand]?.icon || 'CreditCard';
  };

  const getPaymentDisplay = (payment) => {
    if (payment.type === 'pix') {
      return `PIX - ${payment.pixKeyType === 'email' ? 'Email' : 
                     payment.pixKeyType === 'phone' ? 'Telefone' : 
                     payment.pixKeyType === 'cpf' ? 'CPF' : 'Chave Aleatória'}`;
    }
    return `**** **** **** ${payment.cardNumber.slice(-4)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-semibold text-2xl text-foreground">
            Métodos de Pagamento
          </h2>
          <p className="text-muted-foreground">
            Gerencie seus cartões e chaves PIX
          </p>
        </div>
        <Button
          variant="default"
          onClick={handleAddNew}
          iconName="Plus"
          iconPosition="left"
          disabled={isAddingNew || editingId}
        >
          Adicionar Método
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(isAddingNew || editingId) && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-6">
            {editingId ? 'Editar Método de Pagamento' : 'Novo Método de Pagamento'}
          </h3>

          {/* Payment Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-3">
              Tipo de Pagamento
            </label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentType"
                  value="credit"
                  checked={paymentType === 'credit'}
                  onChange={(e) => setPaymentType(e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-ring"
                />
                <Icon name="CreditCard" size={20} />
                <span className="text-sm text-foreground">Cartão de Crédito</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentType"
                  value="pix"
                  checked={paymentType === 'pix'}
                  onChange={(e) => setPaymentType(e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-ring"
                />
                <Icon name="Smartphone" size={20} />
                <span className="text-sm text-foreground">PIX</span>
              </label>
            </div>
          </div>

          {/* Credit Card Form */}
          {paymentType === 'credit' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input
                  label="Número do Cartão"
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                  error={errors.cardNumber}
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  required
                />
              </div>

              <Input
                label="Nome no Cartão"
                type="text"
                value={formData.cardName}
                onChange={(e) => handleInputChange('cardName', e.target.value.toUpperCase())}
                error={errors.cardName}
                placeholder="NOME COMO NO CARTÃO"
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Validade"
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                  error={errors.expiryDate}
                  placeholder="MM/AA"
                  maxLength={5}
                  required
                />

                <Input
                  label="CVV"
                  type="text"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                  error={errors.cvv}
                  placeholder="123"
                  maxLength={4}
                  required
                />
              </div>
            </div>
          )}

          {/* PIX Form */}
          {paymentType === 'pix' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Tipo de Chave PIX
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {pixKeyTypes.map((type) => (
                    <label key={type.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="pixKeyType"
                        value={type.value}
                        checked={formData.pixKeyType === type.value}
                        onChange={(e) => handleInputChange('pixKeyType', e.target.value)}
                        className="w-4 h-4 text-primary border-border focus:ring-ring"
                      />
                      <span className="text-sm text-foreground">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Input
                label="Chave PIX"
                type="text"
                value={formData.pixKey}
                onChange={(e) => handleInputChange('pixKey', e.target.value)}
                error={errors.pixKey}
                placeholder={
                  formData.pixKeyType === 'email' ? 'seu@email.com' :
                  formData.pixKeyType === 'phone' ? '(11) 99999-9999' :
                  formData.pixKeyType === 'cpf'? '000.000.000-00' : 'Chave aleatória'
                }
                required
              />
            </div>
          )}

          <div className="mt-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isDefault}
                onChange={(e) => handleInputChange('isDefault', e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-ring"
              />
              <span className="text-sm text-foreground">
                Definir como método padrão
              </span>
            </label>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              variant="default"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
            >
              {editingId ? 'Atualizar' : 'Salvar'} Método
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Payment Methods List */}
      <div className="space-y-4">
        {paymentMethods.map((payment) => (
          <div key={payment.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon 
                    name={getPaymentIcon(payment)} 
                    size={24} 
                    className={payment.type === 'credit' && payment.brand ? cardBrands[payment.brand]?.color : 'text-primary'} 
                  />
                </div>
                
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-foreground">
                      {payment.type === 'credit' ? 
                        (cardBrands[payment.brand]?.name || 'Cartão de Crédito') : 
                        'PIX'
                      }
                    </h3>
                    {payment.isDefault && (
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                        Padrão
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {getPaymentDisplay(payment)}
                  </p>
                  
                  {payment.type === 'credit' && (
                    <p className="text-xs text-muted-foreground">
                      {payment.cardName}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {!payment.isDefault && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSetDefault(payment.id)}
                    iconName="Star"
                    title="Definir como padrão"
                  />
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(payment)}
                  iconName="Edit"
                  title="Editar método"
                />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeletePayment(payment.id)}
                  iconName="Trash2"
                  title="Excluir método"
                  disabled={payment.isDefault}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {paymentMethods.length === 0 && !isAddingNew && (
        <div className="text-center py-12">
          <Icon name="CreditCard" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
            Nenhum método de pagamento cadastrado
          </h3>
          <p className="text-muted-foreground mb-6">
            Adicione um cartão ou chave PIX para facilitar suas compras
          </p>
          <Button
            variant="default"
            onClick={handleAddNew}
            iconName="Plus"
            iconPosition="left"
          >
            Adicionar Primeiro Método
          </Button>
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-gradient-to-r from-success/5 to-primary/5 rounded-lg p-6 border border-success/10">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-success mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Segurança dos seus dados</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Seus dados de pagamento são criptografados e protegidos</li>
              <li>• Nunca compartilhamos suas informações com terceiros</li>
              <li>• Utilizamos certificados SSL para todas as transações</li>
              <li>• Você pode remover seus métodos de pagamento a qualquer momento</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;