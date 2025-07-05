import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Regular (secured) services
  resumeServiceData: [],
  wifiServicesData: [],
  menuCardServiceData: [],
  textMessageData: [],
  smsServiceData: [],
  vehicleServiceData: [],
  eventServiceData: [],
  multiServicesData: [],

  petIDServicesData: [],
  kidsSafetyServicesData: [],
  // Encrypted services
  audioServiceData: [],
  pdfServiceData: [],
  videoServiceData: [],
  galleryServiceData: [],


  error: null,
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    // ✅ Regular service reducers
    setResumeServices: (state, action) => {

      return {
        ...state,
        resumeServiceData: action.payload,
        error: null,
      };
    },

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
    setPetIdServices: (state, action) => {
      state.petIDServicesData = action.payload;
      state.error = null;
    },
    setKidsSafetyServices: (state, action) => {
      state.kidsSafetyServicesData = action.payload;
      state.error = null;
    },
    // ✅ Encrypted service reducers
    setPDFServices: (state, action) => {
      state.pdfServiceData = action.payload;
      state.error = null;
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

    setAudioServices: (state, action) => {
      state.audioServiceData = action.payload;
      state.error = null;
    },
    setVideoServices: (state, action) => {
      state.videoServiceData = action.payload;
      state.error = null;

    },
    setGalleryServices: (state, action) => {
      state.galleryServiceData = action.payload;
      state.error = null;
    },
    setVideoServices: (state, action) => {
      state.videoServiceData = action.payload;
      state.error = null;
    },
    setGalleryServices: (state, action) => {
      state.galleryServiceData = action.payload;
      state.error = null;
    },
   

    // Clear error globally
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

  setTextMessageServices,
  setSmsServices,
  setVehicleServices,
  setEventServices,
  setMultiUrlServices,
  setWifiServices,
  setPDFServices,
  setAudioServices,
  setVideoServices,
  setGalleryServices,
  clearError,
} = servicesSlice.actions;

export default servicesSlice.reducer;
