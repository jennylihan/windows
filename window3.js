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

var num = 5;
var mountains = [];


//code adapted from: https://editor.p5js.org/tom.smith/sketches/Vt85VEIwk
function setup() {
  img = loadImage('recurvantwave.png');
  angleMode(DEGREES);
  regenerate();
	createCanvas(windowWidth, windowHeight);
  center_x = windowWidth/2;
  center_y = windowHeight/2;
}

function draw() {
  background('#C6B273');
  //box
  noFill();
  stroke('#C6B273');
  rectMode(CENTER);
  square(center_x, center_y, max_ring*unit);

  strokeWeight(1);

	for (var i = 0; i < mountains.length; i++) {
		mountains[i].show();
	}

  //ring of window panes
  windowlist.forEach(function(item){
    item.display();
  });
  clean_up_spill()
}


function clean_up_spill(){
  fill("#C6B273");
  rectMode(CENTER);
  let ringcount = ( max_ring -1 ) / 2 + 1;
  translate(windowWidth/2, windowHeight/2);
  rect(0,-1*ringcount*unit,windowWidth, 200);
  rect(ringcount*unit,0,200, windowHeight);
  rect(-1*ringcount*unit,0,200, windowHeight);
  rect(0,ringcount*unit,windowWidth, 200);

  rectMode(CORNER);
  rect(-2.5*ringcount*unit,-1*ringcount*unit,1.5*ringcount*unit, windowHeight);
  rect(ringcount*unit,-1*ringcount*unit,500, windowHeight);
  // translate(-center_x, -center_y);
}

function shanShui() {
	for (var i = 0; i < num; i++) {
		mountains.push(new curveLine(i));
	 }
}

function curveLine(_index) {
	var index = _index;
	var screen = 2*max_ring*unit;
	var screenHeight = 1000;
	var base = random (screen/2.3, screen/2);
	var start = random (-screen/2, screen/2);

	this.show = function (){
			var ink = 40;
			var c = color(0, 0, 0,ink);
			fill(c);
    	stroke(c);

			var xoffset = map(mouseX, 0,screen, 1000,-1000) * (index+1) ;

				 for (var x = start; x < base + start; x++) {
				 	var mapLoc = map(x, start, base+start, 0, 1);
				 	var edgePercent = .2;

				 	if(mapLoc< edgePercent){
				 		stroke(0,0,0,(mapLoc*(1/edgePercent))*ink);
				 	}else if(mapLoc> abs(1-edgePercent)){
				 		var inverseLoc = abs(1-mapLoc);
				 		stroke(0,0,0,(inverseLoc*1/edgePercent)*ink);
				 	}

					var nx = map(x, 0, screen, 0, 10);
					var y = screenHeight * (noise(nx+index*10)*.6);
					var xPos = x+ xoffset

					line (xPos, y, xPos, y+(screenHeight-y)/2);
					line (xPos, y, xPos, y+(screenHeight-y)/3);
					line (xPos, y, xPos, y+(screenHeight-y)/4);
					line (xPos, y, xPos, y+(screenHeight-y)/5);
				 }
	}
}



function regenerate(){
  shanShui();
  windowlist = new Set();
  starlist = [];
  //create a window
  for (let i = 1; i  <= max_ring; i+=2){
    windowlist.add(new Ring(i));
  }
}

function inbounds(x, y, width,height){
  return (x < width/2 && y < height/2 && x > -1*width/2 && y > -1*height/2);
}


class Ring {
  constructor(ring){
    this.x = windowWidth/2;
    this.y = windowHeight/2;
    this.unit = unit;
    this.ringnum = ring;
    this.fullside = unit*ring;
    this.rectside = (ring - 1)*unit;
  }

  display() {
    // this.outline(this.fullside);

    if (this.ringnum == max_ring){
      image(img, this.x-this.fullside/2, this.y-this.fullside/2, this.fullside, this.fullside);
    }

    // image(img, this.x, this.y, this.fullside, this.fullside);
    // for (let i = 0; i < 4; i++){
    //   this.onerect(i,-(this.ringnum-2)*this.unit/2, -this.ringnum*this.unit/2,this.rectside,this.unit);
    // }
  }


  outline(length){
    rectMode(CENTER);
    strokeWeight(strokeweight);
    noFill();
    square(this.x, this.y, length);
  }
}

function mouseClicked(){
   window.location = 'march12.html';
}
