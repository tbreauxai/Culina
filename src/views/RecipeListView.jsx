import React from 'react';
import { Search, Plus, BookOpen } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import EmptyState from '../components/EmptyState';

const RecipeListView = ({ 
  searchQuery, 
  setSearchQuery, 
  setCurrentView, 
  filteredRecipes, 
  selectedForGroceries, 
  setSelectedRecipeId, 
  toggleGrocerySelection 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search recipes or categories..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button 
          onClick={() => setCurrentView('add')}
          className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-xl hover:bg-orange-700 transition w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5" /> Add Recipe
        </button>
      </div>

      {filteredRecipes.length === 0 ? (
        <EmptyState 
          icon={BookOpen}
          message="No recipes found. Start adding your favorites!"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard 
              key={recipe.id}
              recipe={recipe}
              isInGroceryList={selectedForGroceries.includes(recipe.id)}
              onSelect={() => { setSelectedRecipeId(recipe.id); setCurrentView('detail'); }}
              onToggleGrocery={(id) => toggleGrocerySelection({ stopPropagation: () => {} }, id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeListView;
