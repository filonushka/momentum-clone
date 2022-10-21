export { prepareAudioPlayer };

import { trackList } from "./track-list.js";

const playBtn = document.querySelector(".play");
const playPrevBtn = document.querySelector(".play-prev");
const playNextBtn = document.querySelector(".play-next");
const audio = document.querySelector("audio");
const playListContainer = document.querySelector(".play-list");
const audioTitle = document.querySelector(".audio-title");

let isPlay = false;
let audioNum = 0;

function prepareAudioPlayer() {
  audioTitle.textContent = `${trackList[0].author} - ${trackList[0].song}`;
  audio.src = `${trackList[0].src}`;

  playBtn.addEventListener("click", togglePLayBtn);
  playBtn.addEventListener("click", playAudio);
  playPrevBtn.addEventListener("click", playPrevAudio);
  playNextBtn.addEventListener("click", playNextAudio);

  buildPlayList();
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
    audioTitle.textContent = `${trackList[audioNum].author} - ${trackList[audioNum].song}`;
    audio.src = `${trackList[audioNum].src}`;
    console.log(audioNum, audio.src);
    audio.play();
    console.log(isPlay, "play");
  } else {
    audio.pause();
    isPlay = false;
    audioTitle.textContent = `${trackList[audioNum].author} - ${trackList[audioNum].song}`;
    console.log(isPlay, "pause");
  }
}

function buildPlayList() {
  for (let i = 0; i < 5; i++) {
    const li = document.createElement("li");

    li.classList.add("audio-item");
    li.textContent = `${trackList[i].author} - ${trackList[i].song}`;

    playListContainer.append(li);
  }
}
