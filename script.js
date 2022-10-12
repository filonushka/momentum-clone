const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");

window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}
showTime();

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

  function gerTimeOfDay() {
    const arr = ["morning", "afternoon", "evening", "night"];
    const num = Math.floor(hours / 6);
    return arr[num - 1];
  }

  const timeOfDay = gerTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  greeting.textContent = greetingText + ", ";
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

const randomNum = getRandomNum(1, 24);
// console.log(randomNum);

function setBg() {
  const timeOfDay = Math.floor(new Date().getHours());
  const bgNum = randomNum.toString().padStart(2, "0");
  console.log(timeOfDay, bgNum);
}

setBg();
