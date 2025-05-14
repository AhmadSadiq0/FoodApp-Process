import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentLanguage, changeLanguage } from '../components/i18n';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    loadInitialLanguage();
  }, []);

  const loadInitialLanguage = async () => {
    const lang = await getCurrentLanguage();
    setCurrentLang(lang);
  };

  const switchLanguage = async (language) => {
    await changeLanguage(language);
    setCurrentLang(language);
  };

  return (
    <LanguageContext.Provider value={{ currentLang, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 