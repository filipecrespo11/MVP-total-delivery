/**
 * Componente Header - Layout estilo perfil de restaurante
 * Estrutura: seção azul superior + seção preta inferior + logo circular central
 */

import React, { useState } from 'react';
import { Menu, Search, ShoppingCart } from 'lucide-react';
import type { HeaderProps } from '../../types';
import './Header.css';

const Header: React.FC<HeaderProps> = ({ 
  cartItemsCount, 
  onOpenCart
}) => {
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Dados de entrega por bairro
  const deliveryOptions = [
    { neighborhood: 'Centro', price: '5,99', time: '30-40min' },
    { neighborhood: 'Jardins', price: '7,99', time: '35-45min' },
    { neighborhood: 'Vila Madalena', price: '8,99', time: '40-50min' },
    { neighborhood: 'Pinheiros', price: '6,99', time: '25-35min' },
    { neighborhood: 'Liberdade', price: '5,99', time: '30-40min' },
    { neighborhood: 'Bela Vista', price: '6,99', time: '25-35min' }
  ];

  // Horários de funcionamento
  const schedule = [
    { day: 'Segunda-feira', hours: '18:00 - 23:30' },
    { day: 'Terça-feira', hours: '18:00 - 23:30' },
    { day: 'Quarta-feira', hours: '18:00 - 23:30' },
    { day: 'Quinta-feira', hours: '18:00 - 23:30' },
    { day: 'Sexta-feira', hours: '18:00 - 00:30' },
    { day: 'Sábado', hours: '18:00 - 00:30' },
    { day: 'Domingo', hours: '18:00 - 23:00' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <header className="header">
        {/* Seção superior azul */}
        <div className="header-blue-section"></div>
        
        {/* Seção inferior preta */}
        <div className="header-black-section"></div>

        {/* Botão do menu no lado esquerdo */}
        <div className="header-menu-left">
          <button 
            className="header-button"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Controles no lado direito */}
        <div className="header-controls-right">
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

        {/* Perfil completo do restaurante - tudo em uma div */}
        <div className="restaurant-profile">
          {/* Logo do restaurante - centralizado */}
          <div className="restaurant-logo">
            <img 
              src="/logo.jpeg" 
              alt="Logo do restaurante" 
              className="logo-image"
            />
           
          </div>

          {/* Informações do restaurante */}
          <div className="restaurant-info">
            <div className="restaurant-main-info">
              <h1 className="restaurant-name">Calixto's Burger</h1>
              
              <div className="restaurant-rating">
                <span>⭐ 4.5</span>
                <span>(200+ avaliações)</span>
                <span>•</span>
                <span>1.6km</span>
              </div>
              
              <div className="restaurant-details">
                <div className="detail-item">
                  <span className="detail-icon">🕐</span>
                  <span>60-60m</span>
                </div>
                <div 
                  className="detail-item delivery-item"
                  onMouseEnter={() => setShowDeliveryOptions(true)}
                  onMouseLeave={() => setShowDeliveryOptions(false)}
                  onClick={() => setShowDeliveryOptions(!showDeliveryOptions)}
                >
                  <span className="detail-icon">💰</span>
                  <span>A partir de 5,99</span>
                  {showDeliveryOptions && (
                    <div className="delivery-tooltip">
                      <h4>Valores de entrega por bairro:</h4>
                      {deliveryOptions.map((option, index) => (
                        <div key={index} className="delivery-option">
                          <span className="neighborhood">{option.neighborhood}</span>
                          <div className="delivery-info">
                            <span className="price">R$ {option.price}</span>
                            <span className="time">{option.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div 
                  className="detail-item schedule-item"
                  onMouseEnter={() => setShowSchedule(true)}
                  onMouseLeave={() => setShowSchedule(false)}
                  onClick={() => setShowSchedule(!showSchedule)}
                >
                  <span className="detail-icon">⏰</span>
                  <span>Ver horários</span>
                  {showSchedule && (
                    <div className="schedule-tooltip">
                      <h4>Horários de funcionamento:</h4>
                      {schedule.map((item, index) => (
                        <div key={index} className="schedule-day">
                          <span className="day">{item.day}</span>
                          <span className="hours">{item.hours}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
              <button onClick={() => scrollToCategory('destaques')}>🌟 Destaques</button>
              <button onClick={() => scrollToCategory('mais-pedidos')}>🔥 Mais Pedidos</button>
              <button onClick={() => scrollToCategory('burgers')}>🍔 Burgers</button>
              <button onClick={() => scrollToCategory('gourmet')}>👑 Gourmet</button>
              <button onClick={() => scrollToCategory('veggies')}>🥗 Veggies</button>
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
              autoFocus
            />
            <button onClick={toggleSearch}>✕</button>
          </div>
        </div>
      )}
    </>
  );

  function scrollToCategory(categoryId: string) {
    const element = document.querySelector(`[data-category="${categoryId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  }
};

export default Header;