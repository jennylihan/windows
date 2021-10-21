let notosans;
function preload() {
  notosans = loadFont(
    "https://cdn.glitch.com/d343bc20-d576-4fcf-8829-86baa7d563d6%2FNotoSansSC-Regular.otf?v=1605939143378"
  );
}

let img;
let windowlist = new Set();
let starlist = [];
let moonlist = [];
let unit = 40;
let max_ring = 15;
let moon;
let center_x = 0;
let center_y = 0;
let strokeweight = 20;
let ang = 0;

var num = 5;
var mountains = [];
let mountain_city_toggle = true;

//code adapted from: https://editor.p5js.org/tom.smith/sketches/Vt85VEIwk
function setup() {
  img = loadImage('recurvantwave.png');
  angleMode(DEGREES);
  regenerate();
	createCanvas(windowWidth, windowHeight);
  center_x = windowWidth/2;
  center_y = windowHeight/2;
  textFont(notosans);
  textAlign(CENTER);
}

function draw() {
  background('#BFA968');
  //box
  noFill();
  stroke('#BFA968');
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
    clean_up_spill();
  
  
  fill("white");
  textSize(16);
  text("options: ←, ↑, ↓, move mouse, mouse click", width/2 , 0.88*height);

}


function clean_up_spill(){
  fill("#BFA968");
  strokeWeight(0);
  let ringcount = ( max_ring -1 ) / 2 + 1;
  rectMode(CORNER);
  let topoflattice = windowHeight/2 - (max_ring*unit)/2;
  let leftoflattice =windowWidth/2 - (max_ring*unit)/2;
  rect(0,0,windowWidth, topoflattice); //top rectangle
  rect(0, windowHeight/2+max_ring*unit/2, windowWidth, topoflattice); // bottom rectangle
  rect(0,0, leftoflattice, windowHeight); //left rectangle
  rect(windowWidth/2 + (max_ring*unit)/2, 0,leftoflattice, windowHeight); //right rectangle
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
         var y = 0;
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
          if (mountain_city_toggle == true | x % 70 < 1) {
           y = screenHeight * (noise(nx+index*10)*.6);
          }
					var xPos = x+ xoffset;
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
  for (let i = 2; i  <= max_ring; i+=2){
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
    rectMode(CENTER);
    stroke("#BFA968");
    strokeWeight(strokeweight);
    noFill();
    this.cross();
    if (this.ringnum!=4) {
      for (let i = 0; i < 4; i++){
        this.w(90*i);
      }
    }
  }


  w(angle){
    beginShape();
    translate(windowWidth/2, windowHeight/2);
    rotate(angle); //thank you Dan Shiffman tutorial
    let halfside = this.fullside/2;
    vertex(halfside-3*unit, -halfside); //top
    vertex(halfside-unit, -halfside);
    vertex(halfside-unit, -halfside + unit); //right
    vertex(halfside, -halfside + unit);
    vertex(halfside,  -halfside +3*unit);
    vertex(halfside - unit,  -halfside +3*unit);
    vertex(halfside - unit,  -halfside +2*unit);
    vertex(halfside - 2*unit,  -halfside +2*unit);
    vertex(halfside-2*unit, -halfside + unit); //top
    vertex(halfside-3*unit, -halfside + unit); //top
    endShape(CLOSE);
    translate(-windowWidth/2, -windowHeight/2);
  }

  cross(){
    beginShape();
    translate(windowWidth/2, windowHeight/2);
    let halfside = this.fullside/2;
    vertex(-halfside+unit, -halfside); //top
    vertex(halfside-unit, -halfside);
    vertex(halfside-unit, -halfside + unit); //right
    vertex(halfside, -halfside + unit);
    vertex(halfside, halfside - unit);
    vertex(halfside-unit, halfside - unit); //bottom
    vertex(halfside-unit, halfside);
    vertex(-halfside+unit, halfside);
    vertex(-halfside+unit, halfside-unit);
    vertex(-halfside, halfside-unit);
    vertex(-halfside, -halfside+unit);
    vertex(-halfside+unit, -halfside+unit);

    endShape(CLOSE);
    translate(-windowWidth/2, -windowHeight/2);
  }


  outline(length){
    square(this.x, this.y, length);
  }
}

function mouseClicked(){
   window.location = 'march12.html';
}
function keyPressed() {
  if (keyCode === UP_ARROW) {
    mountain_city_toggle = !mountain_city_toggle;
    regenerate();
  } else if (keyCode === DOWN_ARROW) {
    mountain_city_toggle = !mountain_city_toggle;
    regenerate();
  } else if (keyCode === LEFT_ARROW){
    mountains = [];
    regenerate();
  }
}
