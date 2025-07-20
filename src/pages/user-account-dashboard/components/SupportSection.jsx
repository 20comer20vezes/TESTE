import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SupportSection = ({ supportTickets, onCreateTicket }) => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'order', label: 'Pedidos e Entregas', icon: 'Package' },
    { value: 'product', label: 'Produtos e Qualidade', icon: 'ShoppingBag' },
    { value: 'payment', label: 'Pagamentos e Cobrança', icon: 'CreditCard' },
    { value: 'account', label: 'Conta e Perfil', icon: 'User' },
    { value: 'technical', label: 'Problemas Técnicos', icon: 'Settings' },
    { value: 'other', label: 'Outros Assuntos', icon: 'HelpCircle' }
  ];

  const priorities = [
    { value: 'low', label: 'Baixa', color: 'text-success' },
    { value: 'medium', label: 'Média', color: 'text-warning' },
    { value: 'high', label: 'Alta', color: 'text-error' }
  ];

  const statusColors = {
    'open': 'bg-warning/10 text-warning border-warning/20',
    'in-progress': 'bg-primary/10 text-primary border-primary/20',
    'resolved': 'bg-success/10 text-success border-success/20',
    'closed': 'bg-muted text-muted-foreground border-border'
  };

  const statusLabels = {
    'open': 'Aberto',
    'in-progress': 'Em Andamento',
    'resolved': 'Resolvido',
    'closed': 'Fechado'
  };

  const faqItems = [
    {
      question: "Como posso rastrear meu pedido?",
      answer: "Você pode rastrear seu pedido na seção 'Meus Pedidos' do seu painel de conta. Clique em 'Rastrear' ao lado do pedido desejado ou use o código de rastreamento enviado por email."
    },
    {
      question: "Qual é a política de troca e devolução?",
      answer: "Aceitamos trocas e devoluções em até 30 dias após a entrega, desde que o produto esteja lacrado e em perfeitas condições. Produtos de higiene pessoal não podem ser devolvidos após abertos."
    },
    {
      question: "Como funciona o programa de fidelidade?",
      answer: "A cada R$ 1,00 gasto, você ganha 1 ponto. Acumule pontos para trocar por descontos, produtos gratuitos e benefícios exclusivos. Quanto mais pontos, maior seu nível e melhores os benefícios."
    },
    {
      question: "Vocês entregam em todo o Brasil?",
      answer: "Sim, entregamos em todo o território nacional. O prazo de entrega varia de acordo com sua localização: Sudeste (2-4 dias úteis), outras regiões (5-10 dias úteis)."
    },
    {
      question: "Como posso alterar ou cancelar meu pedido?",
      answer: "Pedidos podem ser alterados ou cancelados em até 2 horas após a confirmação. Entre em contato conosco imediatamente ou use a opção 'Cancelar Pedido' na sua conta."
    }
  ];

  const handleInputChange = (field, value) => {
    setTicketForm(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!ticketForm.subject.trim()) {
      newErrors.subject = 'Assunto é obrigatório';
    }

    if (!ticketForm.category) {
      newErrors.category = 'Categoria é obrigatória';
    }

    if (!ticketForm.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    } else if (ticketForm.message.trim().length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitTicket = () => {
    if (validateForm()) {
      onCreateTicket(ticketForm);
      setTicketForm({
        subject: '',
        category: '',
        priority: 'medium',
        message: ''
      });
      setIsCreatingTicket(false);
      setActiveTab('tickets');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.icon : 'HelpCircle';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-semibold text-2xl text-foreground">
            Central de Ajuda
          </h2>
          <p className="text-muted-foreground">
            Encontre respostas ou entre em contato conosco
          </p>
        </div>
        <Button
          variant="default"
          onClick={() => setIsCreatingTicket(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Novo Chamado
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('faq')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-luxury ${
            activeTab === 'faq' ?'bg-background text-foreground luxury-shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="HelpCircle" size={16} />
            <span>FAQ</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('tickets')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-luxury ${
            activeTab === 'tickets' ?'bg-background text-foreground luxury-shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="MessageSquare" size={16} />
            <span>Meus Chamados</span>
            {supportTickets.filter(t => t.status !== 'closed').length > 0 && (
              <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {supportTickets.filter(t => t.status !== 'closed').length}
              </span>
            )}
          </div>
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-luxury ${
            activeTab === 'contact' ?'bg-background text-foreground luxury-shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Phone" size={16} />
            <span>Contato</span>
          </div>
        </button>
      </div>

      {/* Create Ticket Modal */}
      {isCreatingTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background border border-border rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-semibold text-xl text-foreground">
                Novo Chamado de Suporte
              </h3>
              <button
                onClick={() => setIsCreatingTicket(false)}
                className="p-2 text-muted-foreground hover:text-foreground transition-luxury"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <Input
                label="Assunto"
                type="text"
                value={ticketForm.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                error={errors.subject}
                placeholder="Descreva brevemente o problema"
                required
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Categoria <span className="text-error">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <label key={category.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={ticketForm.category === category.value}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`p-3 border rounded-lg text-center transition-luxury ${
                        ticketForm.category === category.value
                          ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50'
                      }`}>
                        <Icon name={category.icon} size={20} className="mx-auto mb-1" />
                        <span className="text-xs font-medium">{category.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.category && (
                  <p className="mt-1 text-sm text-error">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Prioridade
                </label>
                <select
                  value={ticketForm.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {priorities.map((priority) => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mensagem <span className="text-error">*</span>
                </label>
                <textarea
                  value={ticketForm.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Descreva detalhadamente o problema ou dúvida..."
                  rows={6}
                  className={`w-full px-3 py-2 bg-input border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-luxury resize-none ${
                    errors.message ? 'border-error' : 'border-border'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-error">{errors.message}</p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  Mínimo 10 caracteres
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="default"
                onClick={handleSubmitTicket}
                iconName="Send"
                iconPosition="left"
              >
                Enviar Chamado
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsCreatingTicket(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <div className="space-y-4">
          <div className="mb-6">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
              Perguntas Frequentes
            </h3>
            <p className="text-muted-foreground">
              Encontre respostas rápidas para as dúvidas mais comuns
            </p>
          </div>

          {faqItems.map((item, index) => (
            <details key={index} className="bg-card border border-border rounded-lg">
              <summary className="p-4 cursor-pointer hover:bg-muted/50 transition-luxury">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{item.question}</span>
                  <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
                </div>
              </summary>
              <div className="px-4 pb-4">
                <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      )}

      {/* Tickets Tab */}
      {activeTab === 'tickets' && (
        <div className="space-y-4">
          <div className="mb-6">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
              Meus Chamados
            </h3>
            <p className="text-muted-foreground">
              Acompanhe o status dos seus chamados de suporte
            </p>
          </div>

          {supportTickets.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <Icon name="MessageSquare" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h4 className="font-medium text-foreground mb-2">Nenhum chamado encontrado</h4>
              <p className="text-muted-foreground mb-4">
                Você ainda não abriu nenhum chamado de suporte
              </p>
              <Button
                variant="default"
                onClick={() => setIsCreatingTicket(true)}
                iconName="Plus"
                iconPosition="left"
              >
                Abrir Primeiro Chamado
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon name={getCategoryIcon(ticket.category)} size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{ticket.subject}</h4>
                        <p className="text-sm text-muted-foreground">#{ticket.id} • {formatDate(ticket.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[ticket.status]}`}>
                        {statusLabels[ticket.status]}
                      </span>
                      <span className={`text-xs font-medium ${priorities.find(p => p.value === ticket.priority)?.color}`}>
                        {priorities.find(p => p.value === ticket.priority)?.label}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {ticket.message}
                  </p>
                  {ticket.response && (
                    <div className="bg-muted/50 border border-border rounded-lg p-3 mb-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="MessageCircle" size={16} className="text-primary" />
                        <span className="text-sm font-medium text-foreground">Resposta do Suporte</span>
                        <span className="text-xs text-muted-foreground">{formatDate(ticket.updatedAt)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{ticket.response}</p>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Última atualização: {formatDate(ticket.updatedAt)}
                    </span>
                    <Button variant="ghost" size="sm" iconName="ExternalLink">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === 'contact' && (
        <div className="space-y-6">
          <div className="mb-6">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
              Entre em Contato
            </h3>
            <p className="text-muted-foreground">
              Outras formas de falar conosco
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name="Phone" size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Telefone</h4>
                  <p className="text-sm text-muted-foreground">Segunda a sexta, 8h às 18h</p>
                </div>
              </div>
              <p className="text-lg font-semibold text-foreground mb-2">0800 123 4567</p>
              <p className="text-sm text-muted-foreground">
                Atendimento gratuito para todo o Brasil
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name="Mail" size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Email</h4>
                  <p className="text-sm text-muted-foreground">Resposta em até 24h</p>
                </div>
              </div>
              <p className="text-lg font-semibold text-foreground mb-2">suporte@empresa.com</p>
              <p className="text-sm text-muted-foreground">
                Para dúvidas técnicas e comerciais
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name="MessageCircle" size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">WhatsApp</h4>
                  <p className="text-sm text-muted-foreground">Segunda a sexta, 8h às 17h</p>
                </div>
              </div>
              <p className="text-lg font-semibold text-foreground mb-2">(11) 99999-9999</p>
              <Button variant="outline" size="sm" iconName="ExternalLink">
                Iniciar Conversa
              </Button>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name="MapPin" size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Endereço</h4>
                  <p className="text-sm text-muted-foreground">Matriz</p>
                </div>
              </div>
              <address className="text-sm text-muted-foreground not-italic leading-relaxed">
                Rua das Empresas, 123<br />
                Centro - São Paulo/SP<br />
                CEP: 01234-567
              </address>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportSection;