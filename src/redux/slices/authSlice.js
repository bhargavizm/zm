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
    setDeleteUserFullData: (state, action) => {
  const deletedServiceId = action.payload; // serviceId

  // If fullUserDetails or services is empty, skip
  if (!state.fullUserDetails?.services) return;

  // Map through services and remove the deleted service from each service's data
  const updatedServices = state.fullUserDetails.services.map((service) => {
    const filteredData = service.data.filter(
      (item) => item._id !== deletedServiceId
    );

    return {
      ...service,
      data: filteredData,
      count: filteredData.length,
    };
  });

  state.fullUserDetails = {
    ...state.fullUserDetails,
    services: updatedServices,
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

export const { setUserData, setGetUserFullData,logoutUser, setDeleteUserFullData,clearError } = authSlice.actions;

export default authSlice.reducer;
