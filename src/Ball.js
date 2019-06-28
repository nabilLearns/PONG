class Ball {
  constructor(_ballX, _ballY, _size, _xvel, _yvel) {
    this.x = _ballX;
    this.y = _ballY;
    this.size = _size;

    //ball starts moving in a random direction
    this.xvel = _xvel;
    this.yvel = _yvel;
    
    this.acceleration = 1.5;
    this.hit_counter = 0;
  }

  respawnBall() {
    this.x = width/2;
    this.y = random(0, height);
    
    this.acceleration = 1.2;
    this.xvel /= Math.pow(this.acceleration, this.hit_counter);
    this.hit_counter = 0;
  }

  checkBoundaryCollisions() {
    //PLAYER 1 SCORES
    if (this.x <= 0) {
      pointScoredSound.play();
      p1Score += 1;
      this.respawnBall();

    }
    //PLAYER 2 SCORES
    else if (this.x >= width - this.size) {
      pointScoredSound.play();
      p2Score += 1;
      this.respawnBall();
    }

    //wall collision BOUNCE
    if(this.y <= 0 || this.y >= height - this.size) {
      this.yvel *= -1;
    }
  }

  move() {
    this.x += this.xvel;
    this.y += this.yvel;
  }

  checkPlayerCollisions(){
    //BALL-PLAYER COLLISION MECHANICS
    let ycentre = this.y + (this.size / 2); //=>ball constructor
    let p1centre = p1.y  + (p1.pHeight / 2); //=>p1 construcotr
    let p2centre = p2.y + (p2.pHeight / 2); //=>p2 constructor
    let bpAngle; //=>global

   //player 1 collision (right) //using Axis-Aligned bounding box test
   if(this.x + this.size > p1.x &&
      this.x < p1.x + p1.pWidth &&
      this.y + this.size > p1.y &&
      this.y < p1.y + p1.pHeight){  //p1.y + p1.pHeight - this.size ONLY counts hit if FULL ball hits paddle
        ballCollisionSound.play();

        bpAngle = 90 - (((ycentre - p1centre) / 8) * 5); //expressed in degrees
        bpAngle *= PI / 180; //convert to radians

        this.xvel = -magnitude * sin(bpAngle); // => RESETS speed; problem for acceleration change '=' to '-='
        this.yvel = magnitude * cos(bpAngle);

        this.hit_counter += 1;
        this.xvel *= this.acceleration;
        this.acceleration += 0.3;

        //shrink paddle, accelerate ball
        p1.pHeight *= 0.95;


    }

   //player2 collision (left)
    if(this.x + this.size > p2.x &&
       this.x < p2.x + p2.pWidth &&
       this.y + this.size > p2.y &&
       this.y < p2.y + p2.pHeight) {
        ballCollisionSound.play();
        bpAngle = 90 - (((ycentre - p2centre) / 8) * 5);
        bpAngle *= PI / 180;

        this.xvel = magnitude * sin(bpAngle); //change '=' to '+='
        this.yvel = magnitude * cos(bpAngle);

        this.hit_counter += 1;
        this.xvel *= this.acceleration;
        this.acceleration += 0.3;

        p2.pHeight *= 0.95;
      }

  }

  display() {
    square(this.x, this.y, this.size);
  }
}
module.exports.ball = Ball;

width = window.innerWidth;
height = window.innerHeight;
module.exports.width = width;
module.exports.height = height;
