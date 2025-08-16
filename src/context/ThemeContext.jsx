import { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext.js';

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('theme') || 'blue';
  });

  const themes = ['blue', 'red', 'green'];

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
  };

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    changeTheme(themes[nextIndex]);
  };

  useEffect(() => {
    document.body.className = '';
    if (currentTheme !== 'blue') {
      document.body.classList.add(`theme-${currentTheme}`);
    }
  }, [currentTheme]);

  const value = {
    currentTheme,
    changeTheme,
    toggleTheme,
    themes
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
