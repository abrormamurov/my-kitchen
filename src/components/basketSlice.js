import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItemToBasket(state, action) {
      state.items.push(action.payload);
    },
    removeItemFromBasket(state, action) {
      state.items = state.items.filter(
        (item, index) => index !== action.payload
      );
    },
  },
});

export const { addItemToBasket, removeItemFromBasket } = basketSlice.actions;
export default basketSlice.reducer;
