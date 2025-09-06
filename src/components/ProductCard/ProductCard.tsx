/**
 * Componente ProductCard
 * Card individual para exibir produtos - clique para abrir modal
 */

import React from 'react';
import type { Product } from '../../types';
import { formatCurrency } from '../../utils';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {

  return (
    <div className="product-card" onClick={onClick}>
      {/* Container da imagem */}
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
          onError={(e) => {
            // Fallback com SVG inline
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iI0Q0QTU3NCIvPgo8cmVjdCB4PSI3MCIgeT0iMTEwIiB3aWR0aD0iNjAiIGhlaWdodD0iMjAiIHJ4PSIxMCIgZmlsbD0iIzhCNDUxMyIvPgo8dGV4dCB4PSIxMDAiIHk9IjE2MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNkI3MjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Qcm9kdXRvPC90ZXh0Pgo8L3N2Zz4K';
          }}
        />
        
        {/* Badges para produtos especiais */}
        <div className="product-badges">
          {product.isHighlight && (
            <span className="badge highlight">Destaque</span>
          )}
          {product.isPopular && (
            <span className="badge popular">Popular</span>
          )}
        </div>
      </div>

      {/* Informações do produto */}
      <div className="product-info">
        <div className="product-header">
          <h3 className="product-name">{product.name}</h3>
          <span className="product-price">{formatCurrency(product.price)}</span>
        </div>

        {product.description && (
          <p className="product-description">{product.description}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
