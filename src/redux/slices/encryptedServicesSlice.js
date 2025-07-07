import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  audioServiceData: [],
  pdfServiceData: [],
 videoServiceData: [],
  galleryServiceData: [],
  error: null,
};

const encryptedServicesSlice = createSlice({
  name: "encryptedServices",
  initialState,
  reducers: {
    setPDFServices: (state, action) => {
      return {
        ...state,
        pdfServiceData: action.payload,
        error: null,
      };
    },

    setAudioServices: (state, action) => {
      return {
        ...state,
        audioServiceData: action.payload,
        error: null,
      };
    },
    setVideoServices: (state, action) => {
      return {
        ...state,
        videoServiceData: action.payload,
        error: null,
      };
    },
    setGalleryServices: (state, action) => {
      return {
        ...state,
        galleryServiceData: action.payload,
        error: null,
      };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setGalleryServices,
  setVideoServices,
  setPDFServices,
  setAudioServices,

  clearError,
} = encryptedServicesSlice.actions;

export default encryptedServicesSlice.reducer;
