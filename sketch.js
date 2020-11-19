var x = 0;
var y = 0;
let emotions = [];
let displayRussell = false;
let RussellList = [[5, 55,"miserable" ], [15, 60, "sad"], [20, 70, "depressed"], [30, 80, "bored"], [40, 85, "droopy"], [45, 90, "exhausted"], [25, 30, "annoyed"], [20, 25, "frustrated"], [15, 20, "distressed"],[35, 20, "afraid"], [45, 10, "angry"], [60, 10, "astonished"], [77, 20, "excited"], [85, 40, "delighted"],[90, 45, "happy"],[90, 55, "pleased"],[85, 70, "serene"],[80, 75, "satisfied"],[80, 80, "calm"], [55, 90, "sleepy"]];

function setup() {
  background(0);
  // let inp = createInput('');
  // inp.input(myInputEvent);
  createCanvas(windowWidth, windowHeight);
  textSize(25);
  textAlign(LEFT, CENTER);
  x = windowWidth/2;
  y = windowHeight/2;
}

function draw() {
  background('black');
  fill('white');
  text('pleasant →', windowWidth *.91, windowHeight/2);
  text('← miserable', windowWidth * 0.01, windowHeight/2);
  text('↑ high energy', windowWidth/2 - 50, windowHeight*0.025);
  text('↓ low energy', windowWidth/2 - 50, windowHeight*0.965);
  text('ARROW KEYS to move', windowWidth*.01, 20)
  text('SPACE BAR to mark an emotional spot', windowWidth*.01, 40)
  text('TAB to toggle circumplex labels from (Russell, 1980)', windowWidth * .01, 60)

  drawEmotions(emotions);
  if (displayRussell){
    drawEmotions(RussellList);
  }
  fill(mapColor(x, y));
  ellipse(x,y,100,100);
  checkIfOutOfBounds();
  checkKeys();
}

function drawEmotions(emotionslist){
  emotionslist.forEach(function(item, index, array) {
    x1 = map(item[0], 0, 100, 0, windowWidth);
    y1 = map(item[1], 0, 100, 0, windowHeight);
    // ellipse(x1, y1,50, 50);
    fill(mapColor(x1,y1));
    text(item[2], x1, y1);
  });
}

function mapColor(x, y){
  colorMode(HSB, 100);
  h = 100*(x/windowWidth);
  s = 100*(y/windowHeight);
  b = 100* (1 - y/windowHeight);
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
    var emotion = prompt("Mark this spot with a word:", "joy");
    if (emotion == null || emotion == "") {
      txt = "ok nvm";
    } else {
      txt = emotion;
    }
    newx = map(x, 0, windowWidth, 0, 100);
    newy = map(y, 0, windowHeight, 0, 100)
    emotions.push([newx, newy, txt]);
  }
  if (keyIsPressed && keyCode === TAB) {
    keyCode = 0;
    displayRussell = !displayRussell;
  }
}

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
