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
  playPrevBtn.addEventListener("click", loadPrevAudio);
  playNextBtn.addEventListener("click", loadNextAudio);

  buildPlayList();
}

function togglePLayBtn() {
  playBtn.classList.toggle("pause");
}

function loadPrevAudio() {
  if (audioNum > 0) {
    audioNum--;
  } else {
    audioNum = 4;
  }

  audioTitle.textContent = `${trackList[audioNum].author} - ${trackList[audioNum].song}`;

  if (isPlay) {
    playAudio();
  }
}

function loadNextAudio() {
  if (audioNum < 4) {
    audioNum++;
  } else {
    audioNum = 0;
  }

  audioTitle.textContent = `${trackList[audioNum].author} - ${trackList[audioNum].song}`;

  if (isPlay) {
    playAudio();
  }
}

function playAudio() {
  if (!isPlay) {
    isPlay = true;
    audio.src = `${trackList[audioNum].src}`;
    audio.play();
  } else {
    audio.pause();
    isPlay = false;
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
