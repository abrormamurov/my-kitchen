import React from "react";

const Modal = ({ title, imageUrl, ingredients, method, onClose }) => {
  return (
    <div className=" relative inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full border-primary	border-double  border-4	 ">
        <div className="absolute top-0 right-0 mr-20   -mt-3">
          <div className="inline-flex items-center text-xs font-semibold py-1.5 px-3 bg-primary text-white rounded-full shadow-sm shadow-slate-950/5 border-double">
            Preview
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        {imageUrl && (
          <div className="mb-4">
            <img
              src={imageUrl}
              alt="Recipe Image"
              className="w-full h-40 object-cover"
            />
          </div>
        )}
        <div className="mb-4">
          <h4 className="font-semibold">Ingredients:</h4>
          {ingredients.length > 0 ? (
            <ul className="list-disc list-inside">
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          ) : (
            <p>No ingredients</p>
          )}
        </div>
        <div className="mb-4">
          <h4 className="font-semibold">Method:</h4>
          <p className="max-h-40 overflow-auto pr-2">{method}</p>
        </div>
        <button onClick={onClose} className="btn btn-sm btn-primary w-full">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
