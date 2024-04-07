
import React, {createContext, useState, useContext, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguageContext = createContext();

export const useLanguage = () => {
    return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language);

    const changeLanguage = async (newLanguage) => {
        setLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
        await AsyncStorage.setItem('language', newLanguage);
    };

    useEffect(() => {
        const loadLanguage = async () => {
            const savedLanguage = await AsyncStorage.getItem('language');
            if (savedLanguage) {
                setLanguage(savedLanguage);
                i18n.changeLanguage(savedLanguage);
            }
        };
        loadLanguage();
    }, []);

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
