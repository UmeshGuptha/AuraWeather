
import React, { createContext, useState, ReactNode } from 'react';
import { WeatherData } from '../types';

type Theme = 'light' | 'dark';

interface WeatherContextType {
  weatherData: WeatherData | null;
  setWeatherData: (data: WeatherData | null) => void;
  theme: Theme;
  toggleTheme: () => void;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData, theme, toggleTheme }}>
      {children}
    </WeatherContext.Provider>
  );
};
