// API KEY 

const apiKey = "24197bb9ae8cc4cfdde3ee3cf3e39d75";

// STORE LAST SEARCHED CITIES (LOCALSTORAGE)

let history = JSON.parse(localStorage.getItem("cities")) || [];

// TOGGLE STATE
let isCelsius = true;

// DOM ELEMENTS

const dropdown = document.getElementById("dropdown");
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const locationBtn = document.getElementById("locationBtn");


const cBtn = document.getElementById("celsius");
const fBtn = document.getElementById("fahrenheit");

// EVENT LISTENERS


searchBtn.addEventListener("click", getWeather);


locationBtn.addEventListener("click", getLocationWeather);


cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather();
});

cityInput.addEventListener("input", () => {
  const value = cityInput.value.trim();

  if (value.length < 2) {
    showDropdown();
  } else {
    fetchSuggestions(value);
  }
});

cityInput.addEventListener("focus", showDropdown);

document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-wrapper")) {
    dropdown.style.display = "none";
  }
});

// TEMPERATURE TOGGLE EVENTS
cBtn.addEventListener("click", () => {
  isCelsius = true;
  cBtn.classList.add("active");
  fBtn.classList.remove("active");
  getWeather();
});

fBtn.addEventListener("click", () => {
  isCelsius = false;
  fBtn.classList.add("active");
  cBtn.classList.remove("active");
  getWeather();
});

//  TEMP CONVERTER
function convertTemp(temp) {
  return isCelsius ? temp : (temp * 9/5) + 32;
}


// FETCH WEATHER BY CITY
async function getWeather() {
  const error = document.getElementById("error");
  const city = cityInput.value.trim().toLowerCase();

  if (!city) {
    error.innerText = "Please enter a city";
    return;
  }

  error.innerText = "";
  dropdown.style.display = "none";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!res.ok) throw new Error();

    const data = await res.json();

    displayWeather(data);
    changeBackground(data.weather[0].main, data);
    getForecast(data.name);
    saveCity(data.name);

  } catch {
    error.innerText = "City not found";
  }

}

// FETCH WEATHER BY LOCATION

async function getLocationWeather() {
  const error = document.getElementById("error");

  if (!navigator.geolocation) {
    error.innerText = "Geolocation not supported";
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    try {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );

      if (!res.ok) throw new Error();

      const data = await res.json();

      cityInput.value = data.name;

      displayWeather(data);
      changeBackground(data.weather[0].main, data);
      getForecast(data.name);
      saveCity(data.name);

    } catch {
      error.innerText = "Unable to fetch location weather";
    }
  }, () => {
    error.innerText = "Location permission denied";
  });
}



// DISPLAY CURRENT WEATHER DATA

function displayWeather(data) {
  const dateObj = new Date();

  document.getElementById("city").innerText =
    `${data.name}, ${data.sys.country}`;

  document.getElementById("temp").innerText =
    Math.round(convertTemp(data.main.temp)) + "°" + (isCelsius ? "C" : "F");

    if (isCelsius && data.main.temp > 40) {
  error.innerText = "⚠️ Extreme Heat Alert (>40°C)";
} else {
  error.innerText = "";
}
  document.getElementById("desc").innerText =
    data.weather[0].description;

  document.getElementById("date").innerText =
    dateObj.toDateString();

  document.getElementById("wind").innerText =
    data.wind.speed + " m/s";

  document.getElementById("humidity").innerText =
    data.main.humidity + "%";

  document.getElementById("pressure").innerText =
    data.main.pressure + " hPa";

  document.getElementById("visibility").innerText =
    (data.visibility / 1000) + " km";

  document.getElementById("feelsLike").innerText =
  Math.round(convertTemp(data.main.feels_like)) + "°" + (isCelsius ? "C" : "F");  

  document.getElementById("sunrise").innerText =
    new Date(data.sys.sunrise * 1000).toLocaleTimeString();

  document.getElementById("sunset").innerText =
    new Date(data.sys.sunset * 1000).toLocaleTimeString();

  setWeatherIcon(data.weather[0].main, data);
}


// SET WEATHER ICON (DAY/NIGHT)
function setWeatherIcon(weather, data) {
  const icon = document.getElementById("icon");

  const now = data.dt * 1000;
  const sunrise = data.sys.sunrise * 1000;
  const sunset = data.sys.sunset * 1000;

  const isDay = now > sunrise && now < sunset;

  if (weather === "Rain") icon.innerHTML = "🌧";
  else if (weather === "Clouds") icon.innerHTML = isDay ? "⛅" : "☁️";
  else if (weather === "Clear") icon.innerHTML = isDay ? "🌞" : "🌙";
  else if (weather === "Snow") icon.innerHTML = "❄️";
  else if (weather === "Thunderstorm") icon.innerHTML = "⚡";
  else if (
  weather === "Mist" ||
  weather === "Fog" ||
  weather === "Haze" ||
  weather === "Smoke"
 ) {
  icon.innerHTML = "🌫️";
 }
  else icon.innerHTML = isDay ? "🌤" : "🌙";
}


// CHANGE BACKGROUND (DAY/NIGHT)
function changeBackground(weather, data) {
  const body = document.body;

  const now = data.dt * 1000;
  const sunrise = data.sys.sunrise * 1000;
  const sunset = data.sys.sunset * 1000;

  const isDay = now > sunrise && now < sunset;

  if (weather === "Clear") {
    body.style.backgroundImage = isDay
      ? "url('https://images.pexels.com/photos/30261421/pexels-photo-30261421.jpeg')"
      : "url('https://images.pexels.com/photos/30104206/pexels-photo-30104206.jpeg')";
  }
  else if (weather === "Clouds") {
    body.style.backgroundImage = isDay
      ? "url('https://images.pexels.com/photos/12833881/pexels-photo-12833881.jpeg')"
      : "url('https://images.pexels.com/photos/4203094/pexels-photo-4203094.jpeg')";
  }
  else if (weather === "Rain") {
    body.style.backgroundImage =
      "url('https://images.pexels.com/photos/1463530/pexels-photo-1463530.jpeg')";
  }
  else if (weather.includes("Snow")) {
    body.style.backgroundImage =
      "url('https://images.pexels.com/photos/7473711/pexels-photo-7473711.jpeg')";
  }
  else if (
  weather === "Mist" ||
  weather === "Fog" ||
  weather === "Haze" ||
  weather === "Smoke"
 ) 
 {
  body.style.backgroundImage =
  "url('https://images.pexels.com/photos/6494669/pexels-photo-6494669.jpeg')";
 }
  else {
    body.style.backgroundImage =
      "url('https://images.pexels.com/photos/9841946/pexels-photo-9841946.jpeg')";
  }
}


// 🌤️ FORECAST ICON
function getWeatherIcon(weather) {
  if (weather === "Clouds") return "☁️";
  if (weather === "Clear") return "☀️";
  if (weather === "Rain") return "🌧️";
  if (weather === "Snow") return "❄️";
  if (weather === "Thunderstorm") return "⚡";
  if (["Mist","Fog","Haze","Smoke"].includes(weather)) return "🌫️";
  return "🌤️";
}


// FETCH 5-DAY FORECAST
async function getForecast(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  );

  const data = await res.json();
  const forecastDiv = document.getElementById("forecastList");

  forecastDiv.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const item = data.list[i * 8];

    const date = new Date(item.dt_txt);

    const day =
      i === 0
        ? "Today"
        : date.toLocaleDateString("en-US", { weekday: "short" });

    const weather = item.weather[0].main;
    const description = item.weather[0].description;
    const icon = getWeatherIcon(weather);

    const temp = Math.round(convertTemp(item.main.temp));

    const div = document.createElement("div");
    div.classList.add("forecast-card");

    div.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <span style="font-size:20px;">${icon}</span>
        <div>
          <p>${day}</p>
          <small>${description}</small>
        </div>
      </div>
      <span>${temp}°${isCelsius ? "C" : "F"}</span>
    `;

    forecastDiv.appendChild(div);
  }
}


// SUGGESTIONS + HISTORY (UNCHANGED)
async function fetchSuggestions(query) {
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
  );

  const data = await res.json();

  dropdown.innerHTML = "";

  data.forEach(place => {
    const item = document.createElement("div");
    item.innerText = `${capitalizeWords(place.name)}, ${place.country}`;
    item.classList.add("dropdown-item");

    item.addEventListener("click", () => {
      cityInput.value = place.name;
      getWeather();
      dropdown.style.display = "none";
    });

    dropdown.appendChild(item);
  });

  dropdown.style.display = "block";
}

function capitalizeWords(str) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

function saveCity(city) {
  if (!history.includes(city)) {
    history.unshift(city);
    if (history.length > 5) history.pop();
    localStorage.setItem("cities", JSON.stringify(history));
  }
}

function showDropdown() {
  dropdown.innerHTML = "";

  history.forEach(city => {
    const item = document.createElement("div");
    item.innerText = city;
    item.classList.add("dropdown-item");

    item.addEventListener("click", () => {
      cityInput.value = city;
      getWeather();
    });

    dropdown.appendChild(item);
  });

  dropdown.style.display = "block";
}


// DEFAULT
window.onload = () => {
  cityInput.value = "Mumbai";
  getWeather();
};
