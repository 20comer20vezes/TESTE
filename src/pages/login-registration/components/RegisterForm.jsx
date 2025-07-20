import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegisterForm = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();
  const { signUp, authError, clearError } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
    newsletter: false,
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (authError) {
      clearError();
    }

    // Calculate password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1: return { text: 'Muito fraca', color: 'text-error' };
      case 2: return { text: 'Fraca', color: 'text-warning' };
      case 3: return { text: 'Média', color: 'text-accent' };
      case 4: return { text: 'Forte', color: 'text-success' };
      case 5: return { text: 'Muito forte', color: 'text-success' };
      default: return { text: '', color: '' };
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
    } else if (passwordStrength < 3) {
      newErrors.password = 'Senha muito fraca. Use letras maiúsculas, minúsculas e números';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    if (formData.phone && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Formato inválido. Use: (11) 99999-9999';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Você deve aceitar os termos e condições';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhone = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as (XX) XXXXX-XXXX or (XX) XXXX-XXXX
    if (digits.length <= 2) {
      return `(${digits}`;
    } else if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 11) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
    
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const userData = {
        fullName: formData.fullName,
        phone: formData.phone,
        birthDate: formData.birthDate,
        newsletter: formData.newsletter
      };

      const result = await signUp(formData.email, formData.password, userData);

      if (result?.success) {
        // Clear local storage from previous mock auth
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        
        // Navigate to account dashboard
        navigate('/user-account-dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const strengthIndicator = getPasswordStrengthText();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground mb-2">
          Crie sua conta
        </h2>
        <p className="text-muted-foreground font-caption">
          Junte-se à nossa comunidade de amantes de fragrâncias
        </p>
      </div>

      {authError && (
        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={18} className="text-error flex-shrink-0" />
            <p className="text-sm text-error">{authError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Nome Completo"
          type="text"
          name="fullName"
          placeholder="Seu nome completo"
          value={formData.fullName}
          onChange={handleInputChange}
          error={errors.fullName}
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
        />

        <div>
          <Input
            label="Senha"
            type="password"
            name="password"
            placeholder="Crie uma senha forte"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
          />
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passwordStrength <= 2 ? 'bg-error' : 
                      passwordStrength === 3 ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  />
                </div>
                <span className={`text-xs font-caption ${strengthIndicator.color}`}>
                  {strengthIndicator.text}
                </span>
              </div>
            </div>
          )}
        </div>

        <Input
          label="Confirmar Senha"
          type="password"
          name="confirmPassword"
          placeholder="Digite a senha novamente"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
          required
        />

        <Input
          label="Telefone (Opcional)"
          type="tel"
          name="phone"
          placeholder="(11) 99999-9999"
          value={formData.phone}
          onChange={handlePhoneChange}
          error={errors.phone}
          description="Para atualizações sobre pedidos"
        />

        <Input
          label="Data de Nascimento (Opcional)"
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleInputChange}
          description="Para ofertas personalizadas"
        />

        <div className="space-y-4">
          <Checkbox
            label="Quero receber ofertas exclusivas e novidades por email"
            description="Ganhe 10% de desconto na primeira compra!"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleInputChange}
          />

          <Checkbox
            label="Aceito os termos de uso e política de privacidade"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleInputChange}
            error={errors.acceptTerms}
            required
          />
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          className="mt-8"
        >
          Criar Conta
        </Button>
      </form>

      <div className="mt-8">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground font-caption">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={14} />
            <span>Dados Seguros</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={14} />
            <span>Produtos Autênticos</span>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground font-caption">
          Já tem uma conta?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-primary hover:text-primary/80 transition-luxury font-medium"
          >
            Entrar
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;