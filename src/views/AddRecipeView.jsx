import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import IngredientFormList from '../components/IngredientFormList';

const AddRecipeView = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    prepTime: '',
    cookTime: '',
    category: 'Dinner',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    ingredients: [{ name: '', amount: '', unit: '' }],
    instructions: ''
  });

  const handleSaveRecipe = async (e) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);

    const recipeToAdd = {
      title: newRecipe.title,
      prepTime: newRecipe.prepTime,
      cookTime: newRecipe.cookTime,
      category: newRecipe.category,
      macros: {
        calories: newRecipe.calories || '-',
        protein: newRecipe.protein || '-',
        carbs: newRecipe.carbs || '-',
        fats: newRecipe.fats || '-'
      },
      ingredients: newRecipe.ingredients.filter(i => i.name.trim() !== ''),
      instructions: newRecipe.instructions
    };
    
    try {
      await addDoc(collection(db, 'recipes'), recipeToAdd);
      navigate('/');
    } catch (error) {
      console.error("Error adding recipe: ", error);
      alert("Failed to save recipe. Please check your browser console or Firebase rules.");
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 max-w-3xl mx-auto">
      <Link 
        to="/"
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition mb-6 w-fit"
      >
        <ArrowLeft className="w-5 h-5" /> Cancel
      </Link>
      
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

        <IngredientFormList newRecipe={newRecipe} setNewRecipe={setNewRecipe} />

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
