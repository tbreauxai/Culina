import React from 'react';

const IngredientItem = ({ ingredient }) => {
  return (
    <li className="py-2 border-b border-gray-100 last:border-0 flex justify-between items-center text-gray-700">
      <span className="font-medium">{ingredient.name}</span>
      <span className="text-gray-500 text-sm">
        {ingredient.amount} {ingredient.unit}
      </span>
    </li>
  );
};

export default IngredientItem;
