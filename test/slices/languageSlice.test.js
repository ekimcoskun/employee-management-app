import { describe, it, expect, vi } from "vitest";

const enLocale = {
  save: "Save",
  cancel: "Cancel",
};
const trLocale = {
  save: "Kaydet",
  cancel: "İptal",
};

vi.mock("../../src/store/store.js", () => ({
  store: {
    getState: () => ({
      language: {
        locale: enLocale,
        language: "en",
      },
    }),
  },
}));

import {
  languageReducer,
  setLocale,
  setLanguage,
  msg,
} from "../../src/store/slices/languageSlice.js";

describe("languageReducer", () => {
  it("should set initial state", () => {
    const state = languageReducer(undefined, { type: "@@INIT" });
    expect(state).toHaveProperty("locale");
    expect(state.language).toBe("en");
  });

  it("should handle setLocale", () => {
    const action = setLocale(trLocale);
    const state = languageReducer(undefined, action);
    expect(state.locale).toBe(trLocale);
  });

  it("should handle setLanguage", () => {
    const action = setLanguage("tr");
    const state = languageReducer(undefined, action);
    expect(state.language).toBe("tr");
  });
});

describe("msg function", () => {
  it("should return correct message for existing key", () => {
    expect(msg("save")).toBe("Save");
  });

  it("should return key itself if not found", () => {
    expect(msg("not_exist")).toBe("not_exist");
  });
});
