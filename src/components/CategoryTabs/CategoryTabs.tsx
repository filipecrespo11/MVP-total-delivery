/**
 * Componente CategoryTabs
 * Abas de navegação para diferentes categorias de produtos
 */

import React from 'react';
import type { CategoryTabsProps } from '../../types';
import './CategoryTabs.css';

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="category-tabs">
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
