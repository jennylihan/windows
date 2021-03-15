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
let bgcol = 'firebrick';
let alpha_list = [255,255,240, 15, 230,240, 225,0];
let max_random = 5;
let timer = 0; //every 4 seconds

function setup() {
  mouseX = 0;
  mouseY = 0;
  angleMode(DEGREES);
  cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  regenerate();
  cam = createCapture(VIDEO);
  let side = unit*max_ring;
  cam.size(side, side);
  cam.hide();
}

function draw() {
  background(bgcol);
  rectMode(CENTER);
  texture(cam);
  square(center_x, center_y, max_ring*unit);
  fill(color(178, 34, 34, 240));
  square(center_x, center_y, max_ring*unit);

  //ring of window panes
  windowlist.forEach(function(item){
    item.display();
  });

   if (millis() >= 3000+timer) {
     regenerate();
     timer = millis();
    }
}

function regenerate(){
  windowlist = new Set();
  //create a window
  for (let i = 1; i  <= max_ring; i+=2){
    windowlist.add(new Ring(i, random(alpha_list.slice(0, max_random))));
  }
}

function clean_up_spill(){
  fill('firebrick');
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
  constructor(ring, alpha){
    this.x = 0;
    this.y = 0;
    this.unit = unit;
    this.ringnum = ring;
    this.fullside = unit*ring;
    this.rectside = (ring - 1)*unit;
    this.alpha = alpha;
  }

  display() {
    this.outline(this.fullside);
    for (let i = 0; i < 4; i++){
      this.onerect(i,-(this.ringnum-2)*this.unit/2, -this.ringnum*this.unit/2,this.rectside,this.unit, this.alpha);
    }
  }

  onerect(num,leftx,topy,width,height, alpha){
    rectMode(CORNER);
    strokeWeight(strokeweight);
    stroke(bgcol);
    rotate(90*num);
    let rect_col = color(178, 34, 34, alpha);
    fill(rect_col);
    let xoffset = map(mouseX, -windowWidth/2, windowWidth/2, this.unit/2,this.unit);
    let yoffset = map(mouseY, -windowWidth/2, windowWidth/2, this.unit/2,this.unit);
    rect(leftx-xoffset,topy-yoffset,width,height);
    rotate(-90*num);
  }

  outline(length){
    rectMode(CENTER);
    stroke(bgcol);
    strokeWeight(strokeweight);
    noFill();
    square(this.x, this.y, length);
  }
}

function mouseClicked(){
   window.location = 'window3.html';
}
function keyPressed() {
  if (keyCode === UP_ARROW) {
    max_random = (max_random+1)%alpha_list.length;
    regenerate();
  } else if (keyCode === DOWN_ARROW) {
    max_random = (max_random-1)%alpha_list.length;
    regenerate();
  }
}
