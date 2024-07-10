// src/components/Charts.js

import React from "react";
import { useSelector } from "react-redux";
import Pie from "./Pie"; // Assuming Pie component is located in the same directory

function Charts() {
  const ingredientCounts = useSelector(
    (state) => state.kitchen?.ingredientCounts
  );

  return (
    <div className="w-auto">
      <h2 className="text-3xl font-semibold">Ingredients Pie Chart</h2>
      {ingredientCounts && Object.keys(ingredientCounts).length > 0 ? (
        <Pie data={ingredientCounts} />
      ) : (
        <p>No ingredients added yet</p>
      )}
    </div>
  );
}

export default Charts;
