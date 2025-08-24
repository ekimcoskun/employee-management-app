import en from "./locales/en.js";
import tr from "./locales/tr.js";
import { store } from "./store/store.js";

const translations = {
  en,
  tr,
};

export function t(key) {
  const locale = store.getState().language.locale || "en";
  return translations[locale]?.[key] || key;
}
