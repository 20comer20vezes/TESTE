import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProductImageGallery = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const images = [
    product.image,
    "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=800&fit=crop"
  ];

  const handlePrevImage = () => {
    setSelectedImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
  };

  const handleNextImage = () => {
    setSelectedImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-card rounded-lg overflow-hidden luxury-shadow-md">
        <Image
          src={images[selectedImageIndex]}
          alt={`${product.name} - Imagem ${selectedImageIndex + 1}`}
          className={`w-full h-full object-cover transition-luxury cursor-zoom-in ${
            isZoomed ? 'scale-150 cursor-zoom-out' : ''
          }`}
          onClick={toggleZoom}
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={handlePrevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-background transition-luxury luxury-shadow-sm"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
        
        <button
          onClick={handleNextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-background transition-luxury luxury-shadow-sm"
        >
          <Icon name="ChevronRight" size={20} />
        </button>

        {/* Zoom Indicator */}
        {isZoomed && (
          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-caption">
            Clique para diminuir
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-luxury ${
              selectedImageIndex === index
                ? 'border-primary' :'border-border hover:border-muted-foreground'
            }`}
          >
            <Image
              src={image}
              alt={`${product.name} - Miniatura ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;