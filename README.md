🌦️ Weather Forecast Application

A fully functional Weather Forecast Web App built using HTML, JavaScript, and Tailwind CSS.
This application allows users to check real-time weather conditions, view a 5-day forecast, and interact with a dynamic and responsive UI.

---

[GitHub Repository](https://github.com/Ankita-Das1111/WEATHER-FORECAST-APPLICATION-DEVELOPMENT)

✨ Features

- 🌍 Search weather by city name
- 📍 Get weather using current location (Geolocation API)
- 📅 5-day weather forecast
- 🌡️ Toggle between Celsius (°C) and Fahrenheit (°F)
- 🕘 Recently searched cities dropdown (using LocalStorage)
- 🌄 Dynamic background based on weather conditions (day/night support)
- ⚠️ Extreme temperature alert system
- 🎨 Glassmorphism UI with hover effects
- 📱 Fully responsive (Desktop, Tablet, Mobile)

---

🛠️ Tech Stack

- HTML5
- CSS3 + Tailwind CSS
- JavaScript (Vanilla JS)
- OpenWeatherMap API

---

🔑 API Setup

This project uses the OpenWeatherMap API.

1. Go to https://openweathermap.org/api
2. Create a free account
3. Generate your API key
4. Replace the API key in "script.js":

const apiKey = "YOUR_API_KEY";

---

📁 Project Structure

Weather/
│
├── src/
│   ├── input.css
│   └── output.css
│
├── index.html
├── script.js
├── package.json
├── package-lock.json
├── README.md
└── .gitignore

---

## 🚀 How to Run

1. Clone the repository:


[GitHub Repository](https://github.com/Ankita-Das1111/WEATHER-FORECAST-APPLICATION-DEVELOPMENT)

2. Install dependencies:

npm install

3. Generate Tailwind CSS:

npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch

4. Open "index.html" in your browser.

---

## 🌐 Live Demo
[Click here to view the app](https://ankita-das1111.github.io/WEATHER-FORECAST-APPLICATION-DEVELOPMENT/)

⚠️ Notes

- Do not upload "node_modules" (already ignored using ".gitignore")
- Ensure Tailwind CSS is compiled before running the app
- Works best with a stable internet connection for API calls

---

📌 Future Improvements

- 🌐 Add hourly forecast
- 📊 Add charts for weather trends
- 🔔 Notification system for weather alerts

---

👩‍💻 Author

Ankita-Das


Developed as part of a training project.

---

