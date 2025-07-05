import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resumeServiceData: [],
  wifiServicesData: [],
  menuCardServiceData: [],
  textMessageData: [],
  smsServiceData: [],
  vehicleServiceData: [],
  eventServiceData: [],
  multiServicesData: [],

  error: null,
};

const servicesSlice = createSlice({
  name: "Services",
  initialState,
  reducers: {
    setResumeServices: (state, action) => {
      return {
        ...state,
        resumeServiceData: action.payload,
        error: null,
      };
    },

    setMenuCardServices: (state, action) => {
      return {
        ...state,
        menuCardServiceData: action.payload,
        error: null,
      };
    },

    setTextMessageServices: (state, action) => {
      return {
        ...state,
        textMessageData: action.payload,
        error: null,
      };
    },
    setSmsServices: (state, action) => {
      return {
        ...state,
        smsServiceData: action.payload,
        error: null,
      };
    },
    setVehicleServices: (state, action) => {
      return {
        ...state,
        vehicleServiceData: action.payload,
        error: null,
      };
    },

    setEventServices: (state, action) => {
      return {
        ...state,
        eventServiceData: action.payload,
        error: null,
      };
    },
    setMultiUrlServices: (state, action) => {
      return {
        ...state,
        multiServicesData: action.payload,
        error: null,
      };
    },
    setWifiServices: (state, action) => {
      return {
        ...state,
        wifiServicesData: action.payload,
        error: null,
      };
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setResumeServices,
  setMenuCardServices,
  setEventServices,
  setTextMessageServices,
  setSmsServices,
  setMultiUrlServices,
  setVehicleServices,
  setWifiServices,
  clearError,
} = servicesSlice.actions;

export default servicesSlice.reducer;
