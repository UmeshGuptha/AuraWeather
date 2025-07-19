
import React from 'react';
import { useWeather } from '../hooks/useWeather';
import { Sun, Cloud, CloudRain, CloudSnow, Zap, Wind, Droplets, CloudFog } from 'lucide-react';

const WeatherIcon: React.FC<{ code: string; className?: string }> = ({ code, className = "w-24 h-24" }) => {
  switch (code?.toLowerCase()) {
    case 'clear':
      return <Sun className={`${className} text-yellow-400`} />;
    case 'clouds':
      return <Cloud className={`${className} text-gray-400`} />;
    case 'rain':
      return <CloudRain className={`${className} text-blue-400`} />;
    case 'thunderstorm':
      return <Zap className={`${className} text-yellow-300`} />;
    case 'snow':
      return <CloudSnow className={`${className} text-white`} />;
    case 'mist':
    case 'fog':
      return <CloudFog className={`${className} text-gray-400`} />;
    default:
      return <Cloud className={`${className} text-gray-400`} />;
  }
};


const AQIIndicator: React.FC<{ aqi: number }> = ({ aqi }) => {
    const getAqiStyle = () => {
        if (aqi <= 50) return { color: '#4ade80', label: 'Good' }; // green-400
        if (aqi <= 100) return { color: '#facc15', label: 'Moderate' }; // yellow-400
        if (aqi <= 150) return { color: '#f97316', label: 'Unhealthy for Sensitive Groups' }; // orange-500
        if (aqi <= 200) return { color: '#f87171', label: 'Unhealthy' }; // red-400
        if (aqi <= 300) return { color: '#a855f7', label: 'Very Unhealthy' }; // purple-500
        return { color: '#7c3aed', label: 'Hazardous' }; // violet-600
    };

    const { color, label } = getAqiStyle();

    return (
        <div className="flex items-center gap-2">
            <div style={{ backgroundColor: color }} className="w-3 h-3 rounded-full"></div>
            <span className="font-bold" style={{ color }}>{aqi}</span>
            <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{label}</span>
        </div>
    );
};


const CurrentWeather: React.FC = () => {
  const { weatherData } = useWeather();

  if (!weatherData) return null;

  const { city, country, current } = weatherData;

  return (
    <div className="bg-card-light dark:bg-card-dark p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 animate-slideInUp">
      <div className="flex items-center gap-4">
        <WeatherIcon code={current.weatherCode} className="w-20 h-20 md:w-28 md:h-28" />
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary">{city}, {country}</h2>
          <p className="text-lg text-text-light-secondary dark:text-text-dark-secondary">{current.condition}</p>
          <p className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple mt-2">
            {current.temp}°C
          </p>
        </div>
      </div>
      <div className="w-full md:w-auto grid grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-4 text-lg">
        <div className="flex items-center gap-3">
          <Wind className="w-6 h-6 text-accent-blue" />
          <span className="font-semibold text-text-light-primary dark:text-text-dark-primary">{current.windSpeed} km/h</span>
        </div>
        <div className="flex items-center gap-3">
          <Droplets className="w-6 h-6 text-accent-blue" />
          <span className="font-semibold text-text-light-primary dark:text-text-dark-primary">{current.humidity}%</span>
        </div>
        <div className="flex items-center gap-3 col-span-2 md:col-span-1">
          <div className="text-sm font-bold bg-accent-blue text-white rounded-full px-2 py-0.5">AQI</div>
          <AQIIndicator aqi={current.aqi} />
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
