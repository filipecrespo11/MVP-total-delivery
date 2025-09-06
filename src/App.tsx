/**
 * Componente principal da aplicação de delivery
 * Gerencia o estado global e renderiza os componentes principais
 */

import React, { useState } from 'react';
import { Header, CategoryTabs, ProductCard, Cart, ConfirmModal } from './components';
import { CartProvider, useCart } from './context';
import { categories, getProductsByCategory } from './data/products';
import type { CategoryType, CustomerInfo, Product } from './types';
import './App.css';

// Componente interno que usa o contexto do carrinho
const AppContent: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('destaques');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmProduct, setConfirmProduct] = useState<Product | null>(null);
  const { addItem, getItemsCount, clearCart } = useCart();

  // Obtém os produtos da categoria ativa
  const products = getProductsByCategory(activeCategory);
  
  // Filtra produtos baseado na pesquisa
  const filteredProducts = searchQuery.trim() 
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  // Manipula a adição de produtos ao carrinho
  const handleAddToCart = (product: Product) => {
    setConfirmProduct(product);
  };

  // Confirma a adição ao carrinho
  const handleConfirmAddToCart = () => {
    if (confirmProduct) {
      addItem(confirmProduct);
      setConfirmProduct(null);
      // Feedback visual opcional
      console.log(`${confirmProduct.name} adicionado ao carrinho!`);
    }
  };

  // Cancela a adição ao carrinho
  const handleCancelAddToCart = () => {
    setConfirmProduct(null);
  };

  // Manipula a mudança de categoria
  const handleCategoryChange = (category: CategoryType) => {
    setActiveCategory(category);
  };
  
  // Manipula a pesquisa
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Manipula o checkout (finalização do pedido)
  const handleCheckout = (customerInfo: CustomerInfo) => {
    console.log('Pedido finalizado:', customerInfo);
    // Aqui você pode adicionar lógica adicional após o checkout
    // como mostrar uma mensagem de sucesso, limpar o carrinho, etc.
    clearCart();
  };

  return (
    <div className="app">
      {/* Cabeçalho com informações do restaurante e carrinho */}
      <Header 
        onOpenCart={() => setIsCartOpen(true)} 
        cartItemsCount={getItemsCount()}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* Navegação por categorias */}
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Conteúdo principal */}
      <main className="main-content">
        {/* Título da seção atual */}
        <div className="section-header">
          <h2 className="section-title">
            {categories.find(cat => cat.id === activeCategory)?.name}
          </h2>
          <p className="section-description">
            Escolha seus pratos favoritos e monte seu pedido perfeito
          </p>
        </div>

        {/* Grid de produtos */}
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <div className="no-products">
              <p>
                {searchQuery.trim() 
                  ? `Nenhum produto encontrado para "${searchQuery}"`
                  : 'Nenhum produto encontrado nesta categoria.'
                }
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Modal do carrinho */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      {/* Modal de confirmação */}
      {confirmProduct && (
        <ConfirmModal
          product={confirmProduct}
          isOpen={!!confirmProduct}
          onConfirm={handleConfirmAddToCart}
          onCancel={handleCancelAddToCart}
        />
      )}
    </div>
  );
};

// Componente principal que envolve tudo com o Provider
const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;
