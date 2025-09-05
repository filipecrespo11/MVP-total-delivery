/**
 * Componente Header - Layout estilo perfil de restaurante
 * Estrutura: seção azul superior + seção preta inferior + logo circular central
 */

import React, { useState } from 'react';
import { Menu, Search, ShoppingCart } from 'lucide-react';
import type { HeaderProps } from '../../types';
import './Header.css';

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onOpenCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
    }
  };

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        {/* Seção superior azul */}
        <div className="header-blue-section"></div>
        
        {/* Seção inferior preta */}
        <div className="header-black-section"></div>

        {/* Controles no canto superior direito */}
        <div className="header-controls">
          <button 
            className="header-button"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>
          
          <button 
            className="header-button"
            onClick={toggleSearch}
            aria-label="Pesquisar"
          >
            <Search size={20} />
          </button>
          
          <button 
            className="header-button cart-button"
            onClick={onOpenCart}
            aria-label="Carrinho"
          >
            <ShoppingCart size={20} />
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </button>
        </div>

        {/* Perfil do restaurante centralizado */}
        <div className="restaurant-profile">
          <div className="restaurant-logo">
            <div className="gourmet-text">GOURMET</div>
            <div className="burger-icon">🍔</div>
            <div className="restaurant-name">
              Calixto's<br />
              BURGUER
            </div>
          </div>
          
          <div className="restaurant-info">
            <h1>Calixto's Burguer</h1>
            <div className="restaurant-rating">
              <div className="rating-stars">
                <span className="star">⭐</span>
                <span>4.7</span>
              </div>
              <span>(200+ avaliações)</span>
              <span>•</span>
              <span>1.6km</span>
            </div>
            
            <div className="restaurant-details">
              <div className="detail-item">
                <span className="detail-icon">🕐</span>
                <span>60-60m</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">💰</span>
                <span>5,99</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">⏰</span>
                <span>Ver horários</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Menu lateral */}
      {isMenuOpen && (
        <>
          <div className="menu-overlay" onClick={toggleMenu}></div>
          <div className="menu-sidebar">
            <div className="menu-header">
              <h3>Menu</h3>
              <button className="close-menu" onClick={toggleMenu}>✕</button>
            </div>
            <nav className="menu-nav">
              <button onClick={() => scrollToCategory('pizzas')}>🍕 Pizzas</button>
              <button onClick={() => scrollToCategory('hamburguers')}>🍔 Hambúrguers</button>
              <button onClick={() => scrollToCategory('bebidas')}>🥤 Bebidas</button>
              <button onClick={() => scrollToCategory('sobremesas')}>🍰 Sobremesas</button>
            </nav>
          </div>
        </>
      )}

      {/* Barra de pesquisa expandida */}
      {isSearchOpen && (
        <div className="search-expanded">
          <div className="search-container">
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button onClick={toggleSearch}>✕</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
