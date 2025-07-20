import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AddressesSection = ({ addresses, onAddAddress, onUpdateAddress, onDeleteAddress, onSetDefault }) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    label: '',
    name: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false
  });
  const [errors, setErrors] = useState({});

  const brazilianStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
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

  const handleZipCodeChange = async (zipCode) => {
    const cleanZipCode = zipCode.replace(/\D/g, '');
    
    // Format as 00000-000
    let formattedZipCode = cleanZipCode;
    if (cleanZipCode.length > 5) {
      formattedZipCode = `${cleanZipCode.slice(0, 5)}-${cleanZipCode.slice(5, 8)}`;
    }
    
    handleInputChange('zipCode', formattedZipCode);

    // Mock CEP lookup (in real app, would call ViaCEP API)
    if (cleanZipCode.length === 8) {
      // Simulate API call delay
      setTimeout(() => {
        const mockAddressData = {
          street: 'Rua das Flores',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP'
        };
        
        setFormData(prev => ({
          ...prev,
          street: mockAddressData.street,
          neighborhood: mockAddressData.neighborhood,
          city: mockAddressData.city,
          state: mockAddressData.state
        }));
      }, 500);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.label.trim()) {
      newErrors.label = 'Nome do endereço é obrigatório';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Nome do destinatário é obrigatório';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'CEP é obrigatório';
    } else if (!/^\d{5}-?\d{3}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'CEP inválido';
    }

    if (!formData.street.trim()) {
      newErrors.street = 'Logradouro é obrigatório';
    }

    if (!formData.number.trim()) {
      newErrors.number = 'Número é obrigatório';
    }

    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = 'Bairro é obrigatório';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Cidade é obrigatória';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'Estado é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      if (editingId) {
        onUpdateAddress(editingId, formData);
        setEditingId(null);
      } else {
        onAddAddress(formData);
        setIsAddingNew(false);
      }
      resetForm();
    }
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingId(address.id);
    setIsAddingNew(false);
  };

  const handleCancel = () => {
    resetForm();
    setIsAddingNew(false);
    setEditingId(null);
  };

  const resetForm = () => {
    setFormData({
      label: '',
      name: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
      isDefault: false
    });
    setErrors({});
  };

  const handleAddNew = () => {
    resetForm();
    setIsAddingNew(true);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-semibold text-2xl text-foreground">
            Meus Endereços
          </h2>
          <p className="text-muted-foreground">
            Gerencie seus endereços de entrega
          </p>
        </div>
        <Button
          variant="default"
          onClick={handleAddNew}
          iconName="Plus"
          iconPosition="left"
          disabled={isAddingNew || editingId}
        >
          Novo Endereço
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(isAddingNew || editingId) && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-6">
            {editingId ? 'Editar Endereço' : 'Novo Endereço'}
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Nome do Endereço"
              type="text"
              value={formData.label}
              onChange={(e) => handleInputChange('label', e.target.value)}
              error={errors.label}
              placeholder="Ex: Casa, Trabalho, Casa da Mãe"
              required
            />

            <Input
              label="Nome do Destinatário"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={errors.name}
              placeholder="Nome completo"
              required
            />

            <Input
              label="CEP"
              type="text"
              value={formData.zipCode}
              onChange={(e) => handleZipCodeChange(e.target.value)}
              error={errors.zipCode}
              placeholder="00000-000"
              required
            />

            <Input
              label="Logradouro"
              type="text"
              value={formData.street}
              onChange={(e) => handleInputChange('street', e.target.value)}
              error={errors.street}
              placeholder="Rua, Avenida, etc."
              required
            />

            <Input
              label="Número"
              type="text"
              value={formData.number}
              onChange={(e) => handleInputChange('number', e.target.value)}
              error={errors.number}
              placeholder="123"
              required
            />

            <Input
              label="Complemento"
              type="text"
              value={formData.complement}
              onChange={(e) => handleInputChange('complement', e.target.value)}
              placeholder="Apto, Bloco, etc. (opcional)"
            />

            <Input
              label="Bairro"
              type="text"
              value={formData.neighborhood}
              onChange={(e) => handleInputChange('neighborhood', e.target.value)}
              error={errors.neighborhood}
              placeholder="Nome do bairro"
              required
            />

            <Input
              label="Cidade"
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              error={errors.city}
              placeholder="Nome da cidade"
              required
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Estado <span className="text-error">*</span>
              </label>
              <select
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className={`w-full px-3 py-2 bg-input border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-luxury ${
                  errors.state ? 'border-error' : 'border-border'
                }`}
              >
                <option value="">Selecione o estado</option>
                {brazilianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && (
                <p className="mt-1 text-sm text-error">{errors.state}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => handleInputChange('isDefault', e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-ring"
                />
                <span className="text-sm text-foreground">
                  Definir como endereço padrão
                </span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              variant="default"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
            >
              {editingId ? 'Atualizar' : 'Salvar'} Endereço
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

      {/* Addresses List */}
      <div className="space-y-4">
        {addresses.map((address) => (
          <div key={address.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-foreground">{address.label}</h3>
                  {address.isDefault && (
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                      Padrão
                    </span>
                  )}
                </div>
                
                <p className="font-medium text-foreground mb-1">{address.name}</p>
                
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    {address.street}, {address.number}
                    {address.complement && `, ${address.complement}`}
                  </p>
                  <p>{address.neighborhood}</p>
                  <p>{address.city} - {address.state}</p>
                  <p>CEP: {address.zipCode}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                {!address.isDefault && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSetDefault(address.id)}
                    iconName="Star"
                    title="Definir como padrão"
                  />
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(address)}
                  iconName="Edit"
                  title="Editar endereço"
                />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteAddress(address.id)}
                  iconName="Trash2"
                  title="Excluir endereço"
                  disabled={address.isDefault}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {addresses.length === 0 && !isAddingNew && (
        <div className="text-center py-12">
          <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
            Nenhum endereço cadastrado
          </h3>
          <p className="text-muted-foreground mb-6">
            Adicione um endereço para facilitar suas compras
          </p>
          <Button
            variant="default"
            onClick={handleAddNew}
            iconName="Plus"
            iconPosition="left"
          >
            Adicionar Primeiro Endereço
          </Button>
        </div>
      )}

      {/* Address Tips */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6 border border-primary/10">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Dicas para seus endereços</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Mantenha seus endereços sempre atualizados</li>
              <li>• Use nomes descritivos como "Casa", "Trabalho" ou "Casa da Mãe"</li>
              <li>• O endereço padrão será usado automaticamente no checkout</li>
              <li>• Verifique se o CEP está correto para evitar atrasos na entrega</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressesSection;