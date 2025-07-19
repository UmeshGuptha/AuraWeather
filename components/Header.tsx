
import React from 'react';
import { useWeather } from '../hooks/useWeather';
import { Sun, Moon, Zap } from 'lucide-react';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useWeather();

  return (
    <header className="bg-card-light dark:bg-card-dark p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
           <div className="bg-gradient-to-r from-accent-purple to-accent-blue p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
           </div>
          <h1 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
            AuraWeather
          </h1>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-text-light-secondary dark:text-text-dark-secondary bg-bkg-light dark:bg-bkg-dark hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
