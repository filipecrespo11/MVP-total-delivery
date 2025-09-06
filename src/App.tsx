/**
 * Componente principal da aplicação de delivery
 * Layout em formato landing page
 */

import React, { useState } from 'react';
import { Header, ProductCard, Cart } from './components';
import ProductModal from './components/ProductModal/ProductModal';
import { CartProvider, useCart } from './context';
import { categories, getProductsByCategory } from './data/products';
import type { CustomerInfo, Product } from './types';
import './App.css';

// Componente interno que usa o contexto do carrinho
const AppContent: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addItem, getItemsCount, clearCart } = useCart();

  // Agrupa produtos por categoria para exibir em seções
  const productsByCategory = categories.map(category => ({
    category,
    products: getProductsByCategory(category.id)
  })).filter(section => section.products.length > 0);

  // Manipula o clique no produto para abrir a modal
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  // Confirma a adição ao carrinho da modal
  const handleAddToCart = (product: Product, quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    console.log(`${quantity}x ${product.name} adicionado ao carrinho!`);
  };

  // Fecha a modal de produto
  const handleCloseProductModal = () => {
    setSelectedProduct(null);
  };

  // Manipula a pesquisa - não mais necessário
  // const handleSearchChange = (query: string) => {
  //   setSearchQuery(query);
  // };

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
      />

      {/* Conteúdo principal em formato landing page */}
      <main className="main-content landing-page">
        {/* Seções por categoria */}
        {productsByCategory.map(({ category, products }) => (
          <section key={category.id} className="category-section" data-category={category.id}>
            <div className="section-header">
              <h2 className="section-title">{category.name}</h2>
              <p className="section-description">
                Escolha seus pratos favoritos desta categoria
              </p>
            </div>

            {/* Grid de produtos */}
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          </section>
        ))}

        {/* Mensagem quando não há produtos */}
        {productsByCategory.length === 0 && (
          <div className="no-products">
            <p>Nenhum produto disponível no momento.</p>
          </div>
        )}
      </main>

      {/* Modal do carrinho */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      {/* Modal de produto */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={handleCloseProductModal}
          onAddToCart={handleAddToCart}
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
