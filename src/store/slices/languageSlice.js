import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locale: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
  },
});

export const { setLocale } = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
