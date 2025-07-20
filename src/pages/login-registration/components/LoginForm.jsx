import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = ({ onSwitchToRegister, onForgotPassword }) => {
  const navigate = useNavigate();
  const { signIn, authError, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (authError) {
      clearError();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await signIn(formData.email, formData.password);

      if (result?.success) {
        // Clear local storage from previous mock auth
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        // Navigate to account dashboard
        navigate('/user-account-dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      // For development preview - show message about social login
      setErrors({
        general: `Login social com ${provider} será implementado em breve. Use email/senha por enquanto.`
      });
    } catch (error) {
      setErrors({
        general: 'Erro ao fazer login social. Tente novamente.'
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground mb-2">
          Bem-vinda de volta
        </h2>
        <p className="text-muted-foreground font-caption">
          Entre na sua conta para continuar sua jornada de fragrâncias
        </p>
      </div>

      {(authError || errors.general) && (
        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={18} className="text-error flex-shrink-0" />
            <p className="text-sm text-error">{authError || errors.general}</p>
          </div>
        </div>
      )}

      <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Info" size={18} className="text-primary flex-shrink-0" />
          <p className="text-sm font-medium text-primary">Credenciais de Teste</p>
        </div>
        <div className="text-sm text-primary/80 space-y-1">
          <p><strong>Admin:</strong> admin@luxefragrance.com / AdminPass123!</p>
          <p><strong>Usuário:</strong> maria@luxefragrance.com / LuxePass123</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <Input
          label="Senha"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
        />

        <div className="flex items-center justify-between">
          <Checkbox
            label="Lembrar de mim"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
          />

          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-luxury font-caption"
          >
            Esqueceu a senha?
          </button>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          className="mt-8"
        >
          Entrar
        </Button>
      </form>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-background text-muted-foreground font-caption">
              Ou continue com
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            className="flex items-center justify-center space-x-2"
          >
            <Icon name="Chrome" size={18} />
            <span className="font-caption">Google</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => handleSocialLogin('facebook')}
            className="flex items-center justify-center space-x-2"
          >
            <Icon name="Facebook" size={18} />
            <span className="font-caption">Facebook</span>
          </Button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground font-caption">
          Não tem uma conta?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-primary hover:text-primary/80 transition-luxury font-medium"
          >
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;