import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ForgotPasswordForm = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email é obrigatório');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email inválido');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsEmailSent(true);
    } catch (error) {
      setError('Erro ao enviar email. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  if (isEmailSent) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Mail" size={32} className="text-success" />
          </div>
          <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground mb-2">
            Email Enviado!
          </h2>
          <p className="text-muted-foreground font-caption">
            Enviamos as instruções para recuperar sua senha para:
          </p>
          <p className="text-foreground font-medium mt-2">{email}</p>
        </div>

        <div className="space-y-4 text-sm text-muted-foreground font-caption">
          <p>Verifique sua caixa de entrada e spam.</p>
          <p>O link expira em 24 horas.</p>
        </div>

        <div className="mt-8 space-y-4">
          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={onBackToLogin}
          >
            Voltar ao Login
          </Button>

          <button
            onClick={() => {
              setIsEmailSent(false);
              setEmail('');
            }}
            className="w-full text-sm text-primary hover:text-primary/80 transition-luxury font-caption"
          >
            Enviar para outro email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="KeyRound" size={32} className="text-primary" />
        </div>
        <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground mb-2">
          Esqueceu a senha?
        </h2>
        <p className="text-muted-foreground font-caption">
          Digite seu email e enviaremos instruções para criar uma nova senha
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={18} className="text-error flex-shrink-0" />
            <p className="text-sm text-error">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={handleEmailChange}
          error={error}
          required
        />

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
        >
          Enviar Instruções
        </Button>
      </form>

      <div className="mt-8 text-center">
        <button
          onClick={onBackToLogin}
          className="flex items-center justify-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-luxury font-caption mx-auto"
        >
          <Icon name="ArrowLeft" size={16} />
          <span>Voltar ao login</span>
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;