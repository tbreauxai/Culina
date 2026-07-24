import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

import Header from './components/Header';
import RecipeListView from './views/RecipeListView';
import RecipeDetailView from './views/RecipeDetailView';
import AddRecipeView from './views/AddRecipeView';
import GroceryListView from './views/GroceryListView';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'detail', 'add', 'groceries'
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedForGroceries, setSelectedForGroceries] = useState([]);
  const [checkedGroceries, setCheckedGroceries] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

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
    ingredients: [{ name: '', amount: '', unit: '' }],
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
      setCurrentView('list');
      setNewRecipe({ title: '', prepTime: '', cookTime: '', category: 'Dinner', calories: '', protein: '', carbs: '', fats: '', ingredients: [{ name: '', amount: '', unit: '' }], instructions: '' });
    } catch (error) {
      console.error("Error adding recipe: ", error);
      alert("Failed to save recipe. Please check your browser console or Firebase rules.");
    } finally {
      setIsSaving(false);
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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-orange-200">
      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
        selectedForGroceries={selectedForGroceries}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'list' && (
          <RecipeListView 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setCurrentView={setCurrentView}
            filteredRecipes={filteredRecipes}
            selectedForGroceries={selectedForGroceries}
            setSelectedRecipeId={setSelectedRecipeId}
            toggleGrocerySelection={toggleGrocerySelection}
          />
        )}
        {currentView === 'detail' && (
          <RecipeDetailView 
            selectedRecipe={selectedRecipe}
            setCurrentView={setCurrentView}
            handleDelete={handleDelete}
          />
        )}
        {currentView === 'add' && (
          <AddRecipeView 
            setCurrentView={setCurrentView}
            handleSaveRecipe={handleSaveRecipe}
            newRecipe={newRecipe}
            setNewRecipe={setNewRecipe}
            isSaving={isSaving}
          />
        )}
        {currentView === 'groceries' && (
          <GroceryListView 
            recipes={recipes}
            selectedForGroceries={selectedForGroceries}
            setSelectedForGroceries={setSelectedForGroceries}
            checkedGroceries={checkedGroceries}
            setCheckedGroceries={setCheckedGroceries}
            setCurrentView={setCurrentView}
            toggleGroceryItem={toggleGroceryItem}
          />
        )}
      </main>
    </div>
  );
}