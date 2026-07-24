import React from 'react';

const EmptyState = ({ icon: Icon, title, message, actionButton }) => {
  return (
    <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
      {Icon && <Icon className="w-12 h-12 mx-auto mb-3 text-gray-300" />}
      {title && <h2 className="text-xl font-bold text-gray-700 mb-2">{title}</h2>}
      <p>{message}</p>
      {actionButton && (
        <div className="mt-6">
          {actionButton}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
