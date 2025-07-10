import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  businessCardServicesData: [],
  resumeServiceData: [],
  wifiServicesData: [],
  menuCardServiceData: [],
  textMessageData: [],
  smsServiceData: [],
  vehicleServiceData: [],
  discountServicesData: [],
  eventServiceData: [],
  multiServicesData: [],
  propertyServiceData: [],
  petIDServicesData: [],
  kidsSafetyServicesData: [],
  medicalServicesData: [],
  pdfServiceData: [],
  audioServiceData: [],
  videoServiceData: [],
  galleryServiceData: [],
  businessCardData: [],
  error: null,
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    // Regular Services
    setBusinessCardServices: (state, action) => {
      state.businessCardServicesData = action.payload;
      state.error = null;
    },
    setResumeServices: (state, action) => {
      state.resumeServiceData = action.payload;
      state.error = null;
    },
    setMenuCardServices: (state, action) => {
      state.menuCardServiceData = action.payload;
      state.error = null;
    },
    setTextMessageServices: (state, action) => {
      state.textMessageData = action.payload;
      state.error = null;
    },
    setSmsServices: (state, action) => {
      state.smsServiceData = action.payload;
      state.error = null;
    },
    setVehicleServices: (state, action) => {
      state.vehicleServiceData = action.payload;
      state.error = null;
    },
    setEventServices: (state, action) => {
      state.eventServiceData = action.payload;
      state.error = null;
    },
    setMultiUrlServices: (state, action) => {
      state.multiServicesData = action.payload;
      state.error = null;
    },
    setWifiServices: (state, action) => {
      state.wifiServicesData = action.payload;
      state.error = null;
    },
    setPropertyServices: (state, action) => {
      state.propertyServiceData = action.payload;
      state.error = null;
    },
    setDiscountServices: (state, action) => {
      state.discountServicesData = action.payload;
      state.error = null;
    },
    setMedicalServices: (state, action) => {
      state.medicalServicesData = action.payload;
      state.error = null;
    },
    setPetIdServices: (state, action) => {
      state.petIDServicesData = action.payload;
      state.error = null;
    },
    setKidsSafetyServices: (state, action) => {
      state.kidsSafetyServicesData = action.payload;
      state.error = null;
    },

    // Optionally: set just raw businessCardData (separate from services array)
    setBusinessCardData: (state, action) => {
      state.businessCardData = action.payload;
    },

    // Error handler
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setBusinessCardServices,
  setResumeServices,
  setMenuCardServices,
  setTextMessageServices,
  setSmsServices,
  setVehicleServices,
  setEventServices,
  setMultiUrlServices,
  setWifiServices,
  setPropertyServices,
  setDiscountServices,
  setMedicalServices,
  setPetIdServices,
  setKidsSafetyServices,
  setBusinessCardData,
  clearError,
} = servicesSlice.actions;

export default servicesSlice.reducer;
