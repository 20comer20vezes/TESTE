import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomerReviews = ({ product }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [sortBy, setSortBy] = useState('recent');

  const reviews = [
    {
      id: 1,
      author: "Maria Silva",
      rating: 5,
      date: "2025-01-15",
      verified: true,
      title: "Perfume maravilhoso!",
      content: `Comprei este perfume e me apaixonei completamente! A fragrância é sofisticada e duradoura. As notas florais são perfeitas para o dia a dia e ocasiões especiais.\n\nA fixação é excelente, dura o dia todo sem precisar reaplicar. Recomendo muito!`,
      helpful: 12,
      size: "50ml"
    },
    {
      id: 2,
      author: "Ana Costa",
      rating: 4,
      date: "2025-01-10",
      verified: true,
      title: "Muito bom, mas esperava mais fixação",
      content: `O perfume é lindo, as notas são bem balanceadas e o cheiro é incrível. Porém, esperava que durasse um pouco mais na pele.\n\nMesmo assim, vale muito a pena pela qualidade e pelo preço.`,
      helpful: 8,
      size: "30ml"
    },
    {
      id: 3,
      author: "Carla Mendes",
      rating: 5,
      date: "2025-01-08",
      verified: true,
      title: "Perfeito para presente!",
      content: `Comprei para presentear minha irmã e ela adorou! A embalagem é linda e o perfume tem um cheiro único.\n\nA entrega foi rápida e o produto chegou bem embalado. Super recomendo!`,
      helpful: 15,
      size: "100ml"
    },
    {
      id: 4,
      author: "Juliana Santos",
      rating: 4,
      date: "2025-01-05",
      verified: false,
      title: "Boa opção custo-benefício",
      content: "Perfume com boa qualidade pelo preço. As notas são agradáveis e combina bem comigo.",
      helpful: 5,
      size: "50ml"
    }
  ];

  const ratingDistribution = [
    { stars: 5, count: 45, percentage: 65 },
    { stars: 4, count: 18, percentage: 26 },
    { stars: 3, count: 4, percentage: 6 },
    { stars: 2, count: 2, percentage: 3 },
    { stars: 1, count: 0, percentage: 0 }
  ];

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < rating ? 'text-accent fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Avaliações dos Clientes
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-caption text-muted-foreground">Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-border rounded-lg px-3 py-1 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="recent">Mais recentes</option>
            <option value="helpful">Mais úteis</option>
            <option value="rating">Maior avaliação</option>
          </select>
        </div>
      </div>

      {/* Rating Summary */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-heading font-bold text-foreground mb-2">
              {product.rating}
            </div>
            <div className="flex items-center justify-center space-x-1 mb-2">
              {renderStars(product.rating)}
            </div>
            <p className="text-sm text-muted-foreground font-caption">
              Baseado em {product.reviewCount} avaliações
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-12">
                  <span className="text-sm font-caption">{item.stars}</span>
                  <Icon name="Star" size={12} className="text-accent fill-current" />
                </div>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-accent rounded-full h-2 transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-caption text-muted-foreground w-8">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <div key={review.id} className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-medium text-sm">
                    {review.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground">{review.author}</h4>
                    {review.verified && (
                      <div className="flex items-center space-x-1 text-success">
                        <Icon name="ShieldCheck" size={14} />
                        <span className="text-xs font-caption">Compra verificada</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-xs text-muted-foreground font-caption">
                      {formatDate(review.date)}
                    </span>
                    <span className="text-xs text-muted-foreground font-caption">
                      • {review.size}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="font-medium text-foreground mb-2">{review.title}</h5>
              <p className="text-muted-foreground font-caption leading-relaxed whitespace-pre-line">
                {review.content}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-luxury">
                <Icon name="ThumbsUp" size={14} />
                <span className="font-caption">Útil ({review.helpful})</span>
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-luxury font-caption">
                Responder
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {reviews.length > 2 && (
        <div className="text-center">
          <Button
            onClick={() => setShowAllReviews(!showAllReviews)}
            variant="outline"
            iconName={showAllReviews ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAllReviews ? 'Ver menos avaliações' : `Ver todas as ${reviews.length} avaliações`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;