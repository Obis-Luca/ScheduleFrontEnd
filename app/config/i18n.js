// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "./translations.json"; // Import translations JSON file

i18n
    .use(initReactI18next)
    .init({
        resources: translations,
        lng: "en",
        fallbackLng: "en",
        ns: ["translations"],
        defaultNS: "translations",
        keySeparator: false,
        interpolation: {
            escapeValue: false,
            formatSeparator: ","
        },
        react: {
                useSuspense: false       }
    });

export default i18n;
