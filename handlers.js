import { isValidWord, words, getCurrWord } from "./colors";

function logWords(results) {
  console.log(results[results.length - 1][0].transcript);
}

export function handleResult({ results }) {
  logWords(results);
  const sentance = results[results.length - 1][0].transcript;
  // let aWord = sentance.toLowerCase().replace(/\s/g, "");
  let wordArray = sentance.split(' ');
  if (!isValidWord(wordArray)) return;
  let aWord = getCurrWord(); 
  const colorSpan  = document.querySelector(`.${aWord}`);
  colorSpan.classList.add("got");
  colorSpan.style.backgroundColor = 'grey';
  document.body.style.backgroundColor = words[aWord];
  // colorSpan.classList.remove("got");
  // console.log(aWord);
}
