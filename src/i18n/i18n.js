import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import hr from "./hr.json";

const fallbackLng = "hr";

i18n.use(initReactI18next).init({
  debug: false,
  resources: {
    hr: {
      translations: hr,
    },
  },
  fallbackLng: fallbackLng,
  ns: ["translations"],
  defaultNS: "translations",
  fallbackNS: "translations",
  keySeparator: ".",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

const dateFormats = {
  hr: {
    date: "DD.MM.YYYY",
    dateTime: "DD.MM.YYYY HH:MM",
  },
  en: {
    date: "DD/MM/YYYY",
    dateTime: "DD/MM/YYYY HH:MM",
  },
};

export const getDateFormat = () => {
  return (dateFormats[i18n.language || fallbackLng] || dateFormats[fallbackLng])
    .date;
};

export const getDateTimeFormat = () => {
  return (dateFormats[i18n.language || fallbackLng] || dateFormats[fallbackLng])
    .dateTime;
};
