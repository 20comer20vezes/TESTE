import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Produtos",
      links: [
        { label: "Perfumes Femininos", action: () => navigate('/product-catalog-browse?gender=feminino') },
        { label: "Perfumes Masculinos", action: () => navigate('/product-catalog-browse?gender=masculino') },
        { label: "Perfumes Unissex", action: () => navigate('/product-catalog-browse?gender=unissex') },
        { label: "Lançamentos", action: () => navigate('/product-catalog-browse?filter=novos') },
        { label: "Ofertas", action: () => navigate('/product-catalog-browse?filter=promocao') }
      ]
    },
    {
      title: "Atendimento",
      links: [
        { label: "Central de Ajuda", action: () => navigate('/help') },
        { label: "Fale Conosco", action: () => navigate('/contact') },
        { label: "Trocas e Devoluções", action: () => navigate('/returns') },
        { label: "Rastreamento", action: () => navigate('/tracking') },
        { label: "FAQ", action: () => navigate('/faq') }
      ]
    },
    {
      title: "Empresa",
      links: [
        { label: "Sobre Nós", action: () => navigate('/about') },
        { label: "Trabalhe Conosco", action: () => navigate('/careers') },
        { label: "Imprensa", action: () => navigate('/press') },
        { label: "Sustentabilidade", action: () => navigate('/sustainability') },
        { label: "Blog", action: () => navigate('/blog') }
      ]
    },
    {
      title: "Minha Conta",
      links: [
        { label: "Entrar", action: () => navigate('/login-registration') },
        { label: "Meus Pedidos", action: () => navigate('/user-account-dashboard?tab=orders') },
        { label: "Lista de Desejos", action: () => navigate('/user-account-dashboard?tab=wishlist') },
        { label: "Meus Dados", action: () => navigate('/user-account-dashboard?tab=profile') },
        { label: "Endereços", action: () => navigate('/user-account-dashboard?tab=addresses') }
      ]
    }
  ];

  const paymentMethods = [
    { name: "Visa", icon: "CreditCard" },
    { name: "Mastercard", icon: "CreditCard" },
    { name: "PIX", icon: "Smartphone" },
    { name: "Boleto", icon: "FileText" }
  ];

  const socialLinks = [
    { name: "Instagram", icon: "Instagram", url: "https://instagram.com/luxefragrance" },
    { name: "Facebook", icon: "Facebook", url: "https://facebook.com/luxefragrance" },
    { name: "Pinterest", icon: "Image", url: "https://pinterest.com/luxefragrance" },
    { name: "YouTube", icon: "Play", url: "https://youtube.com/luxefragrance" },
    { name: "TikTok", icon: "Music", url: "https://tiktok.com/@luxefragrance" }
  ];

  const certifications = [
    { name: "SSL Seguro", icon: "Shield" },
    { name: "Loja Confiável", icon: "Award" },
    { name: "Reclame Aqui", icon: "Star" }
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-semibold text-lg">L</span>
              </div>
              <span className="font-heading font-semibold text-xl text-background">
                LuxeFragrance
              </span>
            </div>
            
            <p className="text-background/80 font-caption text-sm mb-6 leading-relaxed">
              Sua loja especializada em fragrâncias premium. Produtos autênticos, 
              entrega rápida e atendimento excepcional desde 2019.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} className="text-primary" />
                <span className="text-background/80 font-caption">(11) 3456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-primary" />
                <span className="text-background/80 font-caption">contato@luxefragrance.com.br</span>
              </div>
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={16} className="text-primary mt-0.5" />
                <span className="text-background/80 font-caption">
                  Rua das Flores, 123<br />
                  Jardins, São Paulo - SP<br />
                  CEP: 01234-567
                </span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-heading font-semibold text-background mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={link.action}
                      className="text-background/80 hover:text-background transition-luxury font-caption text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-heading text-xl font-semibold text-background mb-2">
                Fique por dentro das novidades
              </h3>
              <p className="text-background/80 font-caption text-sm">
                Receba ofertas exclusivas, lançamentos e dicas de beleza
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 px-4 py-3 bg-background/10 border border-background/20 rounded-lg text-background placeholder:text-background/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury"
              />
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-luxury font-medium whitespace-nowrap">
                Inscrever-se
              </button>
            </div>
          </div>
        </div>

        {/* Social Media & Payment Methods */}
        <div className="border-t border-background/20 mt-8 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Social Media */}
            <div>
              <h4 className="font-medium text-background mb-4">Siga-nos</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-full flex items-center justify-center transition-luxury"
                    aria-label={social.name}
                  >
                    <Icon name={social.icon} size={18} className="text-background" />
                  </a>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h4 className="font-medium text-background mb-4">Formas de Pagamento</h4>
              <div className="flex space-x-3">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="w-12 h-8 bg-background/10 rounded flex items-center justify-center"
                    title={method.name}
                  >
                    <Icon name={method.icon} size={16} className="text-background/80" />
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="font-medium text-background mb-4">Certificações</h4>
              <div className="flex space-x-3">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center"
                    title={cert.name}
                  >
                    <Icon name={cert.icon} size={16} className="text-background/80" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-background/20">
        <div className="container mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-background/80 font-caption text-sm text-center md:text-left">
              <p>© {currentYear} LuxeFragrance. Todos os direitos reservados.</p>
              <p className="mt-1">
                CNPJ: 12.345.678/0001-90 | Razão Social: LuxeFragrance Comércio de Cosméticos Ltda.
              </p>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <button
                onClick={() => navigate('/privacy')}
                className="text-background/80 hover:text-background transition-luxury font-caption"
              >
                Privacidade
              </button>
              <button
                onClick={() => navigate('/terms')}
                className="text-background/80 hover:text-background transition-luxury font-caption"
              >
                Termos de Uso
              </button>
              <button
                onClick={() => navigate('/cookies')}
                className="text-background/80 hover:text-background transition-luxury font-caption"
              >
                Cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;