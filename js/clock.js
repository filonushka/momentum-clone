export { prepareGreeting, runClock, getTimeOfDay };

const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const nameDiv = document.querySelector(".name");

function prepareGreeting() {
  nameDiv.addEventListener("change", storeUserName);
  nameDiv.addEventListener("focus", handleNameFocus);
  nameDiv.addEventListener("blur", handleNameBlur);
  nameDiv.addEventListener("keydown", handleNameEnter);

  restoreUserName();
  handleNameBlur();
}

function runClock() {
  setInterval(update, 100);
}

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

function restoreUserName() {
  const name = localStorage.getItem("userName");
  if (name) {
    nameDiv.textContent = name;
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
  storeUserName();

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

function storeUserName() {
  localStorage.setItem("userName", nameDiv.textContent);
}
