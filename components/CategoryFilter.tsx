import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  activeCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex items-center gap-2 min-w-max">
        {categories.map((category) => {
          const isActive = activeCategory === category.slug;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.slug)}
              className={`
                px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 border backdrop-blur-sm
                ${isActive 
                  ? 'bg-white text-black border-white shadow-lg shadow-white/5' 
                  : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/10 hover:text-white'}
              `}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};