
import React from 'react';
import { useWeather } from '../hooks/useWeather';
import { Running, Tractor } from './icons/CustomIcons';

const IndexIcon: React.FC<{ name: string }> = ({ name }) => {
    const baseClass = "w-8 h-8";
    switch(name) {
        case 'Running':
            return <Running className={`${baseClass} text-accent-blue`} />;
        case 'Farming':
            return <Tractor className={`${baseClass} text-accent-purple`} />;
        default:
            return null;
    }
};

const ScoreBar: React.FC<{ score: number }> = ({ score }) => {
    const percentage = score * 10;
    let bgColor = 'bg-green-500';
    if (score < 4) bgColor = 'bg-red-500';
    else if (score < 7) bgColor = 'bg-yellow-500';

    return (
        <div className="w-full bg-bkg-light dark:bg-bkg-dark rounded-full h-2.5">
            <div className={`${bgColor} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
    );
};

const LifestyleIndices: React.FC = () => {
  const { weatherData } = useWeather();

  if (!weatherData || !weatherData.lifestyleIndices.length) return null;

  return (
    <div className="bg-card-light dark:bg-card-dark p-6 rounded-2xl shadow-lg h-full animate-slideInUp" style={{animationDelay: '300ms'}}>
      <h3 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary mb-4">Lifestyle Indices</h3>
      <div className="space-y-6">
        {weatherData.lifestyleIndices.map((index) => (
          <div key={index.name}>
             <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <IndexIcon name={index.name} />
                    <h4 className="text-lg font-semibold text-text-light-primary dark:text-text-dark-primary">{index.name} Condition</h4>
                </div>
                <span className="font-bold text-xl text-text-light-primary dark:text-text-dark-primary">{index.score}/10</span>
             </div>
            <ScoreBar score={index.score} />
            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mt-2">{index.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LifestyleIndices;
