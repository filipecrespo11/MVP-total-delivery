/**
 * Componente Cart
 * Modal do carrinho de compras com itens, total e formulário de checkout
 */

import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, User, Phone, MapPin } from 'lucide-react';
import type { CartProps, CustomerInfo } from '../../types';
import { useCart } from '../../context';
import { formatCurrency, sendOrderToWhatsApp, isValidPhone, APP_CONFIG, DELIVERY_OPTIONS, getDeliveryFeeByNeighborhood } from '../../utils';
import './Cart.css';

const Cart: React.FC<CartProps> = ({ isOpen, onClose, onCheckout }) => {
  const { state, removeItem, updateQuantity } = useCart();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    neighborhood: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  // Validação dos dados do cliente
  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {};

    if (!customerInfo.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (customerInfo.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!isValidPhone(customerInfo.phone)) {
      newErrors.phone = 'Telefone inválido';
    }

    if (!customerInfo.address.trim()) {
      newErrors.address = 'Endereço é obrigatório';
    } else if (customerInfo.address.trim().length < 10) {
      newErrors.address = 'Endereço deve ser mais completo';
    }

    if (!customerInfo.neighborhood?.trim()) {
      newErrors.neighborhood = 'Selecione um bairro';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manipula o envio do pedido
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (state.items.length === 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simula um pequeno delay para feedback visual
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Envia o pedido para o WhatsApp
      sendOrderToWhatsApp(state.items, customerInfo, state.total);
      
      // Notifica o componente pai
      onCheckout(customerInfo);
      
      // Limpa o formulário
      setCustomerInfo({ name: '', phone: '', address: '', neighborhood: '' });
      
      // Fecha o carrinho
      onClose();
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Atualiza os dados do cliente
  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value,
    }));

    // Remove o erro do campo quando o usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  // Se o carrinho não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  const deliveryFee = state.total > 0 ? getDeliveryFeeByNeighborhood(customerInfo.neighborhood) : 0;
  const totalWithDelivery = state.total + deliveryFee;

  return (
    <>
      {/* Overlay */}
      <div className="cart-overlay" onClick={onClose} />
      
      {/* Modal do carrinho */}
      <div className="cart-modal">
        {/* Header do carrinho */}
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingBag size={24} />
            <h2>Seu Pedido</h2>
            <span className="cart-count">({state.items.length} {state.items.length === 1 ? 'item' : 'itens'})</span>
          </div>
          <button className="close-button" onClick={onClose} aria-label="Fechar carrinho">
            <X size={24} />
          </button>
        </div>

        <div className="cart-content">
          {/* Lista de itens */}
          {state.items.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} />
              <h3>Carrinho vazio</h3>
              <p>Adicione alguns itens deliciosos ao seu pedido!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {state.items.map((item) => (
                  <div key={item.product.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.product.image} alt={item.product.name} />
                    </div>
                    
                    <div className="item-info">
                      <h4 className="item-name">{item.product.name}</h4>
                      <p className="item-price">{formatCurrency(item.product.price)}</p>
                    </div>

                    <div className="item-controls">
                      <button
                        className="quantity-button"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Diminuir quantidade"
                      >
                        <Minus size={16} />
                      </button>
                      
                      <span className="item-quantity">{item.quantity}</span>
                      
                      <button
                        className="quantity-button"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        aria-label="Aumentar quantidade"
                      >
                        <Plus size={16} />
                      </button>

                      <button
                        className="remove-button"
                        onClick={() => removeItem(item.product.id)}
                        aria-label="Remover item"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumo do pedido */}
              <div className="order-summary">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>{formatCurrency(state.total)}</span>
                </div>
                <div className="summary-line">
                  <span>Taxa de entrega</span>
                  <span>{formatCurrency(deliveryFee)}</span>
                </div>
                <div className="summary-line total">
                  <span>Total</span>
                  <span>{formatCurrency(totalWithDelivery)}</span>
                </div>
              </div>

              {/* Formulário de checkout */}
              <form className="checkout-form" onSubmit={handleCheckout}>
                <h3 className="form-title">Dados para entrega</h3>
                
                <div className="form-group">
                  <label htmlFor="name">
                    <User size={18} />
                    Nome completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Digite seu nome completo"
                    maxLength={APP_CONFIG.MAX_NAME_LENGTH}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <Phone size={18} />
                    Telefone/WhatsApp
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(11) 99999-9999"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="neighborhood">
                    <MapPin size={18} />
                    Bairro para entrega
                  </label>
                  <select
                    id="neighborhood"
                    value={customerInfo.neighborhood || ''}
                    onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                    className={errors.neighborhood ? 'error' : ''}
                  >
                    <option value="">Selecione seu bairro</option>
                    {DELIVERY_OPTIONS.map((option) => (
                      <option key={option.neighborhood} value={option.neighborhood}>
                        {option.neighborhood} - R$ {option.price.toFixed(2).replace('.', ',')} ({option.time})
                      </option>
                    ))}
                  </select>
                  {errors.neighborhood && <span className="error-message">{errors.neighborhood}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="address">
                    <MapPin size={18} />
                    Endereço completo
                  </label>
                  <textarea
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Rua, número, complemento, bairro, cidade"
                    rows={3}
                    maxLength={APP_CONFIG.MAX_ADDRESS_LENGTH}
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

                <button
                  type="submit"
                  className="checkout-button"
                  disabled={isSubmitting || state.items.length === 0}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner" />
                      Finalizando...
                    </>
                  ) : (
                    <>
                      Finalizar no WhatsApp
                      <span className="button-price">{formatCurrency(totalWithDelivery)}</span>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
