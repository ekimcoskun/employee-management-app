import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { employeeReducer } from "./slices/employeeSlice.js";
import { languageReducer } from "./slices/languageSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  employee: employeeReducer,
  language: languageReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["language"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
