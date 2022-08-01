import i18n from "i18next";
import translationEng from "./en/translation.json";
import translationVie from "./vi/translation.json";
import { initReactI18next } from "react-i18next";

export const defaultNS = "translations";

export const resources = {
  vi: {
    translations: translationVie,
  },
  en: {
    translations: translationEng,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  ns: ["translations"],
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  defaultNS: "translations",
  resources,
});

export default i18n;
