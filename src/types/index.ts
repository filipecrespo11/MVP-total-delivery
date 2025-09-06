/**
 * Tipos TypeScript para a aplicação de delivery
 * Define a estrutura de dados para produtos, pedidos e carrinho
 */

// Interface para representar um produto no cardápio
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: CategoryType;
  isPopular?: boolean; // Marca se o produto está nos "mais pedidos"
  isHighlight?: boolean; // Marca se o produto está nos "destaques"
}

// Interface para itens no carrinho (produto + quantidade)
export interface CartItem {
  product: Product;
  quantity: number;
}

// Interface para informações do cliente
export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  neighborhood?: string;
}

// Interface para opções de entrega por bairro
export interface DeliveryOption {
  neighborhood: string;
  price: number;
  time: string;
}

// Interface para o pedido completo
export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  total: number;
  createdAt: Date;
}

// Tipos de categorias disponíveis
export type CategoryType = 'destaques' | 'mais-pedidos' | 'burgers' | 'gourmet' | 'veggies';

// Interface para as categorias na navegação
export interface Category {
  id: CategoryType;
  name: string;
  isActive?: boolean;
}

// Props para componentes
export interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (customerInfo: CustomerInfo) => void;
}

export interface HeaderProps {
  onOpenCart: () => void;
  cartItemsCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export interface CategoryTabsProps {
  categories: Category[];
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}
