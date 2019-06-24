//PONG v0.1 (prototype) v0.2
//Author : Nabil Mohamed
//Date : June 22 2019, June 23 2019


/*
 * MAIN ISSUES : Collision detection and ball movement after collision
       * Ball only detects collision if it is FULLY in player ySpace
             *ball should collide even if only half of it touches player
       *Ball should reflect according to SNELL's law = FIXED 1:16am
 * sound effects
 * score keeping
 * start velocity of the ball is random - maybe change that?
 * use array to store ball objects, and push newly created ball objects to array
 * generate new ball going in random direction after a point has been scored
 * START GAME: only generate a ball once a specific button is pressed; give players time to get ready
*/

let p1;
let p2;
let b;

let gameStart = false;
let gameScore = 0;

let magnitude;
let theta;
let startXVel;
let startYVel;

function setup() {
  createCanvas(windowWidth, windowHeight);

  p1 = new player(width - (width/4), height/2, 15, 100);
  p2 = new player2((0 + width/4), height/2, 15, 100);

  magnitude = 3;
  theta = random(0,2*PI);
  startXVel = magnitude * cos(theta);
  startYVel = magnitude * sin(theta);
  b = new ball(width/2,  height/2, 10, startXVel, startYVel);

}

function draw() {
  background(0);

  //player movement
  p1.display();
  p1.move();

  p2.display();
  p2.move();

  //game only starts when players are ready
  if(gameStart) {
    //arena dividor
    for (i = 0; i < height; i += 20) {
      rect(width/2, i + 5, 5, 10);
    }

    b.display();
    b.move();
  }

  //game instructions for players MAIN MENU
  if(gameStart == false) {
  textFont("Monospace");
  textSize(20);
  textAlign('center');
  text("Use [W][S] or [I][K] to MOVE. Press [B] to START.", width/3.5, height/2, width/2.25, height/10);
}

}

//INPUT FUNCTIONALITY
let p1up = false;
let p1down = false;
let p2up = false;
let p2down = false;

function keyPressed() {
  if(key == 'b') gameStart = true;
  if(key == 'w') p2up = true;
  if(key == 's') p2down = true;
  if(key == 'i') p1up = true;
  if(key == 'k') p1down = true;
}

function keyReleased() {
  if(key == 'w') p2up = false;
  if(key == 's') p2down = false;
  if(key == 'i') p1up = false;
  if(key == 'k') p1down = false;
}

//OBJECTS
class player {
  constructor(_x, _y, _pWidth, _pHeight) {
    this.x = _x;
    this.y = _y;
    this.pWidth = _pWidth;
    this.pHeight = _pHeight;
  }

  move() {
     if(keyIsPressed) {
      if(p1up) {
        this.y += -4;
      }
      else if (p1down) {
        this.y += 4;
      }
    }
  }

  display() {
    fill(255);
    noStroke();
    rect(this.x, this.y, this.pWidth, this.pHeight);
  }
}

class player2 extends player {
  move() {
    if(keyIsPressed) {
      if(p2up) {
        this.y += -4;
      }
      else if (p2down) {
        this.y += 4;
      }
    }
  }
}

class ball {
  constructor(_ballX, _ballY, _size, _xvel, _yvel) {
    this.x = _ballX;
    this.y = _ballY;
    this.size = _size;

    //ball starts moving in a random direction
    this.xvel = _xvel;
    this.yvel = _yvel;
  }

  move() {
    this.x += this.xvel;
    this.y += this.yvel;

    //wall collision SCORE
    if (this.x <= 0 || this.x >= width - this.size) { //change SCORE
      text('SCORE: ' + 1, 25, 25); //put this in a SCORE function
    }

    //wall collision BOUNCE
    //if(this.x <= 0) this.xvel *= -1;
    if(this.y <= 0 || this.y >= height - this.size) {
      this.yvel *= -1;
    }

    //player1 collision
   if(this.x + this.size > p1.x) {
      if(this.y >= p1.y && this.y <= p1.y + p1.pHeight - this.size) {
        this.xvel *= -1;
        //this.yvel *= -1;
      }
    }

   //player2 collision
   if(this.x < p2.x + p2.pWidth) {
      if(this.y >= p2.y && this.y <= p2.y + p2.pHeight - this.size) {
        this.xvel *= -1;
        //this.yvel *= -1;
      }
    }
  }

  display() {
    square(this.x, this.y, this.size);
  }

}
