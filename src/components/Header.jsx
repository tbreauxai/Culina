import React from 'react';
import { ChefHat, BookOpen, ShoppingCart, Download } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { usePWAInstall } from '../hooks/usePWAInstall';

const Header = ({ selectedForGroceries }) => {
  const location = useLocation();
  const currentView = location.pathname;
  const { isInstallable, handleInstallClick } = usePWAInstall();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <div className="bg-orange-600 p-2 rounded-xl">
              <ChefHat className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Culina</h1>
          </Link>

          {isInstallable && (
            <button
              onClick={handleInstallClick}
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition"
            >
              <Download className="w-4 h-4" /> Install App
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {isInstallable && (
            <button
              onClick={handleInstallClick}
              className="sm:hidden flex items-center justify-center p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
              title="Install App"
            >
              <Download className="w-4 h-4" />
            </button>
          )}
          
          <nav className="flex bg-gray-100 p-1 rounded-xl">
            <Link 
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${currentView === '/' || currentView.startsWith('/recipe') || currentView === '/add' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <BookOpen className="w-4 h-4" /> Recipes
            </Link>
            <Link 
              to="/groceries"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${currentView === '/groceries' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <ShoppingCart className="w-4 h-4" /> 
              Grocery List
              {selectedForGroceries.length > 0 && (
                <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1">
                  {selectedForGroceries.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
