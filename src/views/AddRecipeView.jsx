import React from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

const AddRecipeView = ({ setCurrentView, handleSaveRecipe, newRecipe, setNewRecipe, isSaving }) => {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 max-w-3xl mx-auto">
      <button 
        onClick={() => setCurrentView('list')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition mb-6"
      >
        <ArrowLeft className="w-5 h-5" /> Cancel
      </button>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Recipe</h2>
      <form onSubmit={handleSaveRecipe} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Title</label>
          <input 
            required 
            type="text" 
            value={newRecipe.title}
            onChange={(e) => setNewRecipe({...newRecipe, title: e.target.value})}
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="e.g., Grandma's Apple Pie"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              value={newRecipe.category}
              onChange={(e) => setNewRecipe({...newRecipe, category: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Dessert</option>
              <option>Snack</option>
              <option>Beverage</option>
              <option>Sauces</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prep Time</label>
            <input 
              required
              type="text" 
              value={newRecipe.prepTime}
              onChange={(e) => setNewRecipe({...newRecipe, prepTime: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="e.g., 15 mins"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cook Time</label>
            <input 
              required
              type="text" 
              value={newRecipe.cookTime}
              onChange={(e) => setNewRecipe({...newRecipe, cookTime: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="e.g., 45 mins"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
            <input 
              type="text" 
              value={newRecipe.calories}
              onChange={(e) => setNewRecipe({...newRecipe, calories: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="e.g., 450"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Protein</label>
            <input 
              type="text" 
              value={newRecipe.protein}
              onChange={(e) => setNewRecipe({...newRecipe, protein: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="e.g., 30g"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Carbs</label>
            <input 
              type="text" 
              value={newRecipe.carbs}
              onChange={(e) => setNewRecipe({...newRecipe, carbs: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="e.g., 45g"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fats</label>
            <input 
              type="text" 
              value={newRecipe.fats}
              onChange={(e) => setNewRecipe({...newRecipe, fats: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="e.g., 15g"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
          <div className="space-y-3">
            {newRecipe.ingredients.map((ing, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="Qty (e.g. 2)" 
                  value={ing.amount}
                  onChange={(e) => {
                    const newIngs = [...newRecipe.ingredients];
                    newIngs[idx].amount = e.target.value;
                    setNewRecipe({...newRecipe, ingredients: newIngs});
                  }}
                  className="w-20 sm:w-24 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                />
                <input 
                  type="text" 
                  placeholder="Unit (g, oz)" 
                  value={ing.unit}
                  onChange={(e) => {
                    const newIngs = [...newRecipe.ingredients];
                    newIngs[idx].unit = e.target.value;
                    setNewRecipe({...newRecipe, ingredients: newIngs});
                  }}
                  className="w-24 sm:w-32 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                />
                <input 
                  type="text" 
                  placeholder="Ingredient Name" 
                  required
                  value={ing.name}
                  onChange={(e) => {
                    const newIngs = [...newRecipe.ingredients];
                    newIngs[idx].name = e.target.value;
                    setNewRecipe({...newRecipe, ingredients: newIngs});
                  }}
                  className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none min-w-0"
                />
                {newRecipe.ingredients.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => {
                      const newIngs = newRecipe.ingredients.filter((_, i) => i !== idx);
                      setNewRecipe({...newRecipe, ingredients: newIngs});
                    }}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition flex-shrink-0"
                    title="Remove ingredient"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button 
            type="button"
            onClick={() => setNewRecipe({...newRecipe, ingredients: [...newRecipe.ingredients, { name: '', amount: '', unit: '' }]})}
            className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1 mt-3 px-2 py-1 rounded-lg hover:bg-orange-50 transition inline-flex"
          >
            <Plus className="w-4 h-4" /> Add Another Ingredient
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
          <textarea 
            required
            rows="6"
            value={newRecipe.instructions}
            onChange={(e) => setNewRecipe({...newRecipe, instructions: e.target.value})}
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="1. Preheat oven...&#10;2. Mix dry ingredients..."
          />
        </div>

        <button type="submit" disabled={isSaving} className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
          {isSaving ? 'Saving to Firebase...' : 'Save Recipe'}
        </button>
      </form>
    </div>
  );
};

export default AddRecipeView;
