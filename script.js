const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const nameDiv = document.querySelector(".name");
const slideNextBtn = document.querySelector(".slide-next");
const slidePrevBtn = document.querySelector(".slide-prev");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const cityInput = document.querySelector(".city");
const quote = document.querySelector(".quote");
const quoteAuthor = document.querySelector(".quote-author");
const changeQuoteBtn = document.querySelector(".change-quote__button");

let bgIndex = getRandomNum(1, 7);
let quoteIndex = getRandomNum(0, 102);

cityInput.addEventListener("change", storeUserData);
nameDiv.addEventListener("change", storeUserData);
nameDiv.addEventListener("focus", handleNameFocus);
nameDiv.addEventListener("blur", handleNameBlur);
nameDiv.addEventListener("keydown", handleNameEnter);
changeQuoteBtn.addEventListener("click", changeQuote);

restoreUserData();
handleNameBlur();
updateWeather();

setInterval(update, 100);
setBg();

function update() {
  showTime();
  showDate();
  showGreeting();
}

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
}

function showDate() {
  const newDate = new Date();
  const options = {
    month: "long",
    day: "numeric",
  };
  const currentDate = newDate.toLocaleDateString("en-US", options);
  date.textContent = currentDate;
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  greeting.textContent = greetingText + ", ";
}
function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  const arr = ["night", "morning", "afternoon", "evening"];
  const num = Math.floor(hours / 6);
  return arr[num];
}

function setBg() {
  const bgNum = bgIndex.toString().padStart(2, "0");
  const timeOfDay = getTimeOfDay();
  document.body.style.backgroundImage = `url("./assets/images/${timeOfDay}/${bgNum}.jpg")`;
  // console.log(randomNum, timeOfDay, bgNum);
}

slideNextBtn.addEventListener("click", showNextSlide);
slidePrevBtn.addEventListener("click", showPrevSlide);

function showNextSlide() {
  bgIndex = (bgIndex % 6) + 1;
  setBg();
}

function showPrevSlide() {
  bgIndex = ((bgIndex + 4) % 6) + 1;
  setBg();
}
function storeUserData() {
  localStorage.setItem(
    "userData",
    JSON.stringify({ name: nameDiv.textContent, city: cityInput.value })
  );
}

function restoreUserData() {
  const userData = localStorage.getItem("userData");
  if (userData) {
    const { name, city } = JSON.parse(userData);
    nameDiv.textContent = name;
    cityInput.value = city;
  }
}

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

async function updateWeather() {
  if (!cityInput.value) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=en&appid=04f828321cbd374ed321a266c0dbd698&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  const iconCode = data.weather[0].icon;

  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  weatherIcon.src = `http://openweathermap.org/img/w/${iconCode}.png`;
  // weatherIcon.src = `./assets/weather-icons/${iconCode}.svg`;
}

function handleCityChange(event) {
  if (event.code === "Enter") {
    updateWeather();
    cityInput.blur();
  }
}

function handleNameFocus() {
  if (nameDiv.classList.contains("empty")) {
    nameDiv.textContent = "";
    nameDiv.classList.remove("empty");
  } else {
  }
}

function handleNameBlur() {
  storeUserData();

  if (!nameDiv.textContent) {
    nameDiv.classList.add("empty");
    nameDiv.textContent = "your name";
  } else {
    nameDiv.classList.remove("empty");
  }
}

function handleNameEnter(e) {
  if (e.code == "Enter") {
    nameDiv.blur();
  }
}

document.addEventListener("DOMContentLoaded", updateWeather);
cityInput.addEventListener("keydown", handleCityChange);

async function showQuotes() {
  const quotes = `data-quotes.json`;
  const res = await fetch(quotes);
  const data = await res.json();

  quote.textContent = `"${data[quoteIndex].quote}"`;
  quoteAuthor.textContent = data[quoteIndex].author;
}

showQuotes();

function changeQuote() {
  console.log("change quote");
}

changeQuote();
