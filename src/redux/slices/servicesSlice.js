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
  setBusinessCardServices:[],
  error: null,
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setBusinessCardServices: (state, action) => ({
      ...state,   
      businessCardServicesData: action.payload,
      error: null,
    }),
    // Regular Services
    setBusinessCardServices: (state, action) => ({
      ...state,
      resumeServiceData: action.payload,
      error: null,
    }),
    setResumeServices: (state, action) => ({
      ...state,
      resumeServiceData: action.payload,
      error: null,
    }),
    setMenuCardServices: (state, action) => ({
      ...state,
      menuCardServiceData: action.payload,
      error: null,
    }),
    setTextMessageServices: (state, action) => ({
      ...state,
      textMessageData: action.payload,
      error: null,
    }),
    setSmsServices: (state, action) => ({
      ...state,
      smsServiceData: action.payload,
      error: null,
    }),
    setVehicleServices: (state, action) => ({
      ...state,
      vehicleServiceData: action.payload,
      error: null,
    }),
    setEventServices: (state, action) => ({
      ...state,
      eventServiceData: action.payload,
      error: null,
    }),
    setMultiUrlServices: (state, action) => ({
      ...state,
      multiServicesData: action.payload,
      error: null,
    }),
    setWifiServices: (state, action) => ({
      ...state,
      wifiServicesData: action.payload,
      error: null,
    }),
    setPropertyServices: (state, action) => ({
      ...state,
      propertyServiceData: action.payload,
      error: null,
    }),
    setDiscountServices: (state, action) => ({
      ...state,
      discountServicesData : action.payload,
      error : null,
    }),
    setMedicalServices: (state, action) => ({
      ...state, 
      medicalServicesData : action.payload,
      error: null,
    }),


    // Encrypted Services
    setPetIdServices: (state, action) => ({
      ...state,
      petIDServicesData: action.payload,
      error: null,
    }),
    setKidsSafetyServices: (state, action) => ({
      ...state,
      kidsSafetyServicesData: action.payload,
      error: null,
    }),

    // Error handling
    clearError: (state) => ({
      ...state,
      error: null,
    }),
  },
});

export const {
  setResumeServices,
  setMenuCardServices,
  setTextMessageServices,
  setSmsServices,
  setVehicleServices,
  setEventServices,
  setMultiUrlServices,
  setWifiServices,
  setPropertyServices,
  setPetIdServices,
  setKidsSafetyServices,
  setDiscountServices,
  setBusinessCardServices,
  setMedicalServices,

  clearError,
} = servicesSlice.actions;

export default servicesSlice.reducer;