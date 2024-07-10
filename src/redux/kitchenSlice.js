// src/redux/kitchenSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  kitchens: [],
  ingredientCounts: {},
};

const kitchenSlice = createSlice({
  name: "kitchen",
  initialState,
  reducers: {
    setKitchens: (state, action) => {
      state.kitchens = action.payload;
    },
    setIngredientCounts: (state, action) => {
      state.ingredientCounts = action.payload;
    },
  },
});

export const { setKitchens, setIngredientCounts } = kitchenSlice.actions;

export default kitchenSlice.reducer;
