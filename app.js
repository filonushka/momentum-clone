document.getElementsByClassName("body-loader")[0].style = "display: block";

import { prepareGreeting, runClock } from "./js/clock.js";
import { prepareAudioPlayer } from "./js/player.js";
import { prepareWeatherWidget } from "./js/weather.js";
import { prepareBackgroundSlider } from "./js/slider.js";
import { prepareQuotesWidget } from "./js/quotes.js";

prepareAudioPlayer();
prepareGreeting();
prepareWeatherWidget();
prepareBackgroundSlider();
prepareQuotesWidget();
runClock();
