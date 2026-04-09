import React from 'react';
import IngredientItem from './IngredientItem';

export default function Recipe() {
  const ingredients = [
    { id: 1, name: 'All-purpose flour', amountGrams: 250 },
    { id: 2, name: 'Granulated sugar', amountGrams: 100 },
    { id: 3, name: 'Butter', amountGrams: 115 },
    { id: 4, name: 'Salt', amountGrams: 5 },
  ];

  return (
    <div className="max-w-md mx-auto mt-8 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-orange-600 px-4 py-3">
        <h2 className="text-white text-lg font-bold">Pound Cake</h2>
      </div>
      <ul className="list-none p-0 m-0">
        {ingredients.map((ing) => (
          <IngredientItem 
            key={ing.id} 
            name={ing.name} 
            baseAmountGrams={ing.amountGrams} 
          />
        ))}
      </ul>
    </div>
  );
}