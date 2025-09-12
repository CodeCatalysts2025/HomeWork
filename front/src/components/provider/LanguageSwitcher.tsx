// // src/components/LanguageSwitcher.tsx
// import React from "react";
// import { useTranslation } from "./TranslationsProvider";

// export const LanguageSwitcher = () => {
//   const { lang, setLang } = useTranslation();

//   return (
//     <div className="flex space-x-2">
//       {["en", "mn", "ja"].map((l) => (
//         <button
//           key={l}
//           onClick={() => setLang(l as any)}
//           className={`px-3 py-1 rounded ${
//             lang === l ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}>
//           {l.toUpperCase()}
//         </button>
//       ))}
//     </div>
//   );
// };
