import React from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ selectedCategory, onCategoryChange, categories }) => {
  const defaultCategories = [
    'All',
    'National Affairs',
    'International Relations',
    'Economy & Business',
    'Science & Technology',
    'Environment & Ecology',
    'Polity & Governance',
    'Defence & Security',
    'Sports',
    'Awards & Honors'
  ];

  const cats = categories || defaultCategories;

  return (
    <div className="category-filter">
      <div className="filter-label">Filter by Category:</div>
      <div className="category-buttons">
        {cats.map((category) => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category === 'All' ? '' : category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;