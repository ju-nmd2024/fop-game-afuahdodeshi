function setup() {
  createCanvas(800, 600);
}

// paramters
let state = "start";

let characterX = 320;
let characterY = 100;

let cloudX = 630;
let cloudY = 100;
let grassX = 530;
let grassY = 500;


let velocityY = 0.2;
let acceleration = 0.1;

let gameState = true;

// start screen
function startScreen() {
  background(135, 206, 235);
  drawCloud(cloudX,cloudY);
  for (let i = 0; i < 5; i++) {
    drawCloud(cloudX - i * 180, cloudY);
  }
  drawGrass(grassX, grassY);
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Mary Poppins Lander", width / 2, height / 2 - 50);
  textSize(24);
  text("Click anywhere to start", width / 2, height / 2 + 20);
}

// game screen
function gameScreen() {
  background(135, 206, 235); 
  drawGrass(grassX, grassY);
  character(characterX, characterY);


  for (let i = 0; i < 5; i++) {
    drawCloud(cloudX - i * 180, cloudY);
  }

  if (gameState === true) {
   // gravity logic
   characterY = characterY + velocityY;
   velocityY = velocityY + acceleration;

    if (mouseIsPressed) {
      velocityY -= 0.7;
    }

    //  first 9 lines of code below gotten from chatgpt
// https://chatgpt.com/share/6737182d-f250-8004-868d-2287df0e143a
// landing measurements
if (characterY > 515) {
  if (Math.abs(velocityY) > 5) { 
    console.log("Crash! Game Over.");
    resultMessage = "OH NO MARY POPPINS CRASHED!\nClick anywhere to restart!";
    textSize(12);
    text("Click anywhere to start", width / 2, height / 2 + 20);
  } else {
    console.log("Soft landing! You Win!");
    resultMessage = "WOO HOO MARY POPPINS LANDED!\nClick anywhere to restart!";
  }
  gameState = false; 
  state = "result"; 
}

   
    if (keyIsDown(37)) characterX -= 3; 
    if (keyIsDown(39)) characterX += 3;
    if (keyIsDown(32)) velocityY -= 0.7; 
  }

  
}

// end screen
function endScreen() {
  background(135, 206, 235);
  drawCloud(cloudX,cloudY);
  for (let i = 0; i < 5; i++) {
    drawCloud(cloudX - i * 180, cloudY);
  }
  drawGrass(grassX, grassY);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(resultMessage, width / 2, height / 2 - 50);
}

// code to draw my clouds
function drawCloud(x, y) {
  noStroke();
  fill(255);
  ellipse(x, y, 80, 70);
  ellipse(x - 40, y + 20, 80, 50);
  ellipse(x + 40, y + 20, 80, 50);
}
//  code to draw my grass patch
function drawGrass(x, y) {
  fill(34, 139, 34);
  rect(x - 258, y + 80, 100, 80);
}

// my character
function character(x, y) {
  noStroke();
  push();
  translate(x, y);

  // Umbrella
  push();
  stroke(0);
  strokeWeight(2);
  fill(0);
  arc(0, -60, 60, 60, PI, TWO_PI); 
  line(0, -60, 0, -30); 
  pop();

  // Head
  fill(255, 224, 189); 
  ellipse(0, -20, 20, 20);

  // Hat
  fill(0);
  ellipse(0, -28, 25, 6); 
  rect(-7, -38, 14, 10); 
  fill(255, 0, 0); 
  ellipse(-5, -35, 3, 3); 

  // Body
  fill(0); 
  rect(-5, 0, 10, 35); 
  triangle(-12, 0, 12, 0, 0, 40); 

  // hands
  stroke(0);
  strokeWeight(1.5);
  line(-5, 0, -12, -30); 
  line(5, 0, 15, 10); 


  fill(255, 224, 189); 
  ellipse(-12, -30, 5, 5); 
  ellipse(15, 10, 5, 5); 

  // Legs
  stroke(0);
  line(-5, 35, -5, 55); 
  line(5, 35, 5, 55); 
  fill(0);
  ellipse(-5, 57, 5, 5); 
  ellipse(5, 57, 5, 5); 

  pop();
}

function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "result") {
    endScreen();
  }
}

// the clicking mechanism for it so i'd be able to switch through screens
function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (state === "result") {
    state = "start";
    resetGame();
  }
}


// to reset the game
function resetGame() {
  characterY = 100;
  velocityY = 0.2;
  gameState = true;
}
