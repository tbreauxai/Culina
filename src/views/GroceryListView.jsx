import React from 'react';
import { ShoppingCart, CheckCircle2, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';

const GroceryListView = ({ 
  recipes, 
  selectedForGroceries, 
  checkedGroceries, 
  clearGroceryList, 
  toggleGroceryItem 
}) => {
  const selectedRecipes = recipes.filter(r => selectedForGroceries.includes(r.id));
  
  if (selectedRecipes.length === 0) {
    return (
      <EmptyState 
        icon={ShoppingCart}
        title="Your list is empty"
        message="Select the shopping cart icon on any recipe to add its ingredients here."
        actionButton={
          <Link 
            to="/"
            className="bg-orange-100 text-orange-700 px-6 py-2 rounded-xl font-semibold hover:bg-orange-200 transition inline-block"
          >
            Browse Recipes
          </Link>
        }
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-orange-500"/> Grocery List
        </h2>
        <button 
          onClick={clearGroceryList}
          className="text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
        >
          Clear List
        </button>
      </div>

      <div className="space-y-8">
        {selectedRecipes.map(recipe => (
          <div key={recipe.id} className="bg-gray-50 p-5 rounded-xl border border-gray-100">
            <h3 className="font-bold text-lg text-gray-800 mb-4 pb-2 border-b border-gray-200">{recipe.title}</h3>
            <ul className="space-y-3">
              {recipe.ingredients.map((ing, idx) => {
                const ingDisplay = typeof ing === 'string' ? ing : [ing.amount, ing.unit, ing.name].filter(Boolean).join(' ');
                const uniqueKey = `${recipe.id}-${idx}-${ingDisplay}`;
                const isChecked = checkedGroceries.includes(uniqueKey);
                return (
                  <li 
                    key={uniqueKey} 
                    className="flex items-start gap-3 cursor-pointer group"
                    onClick={() => toggleGroceryItem(uniqueKey)}
                  >
                    <button className="mt-0.5 text-gray-400 group-hover:text-orange-500 transition flex-shrink-0">
                      {isChecked ? <CheckCircle2 className="w-5 h-5 text-orange-500" /> : <Circle className="w-5 h-5" />}
                    </button>
                    <span className={`text-gray-700 transition ${isChecked ? 'line-through text-gray-400' : ''}`}>
                      {ingDisplay}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroceryListView;
