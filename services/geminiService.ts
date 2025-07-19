
import { GoogleGenAI, Type } from "@google/genai";
import { WeatherData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const weatherSchema = {
    type: Type.OBJECT,
    properties: {
        city: { type: Type.STRING },
        country: { type: Type.STRING },
        current: {
            type: Type.OBJECT,
            properties: {
                temp: { type: Type.INTEGER },
                condition: { type: Type.STRING },
                weatherCode: { type: Type.STRING, description: "A simple code like 'clear', 'clouds', 'rain', 'thunderstorm', 'snow', 'mist'" },
                windSpeed: { type: Type.INTEGER },
                humidity: { type: Type.INTEGER },
                aqi: { type: Type.INTEGER },
                aqiCategory: { type: Type.STRING, description: "e.g., Good, Moderate, Unhealthy" },
            },
            required: ['temp', 'condition', 'weatherCode', 'windSpeed', 'humidity', 'aqi', 'aqiCategory']
        },
        forecasts: {
            type: Type.OBJECT,
            properties: {
                hourly: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            hour: { type: Type.STRING, description: "e.g., '3 PM'" },
                            temp: { type: Type.INTEGER },
                            condition: { type: Type.STRING },
                            weatherCode: { type: Type.STRING },
                        },
                        required: ['hour', 'temp', 'condition', 'weatherCode']
                    }
                },
                daily: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            day: { type: Type.STRING, description: "e.g., 'Mon', 'Tue'" },
                            minTemp: { type: Type.INTEGER },
                            maxTemp: { type: Type.INTEGER },
                            condition: { type: Type.STRING },
                            weatherCode: { type: Type.STRING },
                        },
                        required: ['day', 'minTemp', 'maxTemp', 'condition', 'weatherCode']
                    }
                },
            },
            required: ['hourly', 'daily']
        },
        alerts: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    severity: { type: Type.STRING, enum: ['Low', 'Moderate', 'High', 'Extreme'] },
                    description: { type: Type.STRING },
                },
                required: ['title', 'severity', 'description']
            }
        },
        lifestyleIndices: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, enum: ['Running', 'Farming'] },
                    score: { type: Type.INTEGER, description: "A score from 1 to 10" },
                    description: { type: Type.STRING },
                },
                required: ['name', 'score', 'description']
            }
        },
    },
    required: ['city', 'country', 'current', 'forecasts', 'alerts', 'lifestyleIndices']
};


export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  const prompt = `
    You are a weather data API. For the city of ${city}, India, provide a complete weather forecast in a valid JSON format that adheres to the provided schema.
    - Generate realistic but fictional data.
    - The hourly forecast should cover the next 48 hours, but only return 12 representative hourly points (e.g., every 4 hours).
    - The daily forecast should cover the next 15 days, but only return 7 representative daily points.
    - Include at least one fictional weather alert (e.g., 'High AQI warning' or 'Heatwave expected'). If conditions are perfect, create an alert like 'Perfect Weather Day' with 'Low' severity.
    - Include lifestyle index scores for 'Running' and 'Farming' on a scale of 1 to 10 with a brief justification.
  `;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: weatherSchema,
        },
    });

    const jsonText = response.text.trim();
    const data = JSON.parse(jsonText) as WeatherData;
    
    // Ensure arrays have the expected length
    data.forecasts.hourly = data.forecasts.hourly.slice(0, 12);
    data.forecasts.daily = data.forecasts.daily.slice(0, 7);


    return data;
  } catch (error) {
    console.error("Error fetching or parsing weather data from Gemini API:", error);
    throw new Error("Failed to get weather data from AI. Please try again later.");
  }
};
