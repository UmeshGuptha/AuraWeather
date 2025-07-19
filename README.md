# ⚡ AuraWeather

> A modern, AI-powered weather forecasting web application delivering **real-time temperature**, **AQI**, **detailed forecasts**, and **lifestyle indices** for Indian cities.

![AuraWeather Preview](./public/preview.png) <!-- Replace with actual screenshot path -->

---

## 📚 Table of Contents

- [🌟 Key Features](#-key-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
  - [🔧 Prerequisites](#-prerequisites)
  - [📦 Installation](#-installation)
  - [🔐 Environment Variables](#-environment-variables)
- [📁 Project Structure](#-project-structure)
- [📝 License](#-license)
- [🙏 Acknowledgements](#-acknowledgements)

---

## 🌟 Key Features

✅ **Dynamic Weather Data**  
Fetches real-time weather information for any Indian city with a responsive search system.

🧠 **AI-Powered Forecasting**  
Integrates with **Google Gemini API** to simulate realistic and personalized weather data.

📊 **Comprehensive Forecasts**
- 48-hour hourly forecast with interactive graphs
- 7-day daily forecast trend
- Temperature, humidity, wind, and pressure data

🌫️ **Air Quality Index (AQI)**  
Color-coded display with severity levels (based on Indian AQI standards).

🚨 **Weather Alerts**
- Displays IMD-style alerts for conditions like heatwaves or poor air quality
- Shows prominent warnings directly on the dashboard

🔔 **Custom Alert Modal**  
Users can set mock personal alert rules — e.g., "Notify me when AQI > 300".

🌾 **Lifestyle Indices**  
Advises suitability for activities like **Running**, **Farming**, and **Travel**, based on real-time data.

🎨 **Responsive UI**  
Clean, minimal, and fully responsive design with Tailwind CSS.

🌗 **Light/Dark Mode**  
Toggle support for both light and dark themes with persistent preference.

---

## 🛠️ Tech Stack

| Category      | Tech Stack                                                                 |
|---------------|------------------------------------------------------------------------------|
| 🎨 Frontend    | [React](https://reactjs.org/) • [TypeScript](https://www.typescriptlang.org/) |
| 💅 Styling     | [Tailwind CSS](https://tailwindcss.com/)                                    |
| 🤖 AI          | [Google Gemini API](https://ai.google.dev/gemini-api)                       |
| 📈 Charts      | [Recharts](https://recharts.org/en-US/)                                     |
| 🎯 Icons       | [Lucide React](https://lucide.dev/)                                         |
| ⚡ Build Tool  | [Vite](https://vitejs.dev/)                                                  |

---

## 🚀 Getting Started

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/en/) v18.x or later
- npm or yarn

---

### 📦 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/UmeshGuptha/AuraWeather.git
   cd AuraWeather
Install Dependencies

bash
Copy code
npm install
# OR
yarn install
Configure Environment Variables
Create a .env file in the root directory:

bash
Copy code
touch .env
Add the Google Gemini API Key
Inside .env, add:

env
Copy code
VITE_API_KEY="YOUR_GEMINI_API_KEY"
Replace "YOUR_GEMINI_API_KEY" with your actual key from Google AI Studio.

Start the Development Server

bash
Copy code
npm run dev
# OR
yarn dev
Open in Browser
Navigate to: http://localhost:5173

🌍 Environment Variables
The app uses Vite, so environment variables must be prefixed with VITE_.

env
Copy code
VITE_API_KEY="YOUR_GEMINI_API_KEY"
This variable is used in services/geminiService.ts and accessed via import.meta.env.VITE_API_KEY.

📁 Project Structure
php
Copy code
/
├── public/               # Static assets (favicon, preview images, etc.)
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── CurrentWeather.tsx
│   │   ├── Forecast.tsx
│   │   ├── Header.tsx
│   │   └── ...
│   ├── context/          # Global state with React Context API
│   │   └── WeatherContext.tsx
│   ├── hooks/            # Custom hooks
│   │   └── useWeather.ts
│   ├── services/         # External API communication
│   │   └── geminiService.ts
│   ├── App.tsx           # App wrapper and router
│   ├── index.tsx         # Main entry point
│   └── types.ts          # TypeScript interfaces/types
├── .gitignore
├── index.html
├── package.json
└── README.md
📝 License
This project is licensed under the MIT License.
See the LICENSE file for details.

🙏 Acknowledgements
🔗 Google Gemini API – For AI-powered weather data generation

📈 Recharts – Chart rendering

🎨 Lucide Icons – Minimal open-source icons

💨 Tailwind CSS – Utility-first CSS framework

🌐 Vite – Lightning-fast dev server

Contributions and feedback welcome! Feel free to open issues or submit pull requests.
Made with ❤️ in 🇮🇳

yaml
Copy code

---

Let me know if you'd like:
- A **sample `geminiService.ts`** file with API integration logic
- A **preview image template** for the `![AuraWeather Preview]()` section
- **Badges** (version, license, build status, etc.) at the top of README

Would also recommend linking a **live deployment (e.g., Vercel, Netlify)** when ready!
