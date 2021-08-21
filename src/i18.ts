import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./i18n/en-US.json";
import korean from "./i18n/ko-KR.json";

const resources = { english: english, korean: korean };

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "english", // Would need state saved to server / cache for reload
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
