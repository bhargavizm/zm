"use client";


import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { myPersistor, myStore } from "../store/store";

const ReduxProvider = ({ children }) => (
  <Provider store={myStore}>
    <PersistGate loading={null} persistor={myPersistor}>
      {children}
    </PersistGate>
  </Provider>
);

export default ReduxProvider;
