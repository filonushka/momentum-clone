const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const slideNextBtn = document.querySelector(".slide-next");
const slidePrevBtn = document.querySelector(".slide-prev");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const city = document.querySelector(".city");

let randomNum = getRandomNum(1, 7);
console.log("0", randomNum);

window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);
function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  setTimeout(showTime, 1000);
}
showTime();

showGreeting();
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
  const date = new Date();
  const hours = date.getHours();

  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  greeting.textContent = greetingText + ", ";

  function getTimeOfDay() {
    const arr = ["morning", "afternoon", "evening", "night"];
    const num = Math.floor(hours / 6);
    if (num == "0") {
      return arr[num + 3];
    } else {
      return arr[num - 1];
    }
  }

  function setBg() {
    const bgNum = randomNum.toString().padStart(2, "0");
    const timeOfDay = getTimeOfDay();
    document.body.style.backgroundImage = `url("./assets/images/${timeOfDay}/${bgNum}.jpg")`;
    // console.log(randomNum, timeOfDay, bgNum);
  }

  slideNextBtn.addEventListener("click", getSlideNext);
  slidePrevBtn.addEventListener("click", getSlidePrev);
  function getSlideNext() {
    if (randomNum < 7) {
      setBg();
      randomNum = randomNum + 1;
      // console.log("<7", randomNum);
    } else {
      randomNum = randomNum - 6;
      setBg();
      // console.log("=7", randomNum);
    }
  }

  function getSlidePrev() {
    if (randomNum > 1) {
      randomNum = randomNum - 1;
      setBg();
      // console.log(">1", randomNum);
    } else {
      setBg();
      randomNum = randomNum + 6;
      // console.log("=1", randomNum);
    }
  }
}

function setLocalStorage() {
  localStorage.setItem("name", name.value);
}

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
}

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=en&appid=04f828321cbd374ed321a266c0dbd698&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}

function setCity(e) {
  if (e.code === "Enter") {
    getWeather();
    city.blur();
  }
}

document.addEventListener("DOMContentLoaded", getWeather);
city.addEventListener("keypress", setCity);
