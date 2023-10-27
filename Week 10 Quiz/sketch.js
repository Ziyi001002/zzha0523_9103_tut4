let song;

function preload() {
  //Fill in the url for audio asset
  song = loadSound('sample-visualisation.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB);
  //Create a new FFT analysis object
  fft = new p5.FFT();
  //Add the song (sample) into the FFT's input
  song.connect(fft);
}

function draw() { 
  background(0);
  noFill();
  stroke(255);
  beginShape();

  let spectrum = fft.analyze();
  translate(width/2, height/2);
  
  for (let i = 0; i < spectrum.length; i++) {
    let angle = map(i, 0, spectrum.length, 0, 360);
    let r = map(spectrum[i], 0, 255, 50, 300);
    let x = r * cos(angle);
    let y = r * sin(angle);
    vertex(x, y);
  }
  
  endShape(CLOSE);

  if (!song.isPlaying()) {
    song.play();
  }
}

function mouseReleased() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

