export { prepareBackgroundSlider };

import { getRandomNum } from "./random.js";
import { getTimeOfDay } from "./clock.js";

const slideNextBtn = document.querySelector(".slide-next");
const slidePrevBtn = document.querySelector(".slide-prev");

let bgIndex;

function prepareBackgroundSlider() {
  slideNextBtn.addEventListener("click", showNextSlide);
  slidePrevBtn.addEventListener("click", showPrevSlide);

  bgIndex = getRandomNum(1, 7);
  setBg();
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
