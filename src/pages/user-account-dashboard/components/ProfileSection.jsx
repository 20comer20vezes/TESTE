import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileSection = ({ userInfo, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
    birthDate: userInfo.birthDate,
    gender: userInfo.gender,
    preferences: userInfo.preferences || {
      fragranceTypes: [],
      occasions: [],
      priceRange: '',
      newsletter: true,
      smsNotifications: false
    }
  });
  const [errors, setErrors] = useState({});

  const fragranceTypes = [
    'Floral', 'Amadeirado', 'Cítrico', 'Oriental', 'Frutado', 'Aquático', 'Gourmand'
  ];

  const occasions = [
    'Dia a dia', 'Trabalho', 'Noite', 'Eventos especiais', 'Esportes', 'Romântico'
  ];

  const priceRanges = [
    { value: '0-200', label: 'Até R$ 200' },
    { value: '200-500', label: 'R$ 200 - R$ 500' },
    { value: '500-1000', label: 'R$ 500 - R$ 1.000' },
    { value: '1000+', label: 'Acima de R$ 1.000' }
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

  const handlePreferenceChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [category]: value
      }
    }));
  };

  const handleFragranceTypeToggle = (type) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        fragranceTypes: prev.preferences.fragranceTypes.includes(type)
          ? prev.preferences.fragranceTypes.filter(t => t !== type)
          : [...prev.preferences.fragranceTypes, type]
      }
    }));
  };

  const handleOccasionToggle = (occasion) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        occasions: prev.preferences.occasions.includes(occasion)
          ? prev.preferences.occasions.filter(o => o !== occasion)
          : [...prev.preferences.occasions, occasion]
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (formData.phone && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Formato: (11) 99999-9999';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdateProfile(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      birthDate: userInfo.birthDate,
      gender: userInfo.gender,
      preferences: userInfo.preferences || {
        fragranceTypes: [],
        occasions: [],
        priceRange: '',
        newsletter: true,
        smsNotifications: false
      }
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-semibold text-2xl text-foreground">
            Meu Perfil
          </h2>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais e preferências
          </p>
        </div>
        {!isEditing ? (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
          >
            Editar Perfil
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
            >
              Salvar
            </Button>
          </div>
        )}
      </div>

      {/* Personal Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-6">
          Informações Pessoais
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Nome Completo"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={errors.name}
            disabled={!isEditing}
            required
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            disabled={!isEditing}
            required
          />

          <Input
            label="Telefone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            error={errors.phone}
            placeholder="(11) 99999-9999"
            disabled={!isEditing}
          />

          <Input
            label="Data de Nascimento"
            type="date"
            value={formData.birthDate}
            onChange={(e) => handleInputChange('birthDate', e.target.value)}
            disabled={!isEditing}
          />

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Gênero
            </label>
            <div className="flex gap-4">
              {['Feminino', 'Masculino', 'Não informar'].map((option) => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={formData.gender === option}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    disabled={!isEditing}
                    className="w-4 h-4 text-primary border-border focus:ring-ring"
                  />
                  <span className="text-sm text-foreground">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fragrance Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-6">
          Preferências de Fragrâncias
        </h3>

        {/* Fragrance Types */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-3">
            Tipos de Fragrância Favoritos
          </label>
          <div className="flex flex-wrap gap-2">
            {fragranceTypes.map((type) => (
              <button
                key={type}
                onClick={() => isEditing && handleFragranceTypeToggle(type)}
                disabled={!isEditing}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-luxury ${
                  formData.preferences.fragranceTypes.includes(type)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                } ${!isEditing ? 'cursor-default' : 'cursor-pointer'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Occasions */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-3">
            Ocasiões de Uso
          </label>
          <div className="flex flex-wrap gap-2">
            {occasions.map((occasion) => (
              <button
                key={occasion}
                onClick={() => isEditing && handleOccasionToggle(occasion)}
                disabled={!isEditing}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-luxury ${
                  formData.preferences.occasions.includes(occasion)
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                } ${!isEditing ? 'cursor-default' : 'cursor-pointer'}`}
              >
                {occasion}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-3">
            Faixa de Preço Preferida
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {priceRanges.map((range) => (
              <label key={range.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  value={range.value}
                  checked={formData.preferences.priceRange === range.value}
                  onChange={(e) => handlePreferenceChange('priceRange', e.target.value)}
                  disabled={!isEditing}
                  className="w-4 h-4 text-primary border-border focus:ring-ring"
                />
                <span className="text-sm text-foreground">{range.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Communication Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-6">
          Preferências de Comunicação
        </h3>

        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="font-medium text-foreground">Newsletter por Email</span>
              <p className="text-sm text-muted-foreground">
                Receba novidades, lançamentos e ofertas especiais
              </p>
            </div>
            <input
              type="checkbox"
              checked={formData.preferences.newsletter}
              onChange={(e) => handlePreferenceChange('newsletter', e.target.checked)}
              disabled={!isEditing}
              className="w-5 h-5 text-primary border-border rounded focus:ring-ring"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="font-medium text-foreground">Notificações por SMS</span>
              <p className="text-sm text-muted-foreground">
                Receba atualizações de pedidos e ofertas urgentes
              </p>
            </div>
            <input
              type="checkbox"
              checked={formData.preferences.smsNotifications}
              onChange={(e) => handlePreferenceChange('smsNotifications', e.target.checked)}
              disabled={!isEditing}
              className="w-5 h-5 text-primary border-border rounded focus:ring-ring"
            />
          </label>
        </div>
      </div>

      {/* Account Statistics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-6">
          Estatísticas da Conta
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Package" size={24} className="text-primary" />
            </div>
            <div className="text-2xl font-heading font-semibold text-foreground">
              {userInfo.totalOrders}
            </div>
            <p className="text-sm text-muted-foreground">Pedidos Realizados</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Heart" size={24} className="text-accent" />
            </div>
            <div className="text-2xl font-heading font-semibold text-foreground">
              {userInfo.wishlistCount}
            </div>
            <p className="text-sm text-muted-foreground">Itens Salvos</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Star" size={24} className="text-success" />
            </div>
            <div className="text-2xl font-heading font-semibold text-foreground">
              {userInfo.reviewsCount}
            </div>
            <p className="text-sm text-muted-foreground">Avaliações</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Calendar" size={24} className="text-warning" />
            </div>
            <div className="text-2xl font-heading font-semibold text-foreground">
              {userInfo.membershipDays}
            </div>
            <p className="text-sm text-muted-foreground">Dias como Membro</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;