var x = 0;
var y = 0;
let emotions = [];

function setup() {
  background(0);
  // let inp = createInput('');
  // inp.input(myInputEvent);
  createCanvas(windowWidth, windowHeight);
  textSize(20);
  textAlign(CENTER, CENTER);
  x = windowWidth/2;
  y = windowHeight/2;
}

function draw() {
  background('black');
  fill('white');
  text('pleasant →', windowWidth *.95, windowHeight/2);
  text('← miserable', windowWidth *.05, windowHeight/2);
  text('↑ high energy', windowWidth/2, windowHeight*0.05);
  text('↓ low energy', windowWidth/2, windowHeight*0.95);

  fill(mapColor(x, y));
  ellipse(x,y,100,100);
  checkIfOutOfBounds();

  emotions.forEach(function(item, index, array) {
    x1 = item[0];
    y1 = item[1];
    // ellipse(x1, y1,50, 50);
    fill(mapColor(x1,y1))
    text(item[2], x1, y1);
  })
  checkKeys();
}

function mapColor(x, y){
  colorMode(HSB, 100);
  h = 5 + 95*(x/windowWidth);
  s = 5 + 95*(y/windowHeight);
  b = 5 + 95* (1 - y/windowHeight);
  return color(h, s, b);
}

function checkIfOutOfBounds(){
  if (x < 0 || x >= windowWidth || y <0 || y >= windowHeight ){
    x = windowWidth/2;
    y = windowHeight/2;
    alert("That's uncharted territory!");
  }
}

function checkKeys(){
  if (keyIsPressed && keyCode === 32) {
    keyCode = 33;
    var txt;
    var emotion = prompt("Please enter your feels:", "joy");
    if (emotion == null || emotion == "") {
      txt = "ok nvm";
    } else {
      txt = emotion;
    }
    emotions.push([x, y, txt]);
  }
}

// function myInputEvent() {
//   console.log('you are typing: ', this.value());
//
//   if (keyIsPressed && keyCode === 32) {
//     emotions.push([x, y, this.value()]);
//     alert("do you want to mark this spot as " + this.value() +"?");
//   }
// }

function keyPressed() {
  //code adapted from https://editor.p5js.org/2sman/sketches/rkGp1alib
  if (keyCode === UP_ARROW) {
    y = y - 50;
  } else if (keyCode === DOWN_ARROW) {
   y = y + 50;
  }
  if (keyCode === LEFT_ARROW) {
    x = x - 50;
  } else if (keyCode === RIGHT_ARROW) {
    x = x + 50;
  }
}

// other color scheme options:
// r = 255*(x/windowWidth);
// g = 255*(1 - y/windowHeight);
// b = 255* (1 - y/windowHeight)
