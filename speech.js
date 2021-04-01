import { handleResult } from "./handlers";
import { wordKeys, wordColors, isDark } from "./colors";

const colorsEl = document.querySelector(".colors");

function displayColors(words, colors) {
  return words.map(
      (w, c) =>
       `<span class="colors ${w} ${
        isDark(w) ? 'dark' : ''}" 
        style="background: ${colors[c]};">${w}</span>`
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

start();
colorsEl.innerHTML = displayColors(wordKeys, wordColors);


function initDevices(midi) {
  // Reset.
  midiIn = [];
  midiOut = [];
  
  // MIDI devices that send you data.
  const inputs = midi.inputs.values();
  for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
    midiIn.push(input.value);
  }
  

  // MIDI devices that you send data to.
  const outputs = midi.outputs.values();
  for (let output = outputs.next(); output && !output.done; output = outputs.next()) {
    midiOut.push(output.value);
  }
  
  displayDevices();
  startListening();
}

// Start listening to MIDI messages.
function startListening() {
  for (const input of midiIn) {
    input.addEventListener('midimessage', midiMessageReceived);
  }
}

function connect() {
  navigator.requestMIDIAccess()
  .then(
    (midi) => midiReady(midi),
    (err) => console.log('Something went wrong', err));
}

function midiReady(midi) {
  // Also react to device changes.
  midi.addEventListener('statechange', (event) => initDevices(event.target));
  initDevices(midi); // see the next section!
}

connect();