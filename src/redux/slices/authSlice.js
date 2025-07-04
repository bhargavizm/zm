import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [], // called in the return state of the reducer
  error: null,
};

const authSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return {
        ...state,
        userData: action.payload,
        error: null,
      };
    },
    logoutUser: (state) => {
      state.userData = null;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setUserData, logoutUser, clearError } = authSlice.actions;

export default authSlice.reducer;
