/**
 * Componente ProductCard
 * Card individual para exibir produtos com imagem, informações e botão de adicionar
 */

import React from 'react';
import { Plus } from 'lucide-react';
import type { ProductCardProps } from '../../types';
import { formatCurrency } from '../../utils';
import './ProductCard.css';

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div className="product-card">
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

        {/* Botão de adicionar ao carrinho sobreposto */}
        <button
          className="add-to-cart-overlay"
          onClick={handleAddToCart}
          aria-label={`Adicionar ${product.name} ao carrinho`}
        >
          <Plus size={20} />
        </button>
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

        {/* Botão principal de adicionar (mobile) */}
        <button
          className="add-to-cart-button"
          onClick={handleAddToCart}
          aria-label={`Adicionar ${product.name} ao carrinho por ${formatCurrency(product.price)}`}
        >
          <Plus size={18} />
          <span>Adicionar</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
