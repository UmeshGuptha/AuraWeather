
import React from 'react';
import { useWeather } from '../hooks/useWeather';
import { AlertTriangle, ShieldCheck, CloudLightning, Sun } from 'lucide-react';

const SeverityIcon: React.FC<{ severity: string }> = ({ severity }) => {
    const baseClass = "w-6 h-6 mr-3 flex-shrink-0";
    switch (severity) {
        case 'High':
        case 'Extreme':
            return <AlertTriangle className={`${baseClass} text-red-500`} />;
        case 'Moderate':
            return <CloudLightning className={`${baseClass} text-yellow-500`} />;
        case 'Low':
            return <Sun className={`${baseClass} text-green-500`} />;
        default:
            return <ShieldCheck className={`${baseClass} text-gray-500`} />;
    }
};

const WeatherAlerts: React.FC = () => {
  const { weatherData } = useWeather();

  if (!weatherData || !weatherData.alerts.length) {
    return (
        <div className="bg-card-light dark:bg-card-dark p-6 rounded-2xl shadow-lg h-full flex flex-col justify-center items-center animate-slideInUp" style={{animationDelay: '200ms'}}>
            <ShieldCheck className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-1">No Alerts</h3>
            <p className="text-text-light-secondary dark:text-text-dark-secondary text-center">It's all clear for now!</p>
        </div>
    );
  }

  return (
    <div className="bg-card-light dark:bg-card-dark p-6 rounded-2xl shadow-lg h-full animate-slideInUp" style={{animationDelay: '200ms'}}>
      <h3 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-4">Weather Alerts</h3>
      <ul className="space-y-4">
        {weatherData.alerts.map((alert, index) => (
          <li key={index} className="flex items-start p-4 bg-bkg-light dark:bg-bkg-dark rounded-lg">
            <SeverityIcon severity={alert.severity} />
            <div>
              <h4 className="font-semibold text-text-light-primary dark:text-text-dark-primary">{alert.title}</h4>
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{alert.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherAlerts;
