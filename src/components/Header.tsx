import React, { useState } from 'react';

const Header = () => {
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <header className="flex justify-between p-4 bg-blue-600 text-white">
      <div className="space-x-4">
        <button className="bg-blue-400 px-3 py-1 rounded">Food</button>
        <button className="bg-blue-400 px-3 py-1 rounded">Route</button>
        <button className="bg-blue-400 px-3 py-1 rounded">Other</button>
      </div>
      <h1 className="text-3xl font-bold underline">DMetroVerse</h1>
      <div className="flex items-center space-x-4">
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-white text-black px-3 py-1 rounded">
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="fr">French</option>
        </select>
        <button onClick={toggleTheme} className="bg-blue-400 px-3 py-1 rounded">Theme: {theme}</button>
      </div>
    </header>
  );
};

export default Header;
