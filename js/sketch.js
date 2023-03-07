// Set up Tone
let initTone = true;
let pitch = 500;
const synthBack1 = new Tone.FMSynth().toDestination();
const synthBack2 = new Tone.FMSynth().toDestination();
const synthBack3 = new Tone.FMSynth().toDestination();
// Set up Tone
let osc = new Tone.AMOscillator(pitch, 'triangle', 'sine').start();
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.7,
  decay: 0.3,
  sustain: 0.4,
  release: 0.4
}).connect(pan);
osc.connect(ampEnv);

function preload() {
  stinkbug = loadImage('image/Stinkbug.png');
}

const loopBack1 = new Tone.Loop(time => {
  synthBack1.triggerAttackRelease("A3", "8n", time);
}, "2n").start("2n");
const loopBack2 = new Tone.Loop(time => {
  synthBack2.triggerAttackRelease("G2", "4n", time);
}, "2n").start("4n");
const loopBack3 = new Tone.Loop(time => {
  synthBack3.triggerAttackRelease("C2", "4n", time);
}, 1.5).start(0);

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  image(stinkbug,0,0,400,400);
  fill(255);
  textSize(30);
  textAlign(CENTER);
  text('press spacebar to\n initialize audio!', 200, 100);
  
}

function keyPressed() {
  if (keyCode === 32 && initTone === true) {
    console.log('spacebar pressed');
    Tone.start();
    initTone = false;
    Tone.Transport.start();
  }
}

function mousePressed() {
  console.log('pressed');
  ampEnv.triggerAttackRelease('1n');
  osc.frequency.setValueAtTime(pitch, '+2');
  ampEnv.triggerAttackRelease('2n', '+1');
  ampEnv.triggerAttackRelease('4n', '+2');
  

}