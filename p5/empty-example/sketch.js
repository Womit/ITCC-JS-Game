//global variables

//sprites - level 1
let pImg;
let bImg;
let sImg;

//sprites - level 2
let ppImg;
let bbImg;
let ssImg;

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
  ppImg = loadImage('sprites/adventurer_idle.png');
  bbImg = loadImage('sprites/backgroundColorFall.png');
  ssImg = loadImage('sprites/flyMan_fly.png');
}

function setup() { // fucntion to set up the game
   createCanvas(1000,700)
   player = new Player();
  

   soundFormats('mp3');
   boing = loadSound('sounds/boing.mp3')
   thud = loadSound('sounds/thud.mp3') 
}

function draw() { //funtion to draw out the background, player and spikes - also to let spike keep spawning in
  text(frameRate(), width/2, height/2);
  background(bImg);
  textSize(24);
  text(`Score : ${score}`, 10, 30);

  switch(level){ // senarios within the game to determin the case for each level
    case -1: //game lost screen
      background(0, 0, 0);
      fill(255);
      textSize(48);
      text("GAME OVER", width/2 - 125, height/2,);
      textSize(38)
      textSize(28);
      text("Press ENTER to play again", width/2 -140, height/2 +50);
    break;

    case 0: //starting screen
      background(0, 0, 0);
      fill(255);
      textSize(48);
      text("GAME START", width/2 - 125, height/2 );
      textSize(38)
      textSize(28);
      text("Press ENTER to play", width/2 -105, height/2 +50);
    break;

    case 1: //running level 1
      runGame(1);
    break;

    case 2: //running level 2
      runGame(1);
    break;
  }
}

function testLevel() { //testing the game parameters to chnage the level according to the score
  if(score <= 0) { //starting game
    level = 1;
  } else {
    if (score <= 0) { //playig level 1
      level = 1;
    } else {
      if (score >= 2) { //playing level 2
        level = 2;
      }
    }
  }  
}

function runGame() { //running the game, showing the characters and setting the rules of the game
  testLevel(); //called to test to see what level the game such play

  if(level == 1) { // statement to test wheher the background image should chnage according to what level is being played and score 
    background(bImg);
    textSize(24);
    text(`Score : ${score}`, 10, 30);
  } else if(level == 2) {
    background(bbImg);
    textSize(24);
    text(`Score : ${score}`, 10, 30);
  }

  player.show();
  player.move(); 

  for(let i = spikes.length - 1; i >= 0; i--) { //statement to add the spikes to the game and to keep spawning them in
    let spike = spikes[i];
    spike.show();
    spike.move();
    if (spike.hits(player)) { //statememnt to determin when a player collides with the spikes to log game over and to play thud noise
      console.log("Game Over");
      thud.play();
      gameOver();
    }
    if (spike.over()) { //to recognise that player has jumped over the spike
      spikes.splice(i, 1);
    }
    if (player.passes(spike)) { //statememnt that adds the players score when passing 
      score++;
    }
    if (score > 20) { //to bring up the winning screen when reaching score of 20 or more
      gameWin();
    }
  }
  if (counter % 70 == 0 || random(1) < 0.007) { //to randomly add a spike to the game after every random interval
    addSpike();
  }
  counter++;
}


function addSpike() { ///function to push new spike enemys out
  spikes.push(new Spike());
}


function keyPressed() { //function to control the player to jump everytime space is pressed
  if(keyCode == ENTER) { //button to start, restart or play game again
    player = new Player();
    level = 1;
    spikes = [];
    score = 0;
    console.log("Start");
    loop();
  }
  
  if (key == ' ') { //declaring space bar to make player jump
    player.jump();
    boing.play();
  }
}

function gameOver() { //screen to pop up when ;layer has collided with enemy
  background(0);
  fill(255);
  textSize(48);
  text("GAME OVER", width/2 - 125, height/2,);
  textSize(38)
  textSize(28);
  text("Press ENTER to play again", width/2 -140, height/2 +50);
  noLoop();
}

function gameWin() { //screen to pop up when player has passed 20
  background(0, 0, 0);
  fill(255);
  textSize(48);
  text("YOU WIN!", width/2 - 125, height/2 );
  textSize(38)
  textSize(28);
  text("Press ENTER to play again", width/2 -105, height/2 +50);
  noLoop();
}

function refresh() { //funciton to refresh the sketch when failed the level
  window.location.reload();
}



