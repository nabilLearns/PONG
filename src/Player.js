class Player {
  constructor(_x, _y, _pWidth, _pHeight) {
    this.x = _x;
    this.y = _y;
    this.pWidth = _pWidth;
    this.pHeight = _pHeight;
    this.yvel = 4;
  }

  move(p1up, p1down) {
      if(p1up) {
        this.y += -this.yvel;
      }
      if(p1down) {
        this.y += this.yvel;
      }


    //ADDED BOUNDARY MOVEMENT LIMITS to PLAYER
    if(this.y + this.pHeight > height) this.y = height - this.pHeight;
    if(this.y < 0) this.y = 0;
  }

  display() {
    fill(255);
    noStroke();
    rect(this.x, this.y, this.pWidth, this.pHeight);
  }
}

class Player2 extends Player {
  move(p2up, p2down) {

      if(p2up) {
        this.y += -this.yvel; //-4
      }
      if(p2down) { //replaced else if, with if, so that speed goes to 0 if player holds both up and down keys
        this.y += this.yvel; //4
      }

    if(this.y + this.pHeight > height) this.y = height - this.pHeight;
    if(this.y < 0) this.y = 0;
  }
}

height = window.innerHeight;
module.exports.player = Player;
module.exports.player2 = Player2;
module.exports.height = height;
