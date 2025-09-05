/**
 * Hook personalizado para usar o contexto do carrinho
 * Separado para resolver problemas de Fast Refresh
 */

import { useContext } from 'react';
import { CartContext } from './CartContext';
import type { CartContextType } from './CartContext';

// Hook personalizado para usar o contexto do carrinho
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};
