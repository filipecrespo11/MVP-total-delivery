/**
 * Context do Carrinho - Define o contexto para gerenciar estado do carrinho
 * Apenas o contexto, sem Provider (que está em arquivo separado para Fast Refresh)
 */

import { createContext } from 'react';
import type { CartItem, Product } from '../types';

// Interface para o estado do carrinho
interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
}

// Interface para o contexto do carrinho
export interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  getItemsCount: () => number;
}

// Criação do contexto
export const CartContext = createContext<CartContextType | undefined>(undefined);
