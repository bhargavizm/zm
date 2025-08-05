import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullUserDetails:{},
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
     setGetUserFullData: (state, action) => {
      return {
        ...state,
        fullUserDetails: action.payload,
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

export const { setUserData, setGetUserFullData,logoutUser, clearError } = authSlice.actions;

export default authSlice.reducer;
