/**
 * Dados mock dos produtos para a aplicação
 * Em um ambiente real, estes dados viriam de uma API
 */

import type { Product, Category, CategoryType } from '../types';

// Lista de produtos disponíveis no cardápio
export const products: Product[] = [
  // Produtos em destaque
  {
    id: '1',
    name: 'Burger Classic',
    description: 'Hambúrguer artesanal com carne bovina, alface, tomate e molho especial',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
    category: 'destaques',
    isHighlight: true,
    isPopular: true,
  },
  {
    id: '2',
    name: 'Bacon Burger',
    description: 'Delicioso hambúrguer com bacon crocante, queijo cheddar e cebola caramelizada',
    price: 28.90,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=200&fit=crop',
    category: 'destaques',
    isHighlight: true,
    isPopular: true,
  },
  {
    id: '3',
    name: 'BBQ Burger',
    description: 'Hambúrguer com molho barbecue, queijo, pickle e batata palha',
    price: 26.90,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop',
    category: 'destaques',
    isHighlight: true,
  },

  // Produtos mais pedidos
  {
    id: '4',
    name: 'Cheese Burger',
    description: 'Hambúrguer tradicional com queijo derretido, alface e tomate',
    price: 22.90,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&h=200&fit=crop',
    category: 'mais-pedidos',
    isPopular: true,
  },
  {
    id: '5',
    name: 'Double Burger',
    description: 'Dois hambúrgueres com queijo duplo e molho especial',
    price: 32.90,
    image: 'https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?w=300&h=200&fit=crop',
    category: 'mais-pedidos',
    isPopular: true,
  },
  {
    id: '6',
    name: 'Crispy Chicken',
    description: 'Hambúrguer de frango empanado com molho ranch e salada',
    price: 25.90,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e9eecaa9?w=300&h=200&fit=crop',
    category: 'mais-pedidos',
    isPopular: true,
  },

  // Linha Burgers
  {
    id: '7',
    name: 'Mega Burger',
    description: 'O maior hambúrguer da casa com 200g de carne, queijo e salada',
    price: 35.90,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=300&h=200&fit=crop',
    category: 'burgers',
  },
  {
    id: '8',
    name: 'Fish Burger',
    description: 'Hambúrguer de salmão grelhado com molho tártaro',
    price: 29.90,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=300&h=200&fit=crop',
    category: 'burgers',
  },
  {
    id: '9',
    name: 'Spicy Burger',
    description: 'Hambúrguer picante com pimenta jalapeño e molho chipotle',
    price: 27.90,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=300&h=200&fit=crop',
    category: 'burgers',
  },

  // Linha Gourmet
  {
    id: '10',
    name: 'Truffle Burger',
    description: 'Hambúrguer gourmet com trufa, queijo brie e rúcula',
    price: 45.90,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=300&h=200&fit=crop',
    category: 'gourmet',
  },
  {
    id: '11',
    name: 'Wagyu Burger',
    description: 'Hambúrguer premium com carne wagyu e molho especial',
    price: 52.90,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    category: 'gourmet',
  },
  {
    id: '12',
    name: 'Lobster Burger',
    description: 'Hambúrguer exclusivo com lagosta e aioli de limão',
    price: 48.90,
    image: 'https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=300&h=200&fit=crop',
    category: 'gourmet',
  },

  // Linha Vegetariana
  {
    id: '13',
    name: 'Veggie Burger',
    description: 'Hambúrguer vegano com proteína de soja e legumes grelhados',
    price: 23.90,
    image: 'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=300&h=200&fit=crop',
    category: 'veggies',
  },
  {
    id: '14',
    name: 'Mushroom Burger',
    description: 'Hambúrguer de cogumelos portobello com queijo vegano',
    price: 26.90,
    image: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=300&h=200&fit=crop',
    category: 'veggies',
  },
  {
    id: '15',
    name: 'Quinoa Burger',
    description: 'Hambúrguer nutritivo de quinoa com abacate e brotos',
    price: 28.90,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop',
    category: 'veggies',
  },
];

// Categorias disponíveis para navegação
export const categories: Category[] = [
  {
    id: 'destaques',
    name: 'Destaques',
  },
  {
    id: 'mais-pedidos',
    name: 'Os mais pedidos',
  },
  {
    id: 'burgers',
    name: 'Burgers',
  },
  {
    id: 'gourmet',
    name: 'Gourmet da casa',
  },
  {
    id: 'veggies',
    name: 'Veggies especiais',
  },
];

/**
 * Função para filtrar produtos por categoria
 * @param category - Categoria para filtrar
 * @returns Array de produtos da categoria especificada
 */
export const getProductsByCategory = (category: CategoryType): Product[] => {
  return products.filter(product => product.category === category);
};

/**
 * Função para buscar produto por ID
 * @param id - ID do produto
 * @returns Produto encontrado ou undefined
 */
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

/**
 * Função para obter produtos em destaque
 * @returns Array de produtos marcados como destaque
 */
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isHighlight);
};

/**
 * Função para obter produtos mais populares
 * @returns Array de produtos mais pedidos
 */
export const getPopularProducts = (): Product[] => {
  return products.filter(product => product.isPopular);
};
