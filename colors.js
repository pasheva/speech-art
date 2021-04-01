/**
 * 
 A slash of Blue—
 A sweep of Gray—
 Some scarlet patches on the way,
 Compose an Evening Sky—
 A little purple—slipped between—
 Some Ruby Trousers hurry on—
 A Wave of Gold—
 A Bank of Day—
 This just makes out the Morning Sky.

 -- Emily Dickinson

 */


let currWord = "";

export const words = {
  'splash' : "#0000FF",
  'blue' : "#2C8C99",
  'sweep' : "#b4c292",
  'grey' : "#BCB8B1",
  'scarlet' : "#e63946",
  'patches' : "#EB6D1E",
  'way' : "#F6BE9A",
  'compose' : "#F6BE9A",
  'evening' : "#8D73D3",
  'little' : "#8064CE",
  'purple' : "#613DC1",
  'slipped' : "#E23C4A",
  'between' : "#F9DC5C",
  'ruby' : "#931621",
  'trousers' : "#F5CF29",
  'hurry' : "#ECC30B",
  'wave' : "#F9DC5C",
  'gold' : "#FFF275",
  'bank' : "#",
  'day' : "#",
  'this' : "#0000FF",
  'just' : "#",
  'makes' : "#",
  'morning' : "#"
};

export function isDark(colorName) {
  const hex = words[colorName].substring(1, 7);
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 < 120;
}

export const wordKeys = Object.keys(words).sort(
  (a, b) => a.length - b.length
);

export const wordColors = Object.values(words);

export function getCurrWord(){
    return currWord;
}

export function isValidWord(wordArray) {
  // return !!words[word];
  let check = false;
  wordArray.forEach(element => {
    let aWord = element.toLowerCase().replace(/\s/g, "");
    console.log("INSIDE VALID: " + aWord);
    if( !!words[aWord]){ check = true; currWord = aWord; }
  });

  return check;
}

