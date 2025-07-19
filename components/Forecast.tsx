
import React, { useState } from 'react';
import { useWeather } from '../hooks/useWeather';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Sun, Cloud, CloudRain, CloudSnow, Zap, CloudFog } from 'lucide-react';

const TinyWeatherIcon: React.FC<{ code: string; className?: string }> = ({ code, className = "w-5 h-5" }) => {
    switch (code?.toLowerCase()) {
      case 'clear': return <Sun className={`${className} text-yellow-500`} />;
      case 'clouds': return <Cloud className={`${className} text-gray-500`} />;
      case 'rain': return <CloudRain className={`${className} text-blue-500`} />;
      case 'thunderstorm': return <Zap className={`${className} text-yellow-400`} />;
      case 'snow': return <CloudSnow className={`${className} text-blue-200`} />;
      case 'mist': case 'fog': return <CloudFog className={`${className} text-gray-500`} />;
      default: return <Cloud className={`${className} text-gray-500`} />;
    }
  };

const Forecast: React.FC = () => {
  const { weatherData, theme } = useWeather();
  const [activeTab, setActiveTab] = useState<'hourly' | 'daily'>('hourly');

  if (!weatherData) return null;

  const { hourly, daily } = weatherData.forecasts;
  const textColor = theme === 'dark' ? '#A0AEC0' : '#4A5568';
  const gridColor = theme === 'dark' ? '#2d3748' : '#e2e8f0';

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card-light dark:bg-card-dark p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
           <p className="label font-bold text-text-light-primary dark:text-text-dark-primary">{`${label}`}</p>
          {data.temp && <p className="intro text-accent-blue">{`Temp: ${data.temp}°C`}</p>}
          {data.maxTemp && <p className="intro text-red-500">{`Max: ${data.maxTemp}°C`}</p>}
          {data.minTemp && <p className="intro text-blue-500">{`Min: ${data.minTemp}°C`}</p>}
           <div className="flex items-center gap-2 mt-1">
             <TinyWeatherIcon code={data.weatherCode} />
             <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{data.condition}</p>
           </div>
        </div>
      );
    }
    return null;
  };
  

  return (
    <div className="bg-card-light dark:bg-card-dark p-4 sm:p-6 rounded-2xl shadow-lg animate-slideInUp" style={{animationDelay: '100ms'}}>
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <button
          onClick={() => setActiveTab('hourly')}
          className={`px-4 py-2 font-semibold transition-colors ${activeTab === 'hourly' ? 'border-b-2 border-accent-blue text-accent-blue' : 'text-text-light-secondary dark:text-text-dark-secondary'}`}
        >
          48-Hour Forecast
        </button>
        <button
          onClick={() => setActiveTab('daily')}
          className={`px-4 py-2 font-semibold transition-colors ${activeTab === 'daily' ? 'border-b-2 border-accent-blue text-accent-blue' : 'text-text-light-secondary dark:text-text-dark-secondary'}`}
        >
          7-Day Forecast
        </button>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer>
          {activeTab === 'hourly' ? (
            <LineChart data={hourly} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="hour" tick={{ fill: textColor }} />
              <YAxis tick={{ fill: textColor }} unit="°C" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="temp" name="Temperature" stroke="#4299E1" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </LineChart>
          ) : (
            <LineChart data={daily} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="day" tick={{ fill: textColor }} />
              <YAxis tick={{ fill: textColor }} unit="°C" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="maxTemp" name="Max Temp" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="minTemp" name="Min Temp" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Forecast;
