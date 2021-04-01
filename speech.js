import { handleResult } from "./handlers";
import { words, isDark } from "./colors";

const colorsEl = document.querySelector(".colors");

function displayColors(words) {
  return Object.entries(words).map(
    ([w, c]) =>
      `<span class="colors ${w} ${isDark(w) ? 'dark' : ''}" 
        style="background: ${c};">${w}</span>`
  ).join("");
}


window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;


function start() {
  if (!window.SpeechRecognition) {
    console.log("Sorry your browser does not support speech reco. ");
    return;
  }
  console.log("Starting...");
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = handleResult;
  recognition.start();
}

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function (stream) {
    console.log('You let me use your mic!')
    start();
  })
  .catch(function (err) {
    console.log('No mic for you!')
  });


colorsEl.innerHTML = displayColors(words);
