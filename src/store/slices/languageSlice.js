import { createSlice } from "@reduxjs/toolkit";
import en from "../../locales/en.js";
import { store } from "../store.js";

const initialState = {
  locale: en,
  language: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const msg = (key) => {
  const { locale } = store.getState().language;
  return locale[key] || key;
};

export const { setLocale, setLanguage, t } = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
