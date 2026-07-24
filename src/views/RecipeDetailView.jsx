import React from 'react';
import { ArrowLeft, Trash2, Clock, BookOpen } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import IngredientItem from '../components/IngredientItem';

const RecipeDetailView = ({ recipes, handleDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const selectedRecipe = recipes.find(r => r.id === id);

  if (!selectedRecipe) {
    return (
      <div className="text-center py-12 text-gray-500">
        <h2>Recipe not found.</h2>
        <Link to="/" className="text-orange-500 hover:underline">Go back home</Link>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
      <Link 
        to="/"
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition mb-6 w-fit"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Recipes
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <span className="bg-orange-100 text-orange-800 text-sm font-semibold px-3 py-1 rounded-full mb-3 inline-block">
            {selectedRecipe.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{selectedRecipe.title}</h1>
        </div>
        <button 
          onClick={() => handleDelete(selectedRecipe.id, () => navigate('/'))}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition"
        >
          <Trash2 className="w-5 h-5" /> Delete
        </button>
      </div>

      <div className="flex gap-6 mb-8 text-gray-600 bg-gray-50 p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-500" />
          <span><strong>Prep:</strong> {selectedRecipe.prepTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-500" />
          <span><strong>Cook:</strong> {selectedRecipe.cookTime}</span>
        </div>
      </div>

      {selectedRecipe.macros && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-orange-50 p-4 rounded-xl text-center border border-orange-100">
            <span className="block text-sm text-orange-600 font-bold mb-1 uppercase tracking-wider">Calories</span>
            <span className="text-2xl font-bold text-gray-900">{selectedRecipe.macros.calories}</span>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
            <span className="block text-sm text-blue-600 font-bold mb-1 uppercase tracking-wider">Protein</span>
            <span className="text-2xl font-bold text-gray-900">{selectedRecipe.macros.protein}</span>
          </div>
          <div className="bg-green-50 p-4 rounded-xl text-center border border-green-100">
            <span className="block text-sm text-green-600 font-bold mb-1 uppercase tracking-wider">Carbs</span>
            <span className="text-2xl font-bold text-gray-900">{selectedRecipe.macros.carbs}</span>
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl text-center border border-yellow-100">
            <span className="block text-sm text-yellow-600 font-bold mb-1 uppercase tracking-wider">Fats</span>
            <span className="text-2xl font-bold text-gray-900">{selectedRecipe.macros.fats}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-orange-500"/> Ingredients
          </h2>
          <ul className="space-y-1">
            {selectedRecipe.ingredients.map((ing, idx) => (
              <IngredientItem key={idx} ingredient={ing} />
            ))}
          </ul>
        </div>
        
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Instructions</h2>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {selectedRecipe.instructions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailView;
