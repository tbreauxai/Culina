import React from 'react';
import { ChefHat, BookOpen, ShoppingCart } from 'lucide-react';

const Header = ({ currentView, setCurrentView, selectedForGroceries }) => {
  return (
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
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${currentView === 'list' || currentView === 'detail' || currentView === 'add' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
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
  );
};

export default Header;
