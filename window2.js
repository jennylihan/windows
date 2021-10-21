let notosans;
function preload() {
  notosans = loadFont(
    "https://cdn.glitch.com/d343bc20-d576-4fcf-8829-86baa7d563d6%2FNotoSansSC-Regular.otf?v=1605939143378"
  );
}

let imglist = [];
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
let imgtracker = 0;
let alpha_list = [255,255,240, 15, 230,240, 225,0];
let max_random = 5;
let timer = 0; //every 4 seconds
let cam;
let backdrop;

function setup() {
  mouseX = 0;
  mouseY = 0;
  angleMode(DEGREES);
  cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  regenerate();
  cam = createCapture(VIDEO);
  textFont(notosans);
  textAlign(CENTER);

  
  imglist = [cam, loadImage("https://cdn.glitch.com/32b5db6a-e476-4e16-aec6-aacf0ab94b13%2FIMG_861D1B6658A3-1.jpeg?v=1615954151220"), loadImage("https://cdn.glitch.com/32b5db6a-e476-4e16-aec6-aacf0ab94b13%2FIMG_1515.JPG?v=1615958627171"), loadImage("https://cdn.glitch.com/32b5db6a-e476-4e16-aec6-aacf0ab94b13%2FP_20150714_201423_LL.jpg?v=1615958631103"), loadImage("https://cdn.glitch.com/32b5db6a-e476-4e16-aec6-aacf0ab94b13%2FPalette%20(11).png?v=1615958725789")];
  let side = unit*max_ring;
  cam.size(side, side);
  cam.hide();
}

function draw() {
  background(bgcol);
  rectMode(CENTER);
  backdrop = imglist[imgtracker % imglist.length];  
  //then scale it by -1 in the x-axis
  //to flip the image
  scale(-1, 1);
  texture(backdrop);
  square(center_x, center_y, max_ring*unit);
  let alpha = map(mouseX, 0, windowWidth, 210, 255);
  fill(color(178, 34, 34, alpha));
  square(center_x, center_y, max_ring*unit);  
  //ring of window panes
  windowlist.forEach(function(item){
    item.display();
  });

   if (millis() >= 2000+timer) {
     regenerate();
     timer = millis();
    }
  
  
  //give instructions
  scale(-1, 1);
  fill("white");
  textSize(16);
  text("options: ←, ↑, ↓, →, move mouse, mouse click", 0 ,0.88*height/2);
  
  fill("red");
  ellipse(mouseX, mouseY, 50, 50);

}

function regenerate(){
  windowlist = new Set();
  //create a window
  for (let i = 1; i  <= max_ring; i+=2){
    windowlist.add(new Ring(i, random(alpha_list.slice(0, max_random))));
  }
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
  } else if (keyCode === LEFT_ARROW) {
    imgtracker--;
    if (imgtracker < 0) {
      imgtracker = imglist.length - 1;
    }
  } else if (keyCode === RIGHT_ARROW) {
    imgtracker++;
  }
}
