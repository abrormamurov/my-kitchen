// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import kitchenReducer from "./kitchenSlice";

const store = configureStore({
  reducer: {
    kitchen: kitchenReducer,
  },
});

export default store;
