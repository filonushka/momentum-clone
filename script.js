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
const playBtn = document.querySelector(".play");
const playPrevBtn = document.querySelector(".play-prev");
const playNextBtn = document.querySelector(".play-next");
const audio = document.querySelector("audio");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const playListContainer = document.querySelector(".play-list");
const audioTitle = document.querySelector(".audio-title");
import playList from "./audio-list.js";

let bgIndex = getRandomNum(1, 7);
let isPlay = false;
let audioNum = 0;
audioTitle.textContent = `${playList[0].author} - ${playList[0].song}`;
audio.src = `${playList[0].src}`;

slideNextBtn.addEventListener("click", showNextSlide);
slidePrevBtn.addEventListener("click", showPrevSlide);
cityInput.addEventListener("change", storeUserData);
nameDiv.addEventListener("change", storeUserData);
nameDiv.addEventListener("focus", handleNameFocus);
nameDiv.addEventListener("blur", handleNameBlur);
nameDiv.addEventListener("keydown", handleNameEnter);
document.addEventListener("DOMContentLoaded", updateWeather);
cityInput.addEventListener("keydown", handleCityChange);
changeQuoteBtn.addEventListener("click", changeQuote);
playBtn.addEventListener("click", togglePLayBtn);
playBtn.addEventListener("click", playAudio);
playPrevBtn.addEventListener("click", playPrevAudio);
playNextBtn.addEventListener("click", playNextAudio);

restoreUserData();
handleNameBlur();

setInterval(update, 100);
setBg();
showQuotes();
updateWeather();

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
}

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

async function showQuotes() {
  const quotes = `data-quotes.json`;
  const res = await fetch(quotes);
  const data = await res.json();

  let quoteIndex = getRandomNum(0, 102);
  quote.textContent = `"${data[quoteIndex].quote}"`;
  quoteAuthor.textContent = data[quoteIndex].author;
}

function changeQuote() {
  showQuotes();
}

function togglePLayBtn() {
  playBtn.classList.toggle("pause");
}

function playPrevAudio() {
  isPlay = false;
  console.log("play prev");
  if (audioNum > 0) {
    audioNum--;
    playAudio();
    console.log(audioNum);
  } else {
    audioNum = 4;
    playAudio();
    console.log(audioNum);
  }
}

function playNextAudio() {
  console.log("play next");
  isPlay = false;
  if (audioNum < 4) {
    audioNum++;
    playAudio();
  } else {
    audioNum = 0;
    playAudio();
    console.log(audioNum);
  }
}

function playAudio() {
  if (!isPlay) {
    isPlay = true;
    audioTitle.textContent = `${playList[audioNum].author} - ${playList[audioNum].song}`;
    audio.src = `${playList[audioNum].src}`;
    console.log(audioNum, audio.src);
    audio.play();
    console.log(isPlay, "play");
  } else {
    audio.pause();
    isPlay = false;
    audioTitle.textContent = `${playList[audioNum].author} - ${playList[audioNum].song}`;
    console.log(isPlay, "pause");
  }
}

for (let i = 0; i < 5; i++) {
  function createAudioList() {
    const li = document.createElement("li");
    li.classList.add("audio-item");
    li.textContent = `${playList[i].author} - ${playList[i].song}`;
    playListContainer.append(li);
  }
  createAudioList();
}
