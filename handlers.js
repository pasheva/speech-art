import { isValidWord, words, getCurrWord } from "./colors";
import { hexToHSL } from './hexToHSL';

function logWords(results) {
  console.log(results[results.length - 1][0].transcript);
}

let h = "100", s = '100%', l = '50%';
let bg = `hsl(${h},${s},${l})`;
let lastElement;

export function handleResult({ results }) {
  logWords(results);
  const sentance = results[results.length - 1][0].transcript;
  // let aWord = sentance.toLowerCase().replace(/\s/g, "");
  let wordArray = sentance.split(' ');
  if (!isValidWord(wordArray)) return;
  let aWord = getCurrWord();
  const colorSpan = document.querySelector(`.${aWord}`);
  colorSpan.classList.add("got");
  lastElement = colorSpan;
  h = hexToHSL(words[aWord])
  bg = `hsl(${h},${s},${l})`
  document.body.style.backgroundColor = bg;
  // colorSpan.classList.remove("got");
  // console.log(aWord);
}

navigator.requestMIDIAccess()
  .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
  console.log(midiAccess);

  const inputs = midiAccess.inputs;
  for (let input of midiAccess.inputs.values())
    input.onmidimessage = async (message) => {
      const command = message.data[0];
      const note = message.data[1];
      const velocity = (message.data.length > 2) ? message.data[2] : 0;
      // console.log(command, note, velocity)
      if (command === 176) {
        switch (note) {
          case 14:
            s = velocity / 1.28 + "%";
            bg = `hsl(${h},${s},${l})`
            document.body.style.backgroundColor = bg;
            break;
          case 15:
            l = velocity / 1.28 + "%";
            bg = `hsl(${h},${s},${l})`
            document.body.style.backgroundColor = bg;
            break;
          case 16:
            const elements = Array.from(document.querySelectorAll(".colors"))
            for (let e of elements) {
              e.style.fontSize = `${velocity / 32.0}em`;
            }
            break;
        }
      }
      if (command === 144) {
        switch (note) {
          case 36:
            const elements = Array.from(document.querySelectorAll(".colors"))
            for (let e of elements) {
              e.style.animation = "jump 0.2s ease-in-out 2 alternate-reverse"
              await new Promise(resolve => setTimeout(resolve, 200))
            }
            await new Promise(resolve => setTimeout(resolve, 1000))
            for (let e of elements) {
              e.style.animation = ""
            }
            break;
          case 38:
            lastElement.classList.remove("got")
            break;
        }
      }
    };

}

function onMIDIFailure() {
  console.log('Could not access your MIDI devices.');
}
