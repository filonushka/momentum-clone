const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const slideNextBtn = document.querySelector(".slide-next");
const slidePrevBtn = document.querySelector(".slide-prev");

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
    if (num == "0") {
      return arr[num + 3];
    } else {
      return arr[num - 1];
    }
  }

  const timeOfDay = gerTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  greeting.textContent = greetingText + ", ";

  // console.log(timeOfDay);

  function setBg() {
    //  до 6 или до 7???
    const randomNum = getRandomNum(1, 6);
    const bgNum = randomNum.toString().padStart(2, "0");
    document.body.style.backgroundImage = `url("./assets/images/${timeOfDay}/${bgNum}.jpg")`;
    // console.log(randomNum, timeOfDay, bgNum);
  }

  slideNextBtn.addEventListener("click", getSlideNext);
  slidePrevBtn.addEventListener("click", getSlidePrev);

  function getSlidePrev() {
    setBg();
  }
  function getSlideNext() {
    setBg();
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
