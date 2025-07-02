"use client";

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import servicesReducer from "../slices/servicesSlice";

// ⛔ Do NOT import thunk manually — it's already included by Redux Toolkit
// import { thunk } from "redux-thunk";

import urlServiceReducer from "../slices/urlServicesSlice";

const rootReducer = combineReducers({
  urlService: urlServiceReducer,
  services:servicesReducer
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const myStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // ⛔ Don't add `.concat(thunk)` — already included
});

export const myPersistor = persistStore(myStore);
