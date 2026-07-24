import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const IngredientFormList = ({ newRecipe, setNewRecipe }) => {
  return (
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
  );
};

export default IngredientFormList;
