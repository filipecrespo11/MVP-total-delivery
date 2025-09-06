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
            // Fallback para caso a imagem não carregue
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x200/E5E7EB/6B7280?text=Produto';
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
