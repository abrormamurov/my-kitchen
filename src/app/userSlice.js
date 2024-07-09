import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthState: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
      state.isAuthState = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthState = false;
    },
    isAuthChange: (state, { payload }) => {
      state.isAuthState = payload;
    },
  },
});

export const { isAuthChange, login, logout } = userSlice.actions;
export default userSlice.reducer;
