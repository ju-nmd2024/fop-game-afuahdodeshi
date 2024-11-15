function setup() {
  createCanvas(800, 600);
}

function startScreen(){
  fill(0,0,200);
  rect(100,100,100,100);
}

function gameScreen(){

}

function endScreen(){
background(0,0,255);
}

// function draw() {
//   background(255, 140, 0);
// }
let characterX = 320;
let characterY = 100;

let cloudX = 630;
let cloudY = 100;

// gravity logic variable
let velocityY = 0.2;
let acceleration = 0.1;

let gameState = true;


function drawCloud(cloudX,cloudY) {
  noStroke();
  fill(255);
   
  ellipse(cloudX, cloudY, 80, 70);  
  ellipse(cloudX-40, cloudY+20, 80, 50);  
  ellipse(cloudX+40, cloudY+20, 80, 50);  
  ellipse(cloudX, cloudY+20, 60, 60);   
  ellipse(cloudX-60, cloudY, 70, 50);   
  ellipse(cloudX+30, cloudY, 70, 50);  
}


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

  // Arms
  stroke(0);
  strokeWeight(1.5);
  line(-5, 0, -12, -30); 
  line(5, 0, 15, 10); 

  // Hands (small circles)
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
  background(135, 206, 235); 
  drawCloud(cloudX,cloudY);
  
  for (let i = 0; i < 5; i++) {
    drawCloud(cloudX - i * 180, cloudY);
}

  
  character(characterX, characterY);

  if (gameState === true) {
    // gravity logic
    characterY = characterY + velocityY;
    velocityY = velocityY + acceleration;

    if (mouseIsPressed) { 
      velocityY = velocityY - 0.7;
    }        

//  first 8 lines of code below gotten from chatgpt
// https://chatgpt.com/share/6737182d-f250-8004-868d-2287df0e143a
// landing measurements
    if (characterY > 450) {
      if (Math.abs(velocityY) > 5) { 
        console.log("Crash! Game Over.");
        gameState = false;
      } else {
        console.log("Soft landing! You Win!");
        gameState = false;
      }
    } 

    if (characterY > 450) {
      gameState = false;
      console.log("die");
    }
    // Key Movement controls
    if (keyIsDown(38) && characterY >= 100) { 
      velocityY = -3;
    }
    }
    if (keyIsDown(37)) {
      characterX -= 3; 
    }
    if (keyIsDown(39)) {
      characterX += 3; 
    }
    if (keyIsDown(32)) { 
      velocityY = velocityY - 0.7; 
    }
  }          


  function keyPressed() {
    if (!gameState && key === ' ') {
      gameState = true;
      characterY = 100;
      velocityY = 0.2;
      console.log("Game Restarted");
    }
  }

       