// // src/providers/TranslationsProvider.tsx
// import React, { createContext, useContext, useState, ReactNode } from "react";
// import translations from "../../../translations_multilang.json"; 

// type Lang = "en" | "mn" | "ja";
// type Translations = typeof translations;

// interface TranslationContextType {
//   lang: Lang;
//   setLang: (lang: Lang) => void;
//   t: (key: string) => string;
// }

// const TranslationContext = createContext<TranslationContextType | undefined>(
//   undefined
// );

// export const TranslationsProvider = ({ children }: { children: ReactNode }) => {
//   const [lang, setLang] = useState<Lang>("en");

//   const t = (key: keyof Translations | string) => {
//     if (Object.prototype.hasOwnProperty.call(translations, key)) {
//       return translations[key]?.[lang] || translations[key]?.en || key;
//     }
//     return key;
//   };

//   return (
//     <TranslationContext.Provider value={{ lang, setLang, t }}>
//       {children}
//     </TranslationContext.Provider>
//   );
// };

// // Hook ашиглах
// export const useTranslation = () => {
//   const context = useContext(TranslationContext);
//   if (!context)
//     throw new Error(
//       "useTranslation must be used within a TranslationsProvider"
//     );
//   return context;
// };
