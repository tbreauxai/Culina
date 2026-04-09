import React, { useState } from 'react';
import { CONVERSION_RATES, UNIT_LABELS, convertFromGrams } from '../utils/conversions';

export default function IngredientItem({ name, baseAmountGrams }) {
  // Default to grams
  const [selectedUnit, setSelectedUnit] = useState('g');

  const displayAmount = convertFromGrams(baseAmountGrams, selectedUnit);

  return (
    <li className="flex items-center justify-between p-3 border-b border-gray-200">
      <span className="font-medium text-gray-800">{name}</span>
      
      <div className="flex items-center space-x-2">
        <span className="text-gray-600 font-semibold w-16 text-right">
          {displayAmount}
        </span>
        
        <select 
          value={selectedUnit}
          onChange={(e) => setSelectedUnit(e.target.value)}
          className="ml-2 p-1 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {Object.keys(CONVERSION_RATES).map((unit) => (
            <option key={unit} value={unit}>
              {UNIT_LABELS[unit]}
            </option>
          ))}
        </select>
      </div>
    </li>
  );
}