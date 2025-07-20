import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ShippingForm = ({ formData, onFormChange, errors }) => {
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);

  const stateOptions = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' }
  ];

  const handleCepChange = async (value) => {
    onFormChange('cep', value);
    
    // Auto-fill address when CEP is complete
    if (value.replace(/\D/g, '').length === 8) {
      setIsCalculatingShipping(true);
      
      // Simulate CEP lookup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock address data
      onFormChange('street', 'Rua das Flores');
      onFormChange('neighborhood', 'Centro');
      onFormChange('city', 'São Paulo');
      onFormChange('state', 'SP');
      
      setIsCalculatingShipping(false);
    }
  };

  const formatCep = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  return (
    <div className="bg-card rounded-lg border border-border luxury-shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="MapPin" size={20} className="text-primary" />
        <h2 className="font-heading font-semibold text-lg text-foreground">
          Endereço de Entrega
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nome Completo"
          type="text"
          placeholder="Seu nome completo"
          value={formData.fullName || ''}
          onChange={(e) => onFormChange('fullName', e.target.value)}
          error={errors.fullName}
          required
          className="md:col-span-2"
        />

        <div className="relative md:col-span-2">
          <Input
            label="CEP"
            type="text"
            placeholder="00000-000"
            value={formatCep(formData.cep || '')}
            onChange={(e) => handleCepChange(e.target.value)}
            error={errors.cep}
            required
            maxLength={9}
          />
          {isCalculatingShipping && (
            <div className="absolute right-3 top-9 text-primary">
              <Icon name="Loader2" size={16} className="animate-spin" />
            </div>
          )}
        </div>

        <Input
          label="Endereço"
          type="text"
          placeholder="Rua, avenida, etc."
          value={formData.street || ''}
          onChange={(e) => onFormChange('street', e.target.value)}
          error={errors.street}
          required
          className="md:col-span-2"
        />

        <Input
          label="Número"
          type="text"
          placeholder="123"
          value={formData.number || ''}
          onChange={(e) => onFormChange('number', e.target.value)}
          error={errors.number}
          required
        />

        <Input
          label="Complemento"
          type="text"
          placeholder="Apto, bloco, etc. (opcional)"
          value={formData.complement || ''}
          onChange={(e) => onFormChange('complement', e.target.value)}
        />

        <Input
          label="Bairro"
          type="text"
          placeholder="Nome do bairro"
          value={formData.neighborhood || ''}
          onChange={(e) => onFormChange('neighborhood', e.target.value)}
          error={errors.neighborhood}
          required
        />

        <Input
          label="Cidade"
          type="text"
          placeholder="Nome da cidade"
          value={formData.city || ''}
          onChange={(e) => onFormChange('city', e.target.value)}
          error={errors.city}
          required
        />

        <Select
          label="Estado"
          placeholder="Selecione o estado"
          options={stateOptions}
          value={formData.state || ''}
          onChange={(value) => onFormChange('state', value)}
          error={errors.state}
          required
          searchable
          className="md:col-span-2"
        />
      </div>
    </div>
  );
};

export default ShippingForm;