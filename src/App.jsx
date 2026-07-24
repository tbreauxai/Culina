import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import RecipeListView from './views/RecipeListView';
import RecipeDetailView from './views/RecipeDetailView';
import AddRecipeView from './views/AddRecipeView';
import GroceryListView from './views/GroceryListView';

import { useRecipes } from './hooks/useRecipes';
import { useGroceryList } from './hooks/useGroceryList';

export default function App() {
  const { 
    recipes, 
    searchQuery, 
    setSearchQuery, 
    filteredRecipes, 
    handleDelete 
  } = useRecipes();

  const {
    selectedForGroceries,
    checkedGroceries,
    toggleGrocerySelection,
    toggleGroceryItem,
    clearGroceryList,
    removeRecipeFromGroceries
  } = useGroceryList();

  const handleDeleteWithGroceries = (id, onDeleted) => {
    handleDelete(id, onDeleted);
    removeRecipeFromGroceries(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-orange-200">
      <Header selectedForGroceries={selectedForGroceries} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route 
            path="/" 
            element={
              <RecipeListView 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredRecipes={filteredRecipes}
                selectedForGroceries={selectedForGroceries}
                toggleGrocerySelection={toggleGrocerySelection}
              />
            } 
          />
          <Route 
            path="/add" 
            element={<AddRecipeView />} 
          />
          <Route 
            path="/groceries" 
            element={
              <GroceryListView 
                recipes={recipes}
                selectedForGroceries={selectedForGroceries}
                checkedGroceries={checkedGroceries}
                clearGroceryList={clearGroceryList}
                toggleGroceryItem={toggleGroceryItem}
              />
            } 
          />
          <Route 
            path="/recipe/:id" 
            element={
              <RecipeDetailView 
                recipes={recipes}
                handleDelete={handleDeleteWithGroceries}
              />
            } 
          />
        </Routes>
      </main>
    </div>
  );
}