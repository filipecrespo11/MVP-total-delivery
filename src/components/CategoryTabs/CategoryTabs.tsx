/**
 * Componente CategoryTabs
 * Abas de navegação para diferentes categorias de produtos
 */

import React, { useEffect, useState } from 'react';
import type { CategoryTabsProps } from '../../types';
import './CategoryTabs.css';

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Altura do header do perfil do restaurante (aproximadamente 320px)
      const headerHeight = 320;
      const scrollPosition = window.scrollY;
      
      // Mostra as tabs quando passar da altura do header
      setIsVisible(scrollPosition > headerHeight);
    };

    // Adiciona o listener de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Checa a posição inicial
    handleScroll();

    // Remove o listener quando o componente for desmontado
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`category-tabs ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="tabs-container">
        <div className="tabs-scroll">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`tab-button ${
                activeCategory === category.id ? 'active' : ''
              }`}
              onClick={() => onCategoryChange(category.id)}
              type="button"
            >
              <span className="tab-text">{category.name}</span>
              {/* Indicador visual para tab ativa */}
              {activeCategory === category.id && (
                <div className="active-indicator" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
