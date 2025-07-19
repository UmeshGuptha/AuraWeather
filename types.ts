
export interface HourlyForecast {
  hour: string;
  temp: number;
  condition: string;
  weatherCode: string;
}

export interface DailyForecast {
  day: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
  weatherCode: string;
}

export interface WeatherAlert {
  title: string;
  severity: 'Low' | 'Moderate' | 'High' | 'Extreme';
  description: string;
}

export interface LifestyleIndex {
  name: 'Running' | 'Farming';
  score: number;
  description: string;
}

export interface WeatherData {
  city: string;
  country: string;
  current: {
    temp: number;
    condition: string;
    weatherCode: string;
    windSpeed: number;
    humidity: number;
    aqi: number;
    aqiCategory: string;
  };
  forecasts: {
    hourly: HourlyForecast[];
    daily: DailyForecast[];
  };
  alerts: WeatherAlert[];
  lifestyleIndices: LifestyleIndex[];
}
