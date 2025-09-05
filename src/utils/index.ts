/**
 * Utilitários da aplicação
 * Funções auxiliares para formatação, validação e integração com WhatsApp
 */

import type { CartItem, CustomerInfo } from '../types';

/**
 * Formata um valor monetário para o formato brasileiro
 * @param value - Valor a ser formatado
 * @returns Valor formatado como string (ex: "R$ 24,90")
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Formatar número de telefone brasileiro
 * @param phone - Número de telefone
 * @returns Telefone formatado
 */
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  
  return phone;
};

/**
 * Validar número de telefone brasileiro
 * @param phone - Número de telefone
 * @returns true se válido, false caso contrário
 */
export const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 11;
};

/**
 * Validar email
 * @param email - Endereço de email
 * @returns true se válido, false caso contrário
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Gera mensagem formatada para WhatsApp com o pedido
 * @param items - Itens do carrinho
 * @param customerInfo - Informações do cliente
 * @param total - Total do pedido
 * @returns Mensagem formatada para o WhatsApp
 */
export const generateWhatsAppMessage = (
  items: CartItem[],
  customerInfo: CustomerInfo,
  total: number
): string => {
  let message = `🍔 *NOVO PEDIDO - Calixto's Burger*\n\n`;
  
  // Informações do cliente
  message += `👤 *Cliente:* ${customerInfo.name}\n`;
  message += `📞 *Telefone:* ${customerInfo.phone}\n`;
  message += `📍 *Endereço:* ${customerInfo.address}\n\n`;
  
  // Itens do pedido
  message += `🛍️ *Itens do Pedido:*\n`;
  message += `${'-'.repeat(30)}\n`;
  
  items.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    message += `${index + 1}. *${item.product.name}*\n`;
    message += `   Qtd: ${item.quantity}x | ${formatCurrency(item.product.price)} = ${formatCurrency(itemTotal)}\n`;
    if (item.product.description) {
      message += `   _${item.product.description}_\n`;
    }
    message += `\n`;
  });
  
  // Total do pedido
  message += `${'-'.repeat(30)}\n`;
  message += `💰 *TOTAL: ${formatCurrency(total)}*\n\n`;
  
  // Informações adicionais
  message += `⏰ *Data/Hora:* ${new Date().toLocaleString('pt-BR')}\n`;
  message += `\n📱 Pedido enviado automaticamente pelo sistema de delivery.`;
  
  return encodeURIComponent(message);
};

/**
 * Abre o WhatsApp com a mensagem do pedido
 * @param items - Itens do carrinho
 * @param customerInfo - Informações do cliente
 * @param total - Total do pedido
 * @param restaurantPhone - Número do WhatsApp do restaurante
 */
export const sendOrderToWhatsApp = (
  items: CartItem[],
  customerInfo: CustomerInfo,
  total: number,
  restaurantPhone: string = '5511999999999' // Substitua pelo número real do restaurante
): void => {
  const message = generateWhatsAppMessage(items, customerInfo, total);
  const whatsappUrl = `https://wa.me/${restaurantPhone}?text=${message}`;
  
  // Abre o WhatsApp em uma nova aba/janela
  window.open(whatsappUrl, '_blank');
};

/**
 * Gera um ID único simples
 * @returns String com ID único
 */
export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Função para scroll suave até um elemento
 * @param elementId - ID do elemento para rolar
 */
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

/**
 * Debounce function para otimizar performance em buscas
 * @param func - Função a ser executada
 * @param wait - Tempo de espera em ms
 * @returns Função com debounce aplicado
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Função para limpar/mascarar número de telefone
 * @param phone - Número de telefone
 * @returns Número limpo apenas com dígitos
 */
export const cleanPhoneNumber = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

/**
 * Constantes da aplicação
 */
export const APP_CONFIG = {
  RESTAURANT_NAME: "Calixto's Burger",
  RESTAURANT_PHONE: '5511999999999', // Substitua pelo número real
  DELIVERY_TIME: '60-80 min',
  DELIVERY_FEE: 5.99,
  MIN_ORDER_VALUE: 15.00,
  MAX_DESCRIPTION_LENGTH: 100,
  MAX_NAME_LENGTH: 50,
  MAX_ADDRESS_LENGTH: 200,
} as const;
