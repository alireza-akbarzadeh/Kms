//
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import backend from "i18next-http-backend";

import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en/Translation.json";
import fa from "./fa/Translation.json";

const fallbackLng = ["fa"];
const availableLanguages = ["fa", "en"];

// the translations
const resources = {
  en: {
    translation: en,
  },

  fa: {
    translation: fa,
  },
};
i18n
  .use(initReactI18next)
  .use(backend)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["fa", "en"],
    detection: {
      order: ["path", "cookie", "htmlTag", "localStorage", "subdomain"],
      caches: ["cookie"],
    },
    resources,
    backend: {
      loadPath: "../localization/{{lng}}/Translation.json",
    },
    react: {
      useSuspense: false,
    },
  });
export default i18n;
