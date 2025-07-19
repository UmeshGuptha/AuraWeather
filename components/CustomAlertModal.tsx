
import React, { useState } from 'react';
import { X, Bell } from 'lucide-react';

interface CustomAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomAlertModal: React.FC<CustomAlertModalProps> = ({ isOpen, onClose }) => {
  const [condition, setCondition] = useState('temp');
  const [operator, setOperator] = useState('gt');
  const [value, setValue] = useState('35');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the rule to a backend.
    // Here we just show a confirmation message.
    console.log({ condition, operator, value });
    setSubmitted(true);
    setTimeout(() => {
        onClose();
        setSubmitted(false);
    }, 2000);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-2xl p-8 w-full max-w-md m-4 relative animate-fadeIn" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary transition-colors">
          <X size={24} />
        </button>
        
        <div className="flex items-center gap-3 mb-6">
            <div className="bg-accent-purple p-3 rounded-full">
                <Bell className="text-white" size={24}/>
            </div>
            <h2 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">Create Custom Alert</h2>
        </div>
        
        {submitted ? (
             <div className="text-center py-8">
                <p className="text-lg font-semibold text-green-500">Alert created successfully!</p>
                <p className="text-text-light-secondary dark:text-text-dark-secondary">We'll notify you when the condition is met.</p>
             </div>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-1">Notify me when...</label>
              <select
                id="condition"
                value={condition}
                onChange={e => setCondition(e.target.value)}
                className="w-full p-3 bg-bkg-light dark:bg-bkg-dark border-gray-300 dark:border-gray-600 rounded-lg focus:ring-accent-blue focus:border-accent-blue text-text-light-primary dark:text-text-dark-primary"
              >
                <option value="temp">Temperature</option>
                <option value="aqi">AQI</option>
                <option value="wind">Wind Speed</option>
              </select>
            </div>
  
            <div className="flex gap-4 items-end">
                <div className="flex-1">
                    <label htmlFor="operator" className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-1">Is...</label>
                    <select
                        id="operator"
                        value={operator}
                        onChange={e => setOperator(e.target.value)}
                        className="w-full p-3 bg-bkg-light dark:bg-bkg-dark border-gray-300 dark:border-gray-600 rounded-lg focus:ring-accent-blue focus:border-accent-blue text-text-light-primary dark:text-text-dark-primary"
                    >
                        <option value="gt">Greater than</option>
                        <option value="lt">Less than</option>
                    </select>
                </div>
                <div className="flex-1">
                     <label htmlFor="value" className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-1">Value...</label>
                    <input
                        type="number"
                        id="value"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        className="w-full p-3 bg-bkg-light dark:bg-bkg-dark border-gray-300 dark:border-gray-600 rounded-lg focus:ring-accent-blue focus:border-accent-blue text-text-light-primary dark:text-text-dark-primary"
                    />
                </div>
            </div>
  
            <button type="submit" className="w-full bg-accent-purple text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105 shadow-lg">
              Set Alert
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CustomAlertModal;
