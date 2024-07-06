// src/pages/home/home.jsx
import React from 'react';

import { toggleTheme } from '../../utilities/themeToggle';

const Lhome = () => {
  return (
    <div>
      <h1>Welcome to Payma</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default Lhome;

