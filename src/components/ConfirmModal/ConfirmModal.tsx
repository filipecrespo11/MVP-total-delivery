/**
 * Componente ConfirmModal
 * Modal de confirmação para adicionar produtos ao carrinho
 */

import React from 'react';
import { X, Plus, ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { formatCurrency } from '../../utils';
import './ConfirmModal.css';

interface ConfirmModalProps {
  product: Product;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  product, 
  isOpen, 
  onConfirm, 
  onCancel 
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <>
      {/* Overlay */}
      <div className="confirm-overlay" onClick={onCancel} />
      
      {/* Modal */}
      <div className="confirm-modal">
        {/* Header */}
        <div className="confirm-header">
          <div className="confirm-title">
            <ShoppingCart size={24} />
            <h3>Adicionar ao Carrinho</h3>
          </div>
          <button className="confirm-close" onClick={onCancel} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="confirm-content">
          <div className="product-preview">
            <div className="product-image-small">
              <img src={product.image} alt={product.name} />
            </div>
            
            <div className="product-details">
              <h4 className="product-name">{product.name}</h4>
              <p className="product-description">{product.description}</p>
              <div className="product-price">{formatCurrency(product.price)}</div>
            </div>
          </div>

          <p className="confirm-question">
            Deseja adicionar este item ao seu carrinho?
          </p>
        </div>

        {/* Botões */}
        <div className="confirm-actions">
          <button className="btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn-confirm" onClick={handleConfirm}>
            <Plus size={18} />
            Sim, adicionar
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
