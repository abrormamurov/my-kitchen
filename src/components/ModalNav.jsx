import React from "react";

function ModalNav({ showModal, onClose, title, ingredients, method }) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2>{title}</h2>
          <button onClick={onClose} className="text-black">
            &times;
          </button>
        </div>
        <div>
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p>{method}</p>
        </div>
      </div>
    </div>
  );
}

export default ModalNav;
