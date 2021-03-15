let notosans;let img;
let w1;

let windowlist = new Set();
let angle = 0;
let step = 0;

function preload() {
  notosans = loadFont(
    "https://cdn.glitch.com/d343bc20-d576-4fcf-8829-86baa7d563d6%2FNotoSansSC-Regular.otf?v=1605939143378"
    );
}


function setup() {
  background(0);
  angleMode(DEGREES);
  cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  //cnv.mouseClicked(markCorner);
  for (let i = 0; i  < 20; i++){
    windowlist.add(new Lattice());
  }
}

function draw() {
    background ('firebrick');
    stroke('white');
    fill('firebrick');
    windowlist.forEach(function(item){
      item.move();
      item.display();
    });
}

function add_spikes(x, y, side, unit){
  strokeWeight(4);
  line(x, y, x, y-unit); //top
  line(x+side, y, x+side + unit, y); //right
  line(x+side, y+side, x+side, y+side+unit);//bottom
  line(x, y+side, x-unit, y+side); //left
}

class Lattice {
  constructor(x, y){
    this.x = random(-windowWidth/2, windowWidth/2);
    this.y = random(-windowHeight/2, windowHeight/2);
    this.speed = .6;
    this.gridsize = 50;
    this.sidelength = 50*7;
    this.z = random(-1000, -100); 
  }

  move() {
    this.z += this.speed;
    // this.y += random(-this.speed, this.speed);
  }

  display() {
    translate(0, 0, this.z);
    this.outline();
    this.outlock(this.x, this.y, this.gridsize, this.gridsize);
  }

  outline(){
    noFill();
    square(this.x, this.y, this.sidelength);
  }

  outlock(x_1, y_1, side){
      let outlock_list = [[3*side, side], [2*side, 3*side], [1*side, 5*side]];
      outlock_list.forEach(function(coord) {
          strokeWeight(4);
          let offset = coord[0];
          let wid = coord[1];
          rect(x_1 + offset, y_1 + offset, wid, wid);
          add_spikes(x_1+offset, y_1+offset, wid, side);
      });
  }

}

function rotate_maybe(){
  // rotateY(angle);
  // this.translate += ( millis () / 1000); 
}


function keyPressed() {
  if (keyCode === UP_ARROW) {
    step += 5;
  } else if (keyCode === DOWN_ARROW) {
    step -= 5;
  } else if (keyCode === 32) {
    space = !space;
  }
}
