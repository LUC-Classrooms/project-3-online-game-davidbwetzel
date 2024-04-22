/**
 * Project 3 versions 0-4 - 2D Web Game
 * Name:
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */
var gameState = "splash";
var player1;
var gameTimer; // time the game play
var testBox; // a box to preview on the splash screen
var dropTimer; // regulate box drops
var presents = new Array(0); // an empty array called "presents"
var score = 0;

function setup() {

  createCanvas(600, 400);
  player1 = new Player(width/2, height * 4/5);
  console.log(player1);
  gameTimer = new Timer(30000); // 30 seconds for now
  dropTimer = new Timer(1000); // drop every second
  testBox = new Box(width/2, height/3);

}

function draw() {
  background(200);
  /* un-comment each line to see it work */
  //splash(); // call the splash screen function (below)
  //play(); // call the play screen function (below)
  //gameOver(); // call the gameOver screen function (below)
  switch(gameState){
    case "splash" :
      splash();
      break;
    case "play" :
      play();
      break;
    case "gameOver" :
      gameOver();
      break;
    default :
      console.log("no match found!");
  }
}

function splash() {
  // this is what you would see when the game starts
  background(200);
  textAlign(CENTER);
  textSize(16);
  text("Let's Play a Game!", width / 2, height / 2);
  textSize(12);
  text("(click the mouse to continue)", width / 2, height / 2 + 30);

  testBox.display();
  testBox.spin();
}

function play() {
  // this is what you see when the game is running 
  background(0, 200, 0); // green
  fill(0, 0, 200)
  textAlign(CENTER);
  textSize(16);
  //text("This is where the Game happens", width / 2, height / 2);
  //player1.x = mouseX;
  player1.display();
  player1.move();
  if(gameTimer.isFinished()){
    gameState = "gameOver";
  }
  if(dropTimer.isFinished()){
    let p = new Box(random(width), -40);
    presents.push(p);
    dropTimer.start();
  }
  for(let i = 0; i < presents.length; i++){
    presents[i].display();
    presents[i].move();
    presents[i].spin();

    let d = dist(presents[i].x, presents[i].y, player1.x, player1.y);
    if (d < 50) { // caught one!
      presents.splice(i, 1); // remove 1 item at index 'i'
      score ++; // get a point
    } else if(presents[i].y > height) {
      // present went below the canvas
      presents.splice(i, 1);
      score --; //lose a point
      // remove 1 element from from "presents" at index 'i'
    }
  }
  textAlign(LEFT);
  text("Time remaining: " + Math.trunc((gameTimer.time - gameTimer.elapsedTime)/1000), 40, 100);
  // show elapsed time in top left corner

  text("Score: " + score, 40, 40);
  if(keyIsPressed) {
    switch(keyCode)
    {
      case UP_ARROW:
        player1.thrust(); // accelerate
        break;
      case DOWN_ARROW:
        player1.brake();
        break;
      case LEFT_ARROW:
        player1.angle -= .02; //turn left
        break;
      case RIGHT_ARROW:
        player1.angle += .02; //turn right
        break;
      default:
        console.log("use the arrow keys to move");
    }
  }

}

function gameOver() {
  // this is what you see when the game ends
  background(0);
  fill(255, 0, 0)
  textAlign(CENTER);
  textSize(16);
  text("Game Over!", width / 2, height / 2);
  text("Your Final Score: " + score, width/2, height * 2/3)
}

function mousePressed() {

  // console.log("click!");
  if(gameState == "splash"){
    gameState = "play";
    gameTimer.start(); // start the game timer
    dropTimer.start(); // start the drop timer
    presents = new Array(0);
    player1 = new Player(width/2, height * 4/5);
    score = 0;
  } else if(gameState == "play"){
    //gameState = "gameOver";
  } else if(gameState == "gameOver"){
    gameState = "splash";
  }
  console.log(gameState);

}
/*
function keyPressed(){
  switch(keyCode){
    case UP_ARROW :
      console.log("up");
      player1.y -= 30 // move up 30px
      player1.angle = 0; // no rotation
      if(player1.y < 0) {
        player1.y = height; 
      }// wrap to bottom
      break;
    case DOWN_ARROW :
      console.log('down');
      player1.y += 30 // move up 30px
      player1.angle = PI; //flip 180 degrees
      if(player1.y > height) {
        player1.y = 0; 
      }// wrap to top
      break;
    case LEFT_ARROW :
      console.log("left");
      player1.x -=30;
      player1.angle = PI + HALF_PI;
      if(player1.x < 0){
        player1.x = width;
      }
      break;
    case RIGHT_ARROW :
      console.log("right");
      player1.x += 30;
      player1.angle = HALF_PI;
      if(player1.x > width){
        player1.x = 0;
      }
      break;
    default :
      console.log("use the arrow keys to move")
  }
}
*/