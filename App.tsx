
import React, { useState, useEffect, useCallback } from 'react';
import { useWeather } from './hooks/useWeather';
import { fetchWeatherData } from './services/geminiService';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import WeatherAlerts from './components/WeatherAlerts';
import LifestyleIndices from './components/LifestyleIndices';
import CustomAlertModal from './components/CustomAlertModal';
import { Loader, Sun, Cloud, AlertTriangle, Search } from 'lucide-react';

const App: React.FC = () => {
  const { weatherData, setWeatherData, theme } = useWeather();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('New Delhi');
  const [searchTerm, setSearchTerm] = useState('New Delhi');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  const loadWeatherData = useCallback(async (location: string) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data. The AI might be busy, please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [setWeatherData]);

  useEffect(() => {
    loadWeatherData(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setCity(searchTerm.trim());
    }
  };

  const WelcomeScreen = () => (
    <div className="text-center p-8 flex flex-col items-center justify-center h-full animate-fadeIn">
      <div className="relative mb-6">
        <Sun className="w-24 h-24 text-yellow-400" />
        <Cloud className="w-20 h-20 text-gray-400 absolute -bottom-4 -right-4" />
      </div>
      <h2 className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary mb-2">Welcome to AuraWeather</h2>
      <p className="text-text-light-secondary dark:text-text-dark-secondary">
        Enter an Indian city to get the latest weather forecast.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen font-sans">
      <Header />
      <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <form onSubmit={handleSearch} className="w-full md:max-w-sm flex items-center bg-card-light dark:bg-card-dark rounded-full shadow-md">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for a city..."
                    className="w-full bg-transparent p-3 pl-5 rounded-full focus:outline-none text-text-light-primary dark:text-text-dark-primary"
                />
                <button type="submit" className="p-3 bg-accent-blue hover:bg-blue-600 rounded-full m-1 transition-colors">
                    <Search className="h-5 w-5 text-white" />
                </button>
            </form>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-accent-purple text-white font-semibold rounded-full hover:bg-purple-700 transition-transform transform hover:scale-105 shadow-lg"
            >
              <AlertTriangle className="h-5 w-5" />
              Create Custom Alert
            </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="w-12 h-12 animate-spin text-accent-blue" />
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg animate-fadeIn">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
            <p className="text-xl font-semibold">{error}</p>
          </div>
        ) : weatherData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
            <div className="lg:col-span-3">
              <CurrentWeather />
            </div>
            <div className="lg:col-span-3">
              <Forecast />
            </div>
            <div className="lg:col-span-3 xl:col-span-2">
              <LifestyleIndices />
            </div>
            <div className="lg:col-span-3 xl:col-span-1">
              <WeatherAlerts />
            </div>
          </div>
        ) : (
           <WelcomeScreen />
        )}
      </main>
      <CustomAlertModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
