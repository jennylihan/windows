let notosans;let img;
let windowlist = new Set();
let starlist = [];
let moonlist = [];
let unit = 100;
let max_ring = 7; //needs to be odd number
let moon;
let center_x = 0;
let center_y = 0;
let strokeweight = 30;
let ang = 0;

function setup() {
  angleMode(DEGREES);
  cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  regenerate();
  img = loadImage('moon1.png');

}

function draw() {
  background('black');
  fill('#030362');
  rectMode(CENTER);
  square(center_x, center_y, max_ring*unit);

}

function regenerate(){
  windowlist = new Set();
  starlist = [];
  //create a window
  for (let i = 1; i  <= max_ring; i+=2){
    windowlist.add(new Ring(i));
  }
}

function clean_up_spill(){
  fill('black');
  rectMode(CENTER);
  let ringcount = ( max_ring -1 ) / 2 + 1;
  rect(0,-1*ringcount*unit,windowWidth, 200);
  rect(ringcount*unit,0,200, windowHeight);
  rect(-1*ringcount*unit,0,200, windowHeight);
  rect(0,ringcount*unit,windowWidth, 200);
}

function draw_stars(){
  starlist.forEach(function(star){
    var r = 0.4;
    fill('#8282C7');
    noStroke();
    ellipse(star[0], star[1], r*2, r*2);

  });
}

function inbounds(x, y, width,height){
  return (x < width/2 && y < height/2 && x > -1*width/2 && y > -1*height/2);
}


class Ring {
  constructor(ring){
    this.x = 0;
    this.y = 0;
    this.unit = unit;
    this.ringnum = ring;
    this.fullside = unit*ring;
    this.rectside = (ring - 1)*unit;
  }

  display() {
    this.outline(this.fullside);
    for (let i = 0; i < 4; i++){
      this.onerect(i,-(this.ringnum-2)*this.unit/2, -this.ringnum*this.unit/2,this.rectside,this.unit);
    }
  }

  onerect(num,leftx,topy,width,height){
    rectMode(CORNER);
    strokeWeight(strokeweight);
    stroke('black');
    rotate(90*num);
    noFill();
    rect(leftx,topy,width,height);
    rotate(-90*num);
  }

  outline(length){
    rectMode(CENTER);
    stroke('black');
    strokeWeight(strokeweight);
    noFill();
    square(this.x, this.y, length);
  }
}

function mouseClicked(){
   window.location = 'march12.html';
}
function keyPressed() {
  if (keyCode === UP_ARROW) {
    max_ring +=2;
    regenerate();
  } else if (keyCode === DOWN_ARROW) {
    max_ring -=2;
    regenerate();
  }
}
