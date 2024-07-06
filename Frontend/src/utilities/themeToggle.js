// src/utils/themeToggle.js
export const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
  };


  // src/utils/themeToggle.js
export const getCurrentTheme = () => {
    return document.documentElement.getAttribute('data-theme');
  };
  
  