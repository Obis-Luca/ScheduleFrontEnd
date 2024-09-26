import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './english/translation.json';
import frTranslation from './french/translation.json';
import esTranslation from './spanish/translation.json';
import roTranslation from './romanian/translation.json';


const languageResources = {
  en: { translation: enTranslation },
  fr: { translation: frTranslation },
  es: { translation: esTranslation },
  ro: { translation: roTranslation },
};


i18n
  .use(initReactI18next) 
  .init({
    resources: languageResources,
    lng: 'en', 
    fallbackLng: 'en', 
    ns: ['translation'], 
    compatibilityJSON: 'v3', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
