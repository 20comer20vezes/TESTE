import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ items = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Default breadcrumb generation based on current path
  const generateDefaultBreadcrumbs = () => {
    // Add optional chaining and fallback for undefined location
    const pathname = location?.pathname || '/';
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Início', path: '/home-landing-page' }];

    const pathMap = {
      'product-catalog-browse': 'Produtos',
      'product-detail-page': 'Detalhes do Produto',
      'shopping-cart-checkout': 'Carrinho',
      'user-account-dashboard': 'Minha Conta',
      'login-registration': 'Entrar'
    };

    pathSegments.forEach((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/');
      const label = pathMap[segment] || segment.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      if (segment !== 'home-landing-page') {
        breadcrumbs.push({ label, path });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items.length > 0 ? items : generateDefaultBreadcrumbs();

  const handleNavigation = (path, index) => {
    // Don't navigate if it's the last item (current page)
    // Add optional chaining for navigate function
    if (index < breadcrumbItems.length - 1 && navigate) {
      navigate(path);
    }
  };

  // Early return if no location context is available
  if (!location) {
    return null;
  }

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="mx-2 text-muted-foreground/60" 
              />
            )}
            {index < breadcrumbItems.length - 1 ? (
              <button
                onClick={() => handleNavigation(item?.path, index)}
                className="hover:text-foreground transition-luxury font-caption"
                aria-current={index === breadcrumbItems.length - 1 ? 'page' : undefined}
              >
                {item?.label}
              </button>
            ) : (
              <span 
                className="text-foreground font-caption font-medium"
                aria-current="page"
              >
                {item?.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;