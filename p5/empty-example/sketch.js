//global variables

//sprites
let pImg;
let bImg;
let sImg;

//game rules and characters
let player;
let spikes = [];
let counter = 1;
let score = 0;
let level = 0;

//sounds
let boing;
let thud;

//var timerValue = 10;


function preload() { // function to preload my sprites
  pImg = loadImage('sprites/player_stand.png');
  bImg = loadImage('sprites/backgroundColorForest.png');
  sImg = loadImage('sprites/spikeMan_stand.png');
  eImg = loadImage('sprites/flyMan_fly.png');
}

function setup() { // fucntion to set up the game
   createCanvas(1000,700)
   player = new Player();

   soundFormats('mp3');
   //boing = loadSound('sounds/boing.mp3')
   thud = loadSound('sounds/thud.mp3') 
}

function draw() { //funtion to draw out the background, player and spikes - also to let spike keep spawning in
  text(frameRate(), width/2, height/2);
  background(bImg);
  textSize(24);
  text(`Score : ${score}`, 10, 30);

  switch(level){
    case -1:
      background(0, 0, 0);
      fill(255);
      textSize(48);
      text("GAME OVER", width/2 - 125, height/2,);
      textSize(38)
      textSize(28);
      text("Press ENTER to play again", width/2 -140, height/2 +50);
    break;

    case 0:
      background(0, 0, 0);
      fill(255);
      textSize(48);
      text("GAME START", width/2 - 125, height/2 );
      textSize(38)
      textSize(28);
      text("Press ENTER to play", width/2 -105, height/2 +50);
    break;

    case 1:
      runGame(1);
    break;

    case 2:
      runGame(2);
    break;
  }
}

function testLevel() {
  if(score <= 0) {
    level = -1;
  } else {
    if (score <= 9) {
      level = 1;
    } else {
      if (score >= 10) {
        level = 2;
      }
    }
  }  
}

function runGame() {
  //testLevel();

  player.show();
  player.move(); 

  for(let i = spikes.length - 1; i >= 0; i--) {
    let spike = spikes[i];
    spike.show();
    spike.move();
    if (spike.hits(player)) { //statememnt to determin when a player collides with the spikes to log game over and to play thud noise
      console.log("Game Over");
      thud.play();
      gameOver();
    }
    if (spike.over()) {
      spikes.splice(i, 1);
    }
    if (player.passes(spike)) { //statememnt that adds the players score when passing 
      score++;
    }
  }
  if (counter % 70 == 0 || random(1) < 0.007) {
    addSpike();
  }
  counter++;
}


function addSpike() { ///function to push new spike enemys out
  spikes.push(new Spike());
}


function keyPressed() { //function to control the player to jump everytime space is pressed
  if(keyCode == ENTER) {
    player = new Player();
    level = 1;
    spikes = [];
    score = 0;
    console.log("Start");
    loop();
  }
  
  if (key == ' ') {
    player.jump();
    boing.play();
  }
}

function gameOver() {
  background(0);
  fill(255);
  textSize(48);
  text("GAME OVER", width/2 - 125, height/2,);
  textSize(38)
  textSize(28);
  text("Press ENTER to play again", width/2 -140, height/2 +50);
  noLoop();
}

function refresh() { //funciton to refresh the sketch when failed the level
  window.location.reload();
}


