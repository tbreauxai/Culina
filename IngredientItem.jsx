import React, { useState } from 'react';
import { CONVERSION_RATES, UNIT_LABELS, convertAmount } from '../utils/conversions';

export default function IngredientItem({ ingredient }) {
  // If it's just a string, render it simply without conversion capabilities
  if (typeof ingredient === 'string') {
    return (
      <li className="flex items-center gap-2 text-gray-700 border-b border-gray-100 py-2">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0"></span>
        <span>{ingredient}</span>
      </li>
    );
  }

  const { name, amount, unit } = ingredient;
  const normalizedUnit = unit ? unit.toLowerCase() : '';
  const isConvertible = CONVERSION_RATES.hasOwnProperty(normalizedUnit) && !isNaN(parseFloat(amount));

  const [selectedUnit, setSelectedUnit] = useState(isConvertible ? normalizedUnit : '');

  const displayAmount = isConvertible ? convertAmount(amount, normalizedUnit, selectedUnit) : amount;

  return (
    <li className="flex items-center justify-between py-3 border-b border-gray-100 group">
      <div className="flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0"></span>
        <span className="text-gray-700">{name}</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-gray-700 font-medium text-right">
          {displayAmount} {!isConvertible && unit}
        </span>
        
        {isConvertible && (
          <select 
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="p-1 border border-gray-200 rounded text-sm bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            {Object.keys(CONVERSION_RATES).map((u) => (
              <option key={u} value={u}>
                {UNIT_LABELS[u]}
              </option>
            ))}
          </select>
        )}
      </div>
    </li>
  );
}