import { useState } from 'react';

export function useGroceryList() {
  const [selectedForGroceries, setSelectedForGroceries] = useState([]);
  const [checkedGroceries, setCheckedGroceries] = useState([]);

  const toggleGrocerySelection = (id) => {
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

  const clearGroceryList = () => {
    setSelectedForGroceries([]);
    setCheckedGroceries([]);
  };

  const removeRecipeFromGroceries = (id) => {
    setSelectedForGroceries(prev => prev.filter(recipeId => recipeId !== id));
  };

  return {
    selectedForGroceries,
    checkedGroceries,
    toggleGrocerySelection,
    toggleGroceryItem,
    clearGroceryList,
    removeRecipeFromGroceries
  };
}
