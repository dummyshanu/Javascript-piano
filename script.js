const audioContext = new AudioContext();
const NOTE_DETAILS = [
  { note: "C", key: "Z", frequency: 261.626 },
  { note: "Db", key: "S", frequency: 277.183 },
  { note: "D", key: "X", frequency: 293.665 },
  { note: "Eb", key: "D", frequency: 311.127 },
  { note: "E", key: "C", frequency: 329.628 },
  { note: "F", key: "V", frequency: 349.228 },
  { note: "Gb", key: "G", frequency: 369.994 },
  { note: "G", key: "B", frequency: 391.995 },
  { note: "Ab", key: "H", frequency: 415.305 },
  { note: "A", key: "N", frequency: 440 },
  { note: "Bb", key: "J", frequency: 466.164 },
  { note: "B", key: "M", frequency: 493.883 },
];


// Actions
const getNote = (key) => {
  return NOTE_DETAILS.find((note) => note.key === key.toUpperCase());
};

const playNotes = () => {
  NOTE_DETAILS.forEach((n) => {
    const keys = document.querySelector(`[data-note="${n.note}"]`);
    keys.classList.toggle("active", n.active|| false);

    if(n.oscillator !=null){
      n.oscillator.stop();
      n.oscillator.disconnect()
    }

  });


  // pressed keys
  const active_notes = NOTE_DETAILS.filter(n=>{
    return n.active==true;
  })
  const gain = 1/active_notes.length;
  active_notes.forEach(note=>playSound(note, gain));
  
};

const playSound = (noteDeatil, gain)=>{
  const gainNode = audioContext.createGain()
  const oscillator = audioContext.createOscillator()
  gainNode.gain.value = gain
  oscillator.frequency.value = noteDeatil.frequency
  oscillator.type = 'sine'
  oscillator.connect(audioContext.destination)
  oscillator.start()
  noteDeatil.oscillator = oscillator
}



// Events

document.addEventListener("keydown", (event) => {
  if (event.repeat) return;
  // console.log(event.key, event.keyCode); k ,66
  const noteDeatil = getNote(event.key);
  if (!noteDeatil) return;
  noteDeatil.active = true;
  playNotes();
});

document.addEventListener("keyup", (event) => {
  const noteDeatil = getNote(event.key);
  if (!noteDeatil) return;
  noteDeatil.active = false;
  playNotes();
});
