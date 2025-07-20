import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const SocialProof = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const instagramPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop",
      likes: 1247,
      caption: "Minha nova fragrância favorita! 💕 #LuxeFragrance #PerfumeLovers"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300&h=300&fit=crop",
      likes: 892,
      caption: "Chegou meu pedido! Embalagem perfeita ✨ #UnboxingDay"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=300&h=300&fit=crop",
      likes: 2156,
      caption: "Coleção completa! Cada perfume é uma obra de arte 🎨"
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/1055379/pexels-photo-1055379.jpeg?w=300&h=300&fit=crop",
      likes: 1534,
      caption: "Presente perfeito para minha irmã! Ela amou 💝"
    },
    {
      id: 5,
      image: "https://images.pixabay.com/photo/2020/05/11/22/31/perfume-5160517_1280.jpg?w=300&h=300&fit=crop",
      likes: 967,
      caption: "Fragrância que marca presença! Recebo elogios o dia todo 🌸"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=300&h=300&fit=crop",
      likes: 1823,
      caption: "Minha mesa de maquiagem ficou ainda mais linda! ✨"
    }
  ];

  const influencerReviews = [
    {
      id: 1,
      name: "Camila Beauty",
      handle: "@camilabeauty",
      followers: "125K",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
      review: "Gente, que perfume maravilhoso! A fixação é incrível e o cheiro é divino. Já virou meu favorito! 💕",
      product: "Chanel No. 5",
      verified: true
    },
    {
      id: 2,
      name: "Júlia Fragrance",
      handle: "@juliafragrance",
      followers: "89K",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      review: "A LuxeFragrance sempre entrega produtos autênticos e de qualidade. Recomendo demais!",
      product: "Tom Ford Black Orchid",
      verified: true
    }
  ];

  const socialStats = [
    {
      platform: "Instagram",
      followers: "45.2K",
      icon: "Instagram",
      color: "text-pink-500"
    },
    {
      platform: "Pinterest",
      followers: "28.7K",
      icon: "Image",
      color: "text-red-500"
    },
    {
      platform: "YouTube",
      followers: "12.3K",
      icon: "Play",
      color: "text-red-600"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % instagramPosts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [instagramPosts.length]);

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            Siga-nos nas Redes Sociais
          </h2>
          <p className="text-muted-foreground font-caption max-w-2xl mx-auto mb-8">
            Junte-se à nossa comunidade de amantes de fragrâncias e compartilhe sua paixão por perfumes
          </p>
          
          {/* Social Stats */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            {socialStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 ${stat.color} bg-current/10 rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <Icon name={stat.icon} size={24} className={stat.color} />
                </div>
                <div className="font-semibold text-foreground">{stat.followers}</div>
                <div className="text-xs text-muted-foreground font-caption">{stat.platform}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Instagram Feed */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <Icon name="Instagram" size={24} className="text-pink-500 mr-2" />
            <h3 className="font-heading text-xl font-semibold text-foreground">
              @luxefragrance
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramPosts.map((post, index) => (
              <div
                key={post.id}
                className={`group relative aspect-square overflow-hidden rounded-lg cursor-pointer transition-luxury ${
                  index === currentImageIndex ? 'ring-2 ring-primary' : ''
                }`}
              >
                <Image
                  src={post.image}
                  alt="Instagram post"
                  className="w-full h-full object-cover group-hover:scale-105 transition-luxury"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-luxury flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-luxury text-white text-center">
                    <Icon name="Heart" size={24} className="mx-auto mb-2" />
                    <span className="text-sm font-medium">{post.likes.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="https://instagram.com/luxefragrance"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-luxury font-medium"
            >
              <Icon name="ExternalLink" size={16} />
              <span>Ver mais no Instagram</span>
            </a>
          </div>
        </div>

        {/* Influencer Reviews */}
        <div className="mb-16">
          <h3 className="font-heading text-2xl font-semibold text-foreground text-center mb-8">
            O que as influencers estão dizendo
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {influencerReviews.map((review) => (
              <div key={review.id} className="bg-card rounded-lg p-6 luxury-shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                    {review.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                        <Icon name="Check" size={12} />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground">{review.name}</h4>
                      <span className="text-sm text-muted-foreground font-caption">{review.handle}</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-caption mb-3">
                      {review.followers} seguidores
                    </p>
                    <p className="text-sm text-foreground mb-2">
                      "{review.review}"
                    </p>
                    <p className="text-xs text-primary font-medium">
                      Produto: {review.product}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Generated Content CTA */}
        <div className="bg-card rounded-2xl p-8 lg:p-12 text-center luxury-shadow-md">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Camera" size={32} />
            </div>
            
            <h3 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              Compartilhe sua LuxeFragrance
            </h3>
            
            <p className="text-muted-foreground font-caption mb-8">
              Marque @luxefragrance e use #MinhaLuxeFragrance nas suas fotos para aparecer no nosso feed! 
              As melhores fotos ganham desconto especial na próxima compra.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://instagram.com/luxefragrance"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-luxury font-medium"
              >
                <Icon name="Instagram" size={20} />
                <span>Seguir no Instagram</span>
              </a>
              
              <a
                href="https://pinterest.com/luxefragrance"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-luxury font-medium"
              >
                <Icon name="Image" size={20} />
                <span>Ver no Pinterest</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;