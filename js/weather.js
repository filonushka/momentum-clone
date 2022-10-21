export { prepareWeatherWidget };

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?lang=en&appid=04f828321cbd374ed321a266c0dbd698&units=metric&q=";
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const cityInput = document.querySelector(".city");

function prepareWeatherWidget() {
  cityInput.addEventListener("change", storeCityName);
  document.addEventListener("DOMContentLoaded", updateWeather);
  cityInput.addEventListener("keydown", handleCityChange);

  restoreCityName();
  updateWeather();
}

async function updateWeather() {
  const city = cityInput.value;

  if (!city) return;

  const weatherData = await getWeather(city);

  showWeather(weatherData);
}

async function getWeather(city) {
  const response = await fetch(apiUrl + city);

  return response.json();
}

function showWeather(data) {
  const {
    main: { temp },
    weather: [{ icon, description }],
  } = data;

  temperature.textContent = `${Math.round(temp)}°C`;
  weatherDescription.textContent = description;
  weatherIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
}

function handleCityChange(event) {
  if (event.code === "Enter") {
    updateWeather();
    cityInput.blur();
  }
}

function restoreCityName() {
  const city = localStorage.getItem("city");

  if (city) {
    cityInput.value = city;
  }
}

function storeCityName() {
  localStorage.setItem("city", cityInput.value);
}
