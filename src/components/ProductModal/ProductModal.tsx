/**
 * Componente ProductModal
 * Modal para exibir detalhes do produto e adicionar ao carrinho
 */

import React, { useState } from 'react';
import { Plus, Minus, X } from 'lucide-react';
import type { Product } from '../../types';
import { formatCurrency } from '../../utils';
import './ProductModal.css';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
    setQuantity(1); // Reset quantity
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        {/* Botão de fechar */}
        <button className="modal-close-button" onClick={onClose}>
          <X size={24} />
        </button>

        {/* Imagem do produto */}
        <div className="modal-image-container">
          <img
            src={product.image}
            alt={product.name}
            className="modal-product-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/src/assets/product-modal-placeholder.svg';
            }}
          />
          
          {/* Badges */}
          <div className="modal-product-badges">
            {product.isHighlight && (
              <span className="badge highlight">Destaque</span>
            )}
            {product.isPopular && (
              <span className="badge popular">Popular</span>
            )}
          </div>
        </div>

        {/* Informações do produto */}
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-product-name">{product.name}</h2>
            <span className="modal-product-price">{formatCurrency(product.price)}</span>
          </div>

          {product.description && (
            <p className="modal-product-description">{product.description}</p>
          )}

          {/* Controles de quantidade */}
          <div className="quantity-controls">
            <span className="quantity-label">Quantidade</span>
            <div className="quantity-selector">
              <button
                className="quantity-button"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus size={18} />
              </button>
              <span className="quantity-display">{quantity}</span>
              <button
                className="quantity-button"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Botão de adicionar ao carrinho */}
          <button className="modal-add-to-cart" onClick={handleAddToCart}>
            <Plus size={20} />
            <span>Adicionar ao carrinho</span>
            <span className="total-price">{formatCurrency(totalPrice)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
