let notosans;let img;
let windowlist = new Set();
let starlist = [];
let moonlist = [];
let unit = 100;
let max_ring = 3; //needs to be odd number
let moon;
let center_x = 0;
let center_y = 0;
let strokeweight = 30;

function setup() {
  angleMode(DEGREES);
  cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  regenerate();
  img = loadImage('moon1.png');
  //moon
  moonlist.push(new Moon(true));
  moonlist.push(new Moon(false));
}

function draw() {
  background('black');
  //night scene with stars from http://blog.ocad.ca/wordpress/digf6003-fw201803-01/2019/02/computational-apis-moon-phases-when/
  fill('#030362');
  rectMode(CENTER);
  square(center_x, center_y, max_ring*unit);

  //ring of window panes
  windowlist.forEach(function(item){
    item.display();
  });

  //draw moon
  moonlist.forEach(function(item){
    item.update();
    item.display();
  });
  //clean up spill over
  clean_up_spill();
}

function regenerate(){
  windowlist = new Set();
  starlist = [];
  //create a window
  for (let i = 1; i  <= max_ring; i+=2){
    windowlist.add(new Ring(i));
  }
  //make star list
  for (var i = 0; i < 50*max_ring; i++) {
    var x = random(-1*max_ring*unit/2, max_ring*unit/2);
    var y = random(-1*max_ring*unit/2, max_ring*unit/2);
    starlist.push([x,y]);
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


class Moon {
  constructor(xmouse){
    this.r = 3*unit;
    this.x = -5*unit;
    this.y = 3*unit;
    this.yoffset = -3*unit;
    this.angle = 0;
    this.mouse = xmouse;
  }
  update() {
    this.angle += this.mouse ?  map(mouseX, 0, width, 0, 1) : map(mouseY, 0, height, -1, 0) ;
    this.x = this.r*cos(this.angle);
    this.y = this.r*sin(this.angle) + this.yoffset;
  }
  display() {
    rotate(this.angle);
    draw_stars();
    if (inbounds(this.x, this.y, max_ring*unit,max_ring*unit)){
      image(img, this.x, this.y, unit, unit);
    }
    rotate(-1*this.angle);
  }
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

function keyPressed() {
  if (keyCode === UP_ARROW) {
    max_ring +=2;
    regenerate();
  } else if (keyCode === DOWN_ARROW) {
    max_ring -=2;
    regenerate();
  }
}
