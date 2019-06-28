//PONG v0.3
//Author : Nabil Mohamed
//Date : June 22 2019, June 23 2019, June 24 2019

/* CHANGES with PONG v0.3
  *improvements to menu screen - resizing, more description
  *added option to PAUSE the game with 'ESCAPE' button
  *improvements made to collision mechanics (8 segments), better collision detection
  *added functionality to RESET BALL position after a point is scored
  *added SCORE SYSTEM
  *added PONG icon for browser tab

  *accidently discovered superPONG -> extreme acceleration of ball after each strike of a paddle
  *paddles shrink after each hit
    **superPONG is FUN!
*/

/*TODO
  important:
 * sound effects
 * use array to store ball objects, and push newly created ball objects to array
 * make this code more clean, organized, and try to cut out excess code
    *seperate each class into a different .js file

  fun:
 *improve upon superPONG -> add color, powerups that players can use?
 *ball accelerates after each paddle hit/score
*/

/* FIXED PROBLEMS - NOTES
* => after moving the p1centre, p2centre, ycentre variables to the constructors of their respective classes..
  * (i did this because I thought this would make for more organized code)
  *for some reason the ball was no longer colliding as I wanted it to
  *meaning, it did not move up when it hit top corner of paddle, and it did not move down when it hit bottom corner
  * AFTER DEBUGGING by changing bpAngle to global scope so I could print text with values of bpAngle, sin,cos(bPAngle), velocity, ycentre, p1/2centre
  *I learned that the p1/2centre and ycentre variables were UNCHANGING! that's because they were declared in the CONSTRUCTOR
  * I needed the centre variables to always be updating so I could accurately determine bpAngle
  * so after moving the variables to a more local scope within the move() function in class Ball, the collision worked again!
  */

let gameStart;
let gamePause = false;

let p1Score;
let p2Score;

//let acceleration = 0;

const ballCollisionSound = new Audio('Sounds/ballCollision.mp3');
const pointScoredSound = new Audio('Sounds/pointScored.mp3');

function setup() {
  createCanvas(windowWidth, windowHeight);
  reset();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  reset();
}

function reset() {
  gameStart = false;
  p1Score = 0;
  p2Score = 0;
  //acceleration = 0;

  p1 = new Player(width - (width/4), height/2, 15, 100); // width/1.5
  p2 = new Player2((0 + width/4), height/2, 15, 100); //width/3

  let magnitude = 5;
  let theta = random(TWO_PI);
  let startXVel = magnitude * cos(theta); //* cos(theta);
  let startYVel = magnitude * sin(theta); //* sin(theta);

  b = new Ball(width/2,  height/2, 10, startXVel, startYVel); //DONT FORGET TO USE THIS VERSION OF THE BALL OBJECT!!!
//  b = new Ball(width/2, height/2, 10, 3, 0); //for testing/debugging
}

function draw() {
  background(0);

  //player movement
  p1.display();
  p1.move(p1up, p1down);

  p2.display();
  p2.move(p2up, p2down);

  //scoreKeeper
  textSize(50);
  text(p1Score, 3/4 * width, height / 5);
  text(p2Score, 1/4 * width, height / 5);

  //game only starts when players are ready
  if(gameStart) {
    //arena dividor
    for (i = 0; i < height; i += 20) {
      rect(width/2, i + 5, 5, 10);
    }
    b.display();
    b.move();
    b.checkBoundaryCollisions();
    b.checkPlayerCollisions();
  }

  //game instructions for players MAIN MENU
  if(gameStart == false) {
  textFont("Monospace");
  textSize(14); //20
  textAlign('center');
  text("Use [W][S] or [I][K] to MOVE. Press [B] to START. Press [ESCAPE] to PAUSE. [R] to RESTART.", width/3.5, height/5, width/2.25, height/10);
}
gameOver();
}

//END GAME FUNCTIONALITY
function gameOver() {
  if(p1Score == 11 || p2Score == 11) {
    textSize(24);
    fill(100, 255, 100);
    p1Score > p2Score ? text("WINNER", p1.x, p1.y - 20) : text("WINNER", p2.x, p2.y - 20);
    setTimeout(reset, 1000); //the winner can boast for 1 sec. before game is reset
  }
}

//INPUT FUNCTIONALITY
let p1up;
let p1down;
let p2up;
let p2down;

function keyPressed() {
  if(key == 'b') gameStart = true;
  if(key == 'r') reset(); //RESET GAME

  if(key == 'w') p2up = true;
  if(key == 's') p2down = true;

  if(key == 'i') p1up = true;
  if(key == 'k') p1down = true;

  //FOR PAUSING THE GAME
  if(keyCode == ESCAPE) {
    if(gamePause) {
      gamePause = false;
      loop();
    }
    else if (gamePause == false) {
      gamePause = true;
      noLoop();
    }
  }
  return false; //ADDED THIS TO prevent faulty browser behaviour
}

function keyReleased() {
  if(key == 'w') p2up = false;
  if(key == 's') p2down = false;
  if(key == 'i') p1up = false;
  if(key == 'k') p1down = false;
}

magnitude = 5;
theta = 3.14/2;
startXVel = 5.00;
startYVel = 0.137;
module.exports.ball_start_x_vel = startXVel;
module.exports.ball_start_y_vel = startYVel;
module.exports.magnitude_velocity = magnitude;
module.exports.theta = theta;
