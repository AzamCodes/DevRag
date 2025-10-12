// 'use client';

// import React, { createContext, useContext, useEffect, useState } from 'react';

// type DarkModeContextType = {
//   darkMode: boolean;
//   toggleDarkMode: () => void;
// };

// export const DarkModeContext = createContext<DarkModeContextType>({
//   darkMode: false,
//   toggleDarkMode: () => {},
// });

// export default function DarkModeProvider({
//   children,
//   initialDarkMode,
// }: {
//   children: React.ReactNode;
//   initialDarkMode: boolean;
// }) {
//   const [darkMode, setDarkMode] = useState(initialDarkMode);

//   // Sync dark mode with cookie and apply to DOM
//   useEffect(() => {
//     // Apply the dark mode class to the <html> element
//     document.documentElement.classList.toggle('dark', darkMode);
//     // Update the cookie
//     document.cookie = `darkMode=${darkMode}; path=/; max-age=31536000`;
//   }, [darkMode]);

//   const toggleDarkMode = () => {
//     setDarkMode((prev) => !prev);
//   };

//   return (
//     <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// }
// 'use client';

// import React, { createContext, useContext, useEffect, useState } from 'react';

// type DarkModeContextType = {
//   darkMode: boolean;
//   toggleDarkMode: () => void;
// };

// export const DarkModeContext = createContext<DarkModeContextType>({
//   darkMode: true, // Default to dark mode
//   toggleDarkMode: () => {},
// });

// export default function DarkModeProvider({
//   children,
//   initialDarkMode,
// }: {
//   children: React.ReactNode;
//   initialDarkMode: boolean;
// }) {
//   const [darkMode, setDarkMode] = useState(initialDarkMode);

//   // Sync dark mode with cookie and apply to DOM
//   useEffect(() => {
//     console.log('DarkModeProvider: darkMode =', darkMode);
//     // Apply the dark mode class to the <html> element
//     document.documentElement.classList.toggle('dark', darkMode);
//     // Update the cookie
//     document.cookie = `darkMode=${darkMode}; path=/; max-age=31536000`;
//   }, [darkMode]);

//   const toggleDarkMode = () => {
//     setDarkMode((prev) => {
//       const newMode = !prev;
//       console.log('DarkModeProvider: Toggling darkMode to:', newMode);
//       return newMode;
//     });
//   };

//   return (
//     <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// }

// components/DarkModeProvider.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type DarkModeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export default function DarkModeProvider({
  children,
  initialDarkMode = false,
}: {
  children: React.ReactNode;
  initialDarkMode?: boolean;
}) {
  const [darkMode, setDarkMode] = useState(initialDarkMode);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark');
      console.log('DarkModeProvider: Initial mount, document dark class:', isDark, 'initialDarkMode:', initialDarkMode);
      setDarkMode(isDark || initialDarkMode);
    }
  }, [initialDarkMode]);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      console.log('DarkModeProvider: Applying dark class:', darkMode);
      document.documentElement.classList.toggle('dark', darkMode);
      document.cookie = `darkMode=${darkMode}; path=/; max-age=31536000`;
      console.log('DarkModeProvider: Cookie set:', document.cookie);
    }
  }, [darkMode, isMounted]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (!document.cookie.match(/darkMode=/)) {
        console.log('DarkModeProvider: System preference changed, setting darkMode:', mediaQuery.matches);
        setDarkMode(mediaQuery.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isMounted]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      console.log('DarkModeProvider: Toggling darkMode to:', newMode);
      return newMode;
    });
  };

  if (!isMounted) {
    console.log('DarkModeProvider: Not mounted, skipping render');
    return null;
  }

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}