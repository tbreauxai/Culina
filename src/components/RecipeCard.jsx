import React from 'react';
import { ShoppingCart, Clock, BookOpen, Flame } from 'lucide-react';

const RecipeCard = ({ recipe, isInGroceryList, onSelect, onToggleGrocery }) => {
  return (
    <div 
      onClick={onSelect}
      className={`bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition cursor-pointer flex flex-col h-full ${isInGroceryList ? 'border-orange-400 ring-1 ring-orange-400' : 'border-gray-100'}`}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {recipe.category}
        </span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleGrocery(recipe.id);
          }}
          className={`p-1.5 rounded-full transition ${isInGroceryList ? 'bg-orange-100 text-orange-600' : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}
          title="Toggle Grocery List"
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{recipe.title}</h3>
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-auto pt-4">
        <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> {recipe.prepTime}</span>
        <span className="flex items-center gap-1"><BookOpen className="w-4 h-4"/> {recipe.ingredients?.length || 0} items</span>
        {recipe.macros?.calories && recipe.macros.calories !== '-' && (
          <span className="flex items-center gap-1 text-orange-600 font-medium"><Flame className="w-4 h-4"/> {recipe.macros.calories} cal</span>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
