import React, { useState, useEffect } from 'react';
import { ChefHat, Plus, Clock, BookOpen, ArrowLeft, Trash2, Search, ShoppingCart, CheckCircle2, Circle, Flame } from 'lucide-react';
import { collection, addDoc, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'detail', 'add', 'groceries'
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedForGroceries, setSelectedForGroceries] = useState([]);
  const [checkedGroceries, setCheckedGroceries] = useState([]);

  // Form State
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    prepTime: '',
    cookTime: '',
    category: 'Dinner',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    ingredients: '',
    instructions: ''
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'recipes'), (snapshot) => {
      const recipesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecipes(recipesData);
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const selectedRecipe = recipes.find(r => r.id === selectedRecipeId);

  const filteredRecipes = recipes.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveRecipe = async (e) => {
    e.preventDefault();
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
      ingredients: newRecipe.ingredients.split('\n').filter(i => i.trim() !== ''),
      instructions: newRecipe.instructions
    };
    
    try {
      await addDoc(collection(db, 'recipes'), recipeToAdd);
      setCurrentView('list');
      setNewRecipe({ title: '', prepTime: '', cookTime: '', category: 'Dinner', calories: '', protein: '', carbs: '', fats: '', ingredients: '', instructions: '' });
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'recipes', id));
      setSelectedForGroceries(selectedForGroceries.filter(recipeId => recipeId !== id));
      setCurrentView('list');
    } catch (error) {
      console.error("Error deleting recipe: ", error);
    }
  };

  const toggleGrocerySelection = (e, id) => {
    e.stopPropagation(); // Prevent opening the recipe detail
    if (selectedForGroceries.includes(id)) {
      setSelectedForGroceries(selectedForGroceries.filter(recipeId => recipeId !== id));
    } else {
      setSelectedForGroceries([...selectedForGroceries, id]);
    }
  };

  const toggleGroceryItem = (itemString) => {
    if (checkedGroceries.includes(itemString)) {
      setCheckedGroceries(checkedGroceries.filter(i => i !== itemString));
    } else {
      setCheckedGroceries([...checkedGroceries, itemString]);
    }
  };

  const renderList = () => (
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
        <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No recipes found. Start adding your favorites!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => {
            const isInGroceryList = selectedForGroceries.includes(recipe.id);
            return (
              <div 
                key={recipe.id} 
                onClick={() => { setSelectedRecipeId(recipe.id); setCurrentView('detail'); }}
                className={`bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition cursor-pointer flex flex-col h-full ${isInGroceryList ? 'border-orange-400 ring-1 ring-orange-400' : 'border-gray-100'}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {recipe.category}
                  </span>
                  <button 
                    onClick={(e) => toggleGrocerySelection(e, recipe.id)}
                    className={`p-1.5 rounded-full transition ${isInGroceryList ? 'bg-orange-100 text-orange-600' : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}
                    title="Toggle Grocery List"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{recipe.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-auto pt-4">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> {recipe.prepTime}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-4 h-4"/> {recipe.ingredients.length} items</span>
                  {recipe.macros?.calories && recipe.macros.calories !== '-' && (
                    <span className="flex items-center gap-1 text-orange-600 font-medium"><Flame className="w-4 h-4"/> {recipe.macros.calories} cal</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderGroceries = () => {
    const selectedRecipes = recipes.filter(r => selectedForGroceries.includes(r.id));
    
    if (selectedRecipes.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
          <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <h2 className="text-xl font-bold text-gray-700 mb-2">Your list is empty</h2>
          <p>Select the shopping cart icon on any recipe to add its ingredients here.</p>
          <button 
            onClick={() => setCurrentView('list')}
            className="mt-6 bg-orange-100 text-orange-700 px-6 py-2 rounded-xl font-semibold hover:bg-orange-200 transition"
          >
            Browse Recipes
          </button>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-orange-500"/> Grocery List
          </h2>
          <button 
            onClick={() => { setSelectedForGroceries([]); setCheckedGroceries([]); }}
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
                  const uniqueKey = `${recipe.id}-${idx}-${ing}`;
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
                        {ing}
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

  const renderDetail = () => {
    if (!selectedRecipe) return null;
    return (
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <button 
          onClick={() => setCurrentView('list')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition mb-6"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Recipes
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <span className="bg-orange-100 text-orange-800 text-sm font-semibold px-3 py-1 rounded-full mb-3 inline-block">
              {selectedRecipe.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{selectedRecipe.title}</h1>
          </div>
          <button 
            onClick={() => handleDelete(selectedRecipe.id)}
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
            <ul className="space-y-2">
              {selectedRecipe.ingredients.map((ing, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700 border-b border-gray-100 pb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0"></span>
                  {ing}
                </li>
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

  const renderAdd = () => (
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients (One per line)</label>
          <textarea 
            required
            rows="5"
            value={newRecipe.ingredients}
            onChange={(e) => setNewRecipe({...newRecipe, ingredients: e.target.value})}
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="2 cups flour&#10;1 cup sugar&#10;3 eggs"
          />
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

        <button type="submit" className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl hover:bg-orange-700 transition">
          Save Recipe
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-orange-200">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('list')}>
            <div className="bg-orange-600 p-2 rounded-xl">
              <ChefHat className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Culina</h1>
          </div>
          
          <nav className="flex bg-gray-100 p-1 rounded-xl">
            <button 
              onClick={() => setCurrentView('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${currentView === 'list' || currentView === 'detail' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <BookOpen className="w-4 h-4" /> Recipes
            </button>
            <button 
              onClick={() => setCurrentView('groceries')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${currentView === 'groceries' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <ShoppingCart className="w-4 h-4" /> 
              Grocery List
              {selectedForGroceries.length > 0 && (
                <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1">
                  {selectedForGroceries.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'list' && renderList()}
        {currentView === 'detail' && renderDetail()}
        {currentView === 'add' && renderAdd()}
        {currentView === 'groceries' && renderGroceries()}
      </main>
    </div>
  );
}