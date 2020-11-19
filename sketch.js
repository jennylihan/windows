var x = 0;
var y = 0;
let emotions = [];
let displayRussell = false;
let space = false;
let help = false;
let displayAll = false;
var database;
var userId = "";
let RussellList = [[5, 55,"miserable" ], [15, 60, "sad"], [20, 70, "depressed"], [30, 80, "bored"], [40, 85, "droopy"], [45, 90, "exhausted"], [25, 30, "annoyed"], [20, 25, "frustrated"], [15, 20, "distressed"],[35, 20, "afraid"], [45, 10, "angry"], [60, 10, "astonished"], [77, 20, "excited"], [85, 40, "delighted"],[90, 45, "happy"],[90, 55, "pleased"],[85, 70, "serene"],[80, 75, "satisfied"],[80, 80, "calm"], [55, 90, "sleepy"]];
let particles = [];
let displayed_emotions = [];

// this class describes the properties of a single particle.
class Particle {
// setting the co-ordinates, radius and the
// speed of a particle in both the co-ordinates axes.
  constructor(){
    this.x = random(0,windowWidth);
    this.y = random(0,windowHeight);
    this.r = random(1,8);
    this.xSpeed = random(-2,2);
    this.ySpeed = random(-1,1.5);
  }

// creation of a particle.
  createParticle(color) {
    if (!space){
      strokeWeight(1);
    }
    stroke('white');
    fill(color);
    circle(this.x,this.y,this.r);
    strokeWeight(0);
  }

// setting the particle in motion.
  moveParticle() {
    if(this.x < 0 || this.x > windowWidth)
      this.xSpeed*=-1;
    if(this.y < 0 || this.y > windowHeight)
      this.ySpeed*=-1;
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
  }

}

function setup() {
  background(0);
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseClicked(markWord);
  textSize(25);
  textAlign(LEFT, CENTER);
  // Initialize Firebase
  config = {
    apiKey: "AIzaSyDmDbY6zDPha9ZoO7p7vzRlmq30Equb7w4",
    authDomain: "emotions-70dd0.firebaseapp.com",
    databaseURL: "https://emotions-70dd0.firebaseio.com",
    projectId: "emotions-70dd0",
    storageBucket: "emotions-70dd0.appspot.com",
    messagingSenderId: "157526024323",
    appId: "1:157526024323:web:fa35041601ccbc3f4efbb6",
    measurementId: "G-VXC8KS5716"
  };

  firebase.initializeApp(config);
  database = firebase.database();

  var ref = database.ref('users');
  ref.on('value', gotData, errData);

  button = createButton('< help >');
  button.position(windowWidth*.01, 20);
  button.mousePressed(helpButton);
  button.style('border', 'none');
  button.style('color', 'white');
  button.style('background-color', 'Transparent');
  button.style('outline', 'none');
  button2 = createButton('< save >');
  button2.position(windowWidth*.01, 40);
  button2.mousePressed(saveButton);
  button2.style('border', 'none');
  button2.style('color', 'white');
  button2.style('background-color', 'Transparent');
  button2.style('outline', 'none');

  for(let i = 0;i<windowWidth/10;i++){
    particles.push(new Particle());
  }
}

function draw() {
  if (space) {
    background('black');
  } else {
    background(mapColor(mouseX,mouseY));
  }
  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle(mapColor(mouseX, mouseY));
    particles[i].moveParticle();
  }
  fill('white');
  text('pleasant →', windowWidth *.90, windowHeight/2);
  text('← miserable', windowWidth * 0.01, windowHeight/2);
  text('↑ high energy', windowWidth/2 - 50, windowHeight*0.025);
  text('↓ low energy', windowWidth/2 - 50, windowHeight*0.965);
  // drawEmotions(emotions);
  if (displayRussell){
    drawEmotions(RussellList);
  }
  if (displayAll){
    drawEmotions(emotions);
  } else {
    drawEmotions(displayed_emotions);
  }
  drawEmotions(displayed_emotions);
  slowRevealEmotions();
  fill(0,0,0,0);
  strokeWeight(4)
  stroke('white');
  ellipse(mouseX,mouseY,100,100);
  strokeWeight(0);
  checkIfOutOfBounds();
}

function helpButton() {
  alert("HOVER MOUSE to move.\nCLICK to mark an emotion location.\nTAB to toggle the circumplex labels.\nENTER to toggle the hidden emotions.\nSPACE to toggle black background. ");
  textSize(25);
}

function saveButton() {
  var username = prompt("What should we file this under?", "jenny's music");
  submitData(username);
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

function slowRevealEmotions(){
  emotions.forEach(function(item, index, array) {
    x1 = map(item[0], 0, 100, 0, windowWidth);
    y1 = map(item[1], 0, 100, 0, windowHeight);
    if (mouseX < x1 + 50 && mouseX > x1 - 50 && mouseY < y1 + 50 && mouseY > y1 - 50){
      fill('white');
      text(item[2], x1, y1);
      console.log(item[2]);
      displayed_emotions.push(item);
    }
  });
}

function mapColor(x, y){
  colorMode(HSB, 100);
  h = 5+95*(x/windowWidth);
  s = 5+95*(y/windowHeight);
  b = 5+95*(1 - y/windowHeight);
  return color(h, s, b);
}

function checkIfOutOfBounds(){
  if (mouseX < 0 || mouseX >= windowWidth || mouseY <0 || mouseY >= windowHeight ){
    mouseX = windowWidth/2;
    mouseY = windowHeight/2;
    alert("That's uncharted territory!");
  }
}

function gotData (data) {
  if (data.val() != null){
    var users = data.val();
    var keys = Object.keys(users);
    var username = localStorage.getItem('username');
    for (var i = 0; i < keys.length; i++) {
  	   var k = keys[i];
  	   var list = users[k].emotionlist;
  	   var name = users[k].name;
       if (name == username){
         emotions = users[keys[i]].emotionlist;
         userId = keys[i];
      }
    }
  }
}

function submitData(username) {
	var data = {
		name: username,
	  emotionlist: emotions
	}
  console.log(userId);
  console.log(username);
  if (userId == ""){
    var ref = database.ref('users');
    ref.push(data);
  } else {
    database.ref('users/' + userId).set(data);
  }
}


function errData(err) {
	console.log('Error!');
  	console.log(err);
}

function markWord(){
  var txt;
  var emotion = prompt("Mark this spot with a word:", "joy");
  if (emotion != null && emotion != "") {
    txt = emotion;
    newx = map(mouseX, 0, windowWidth, 0, 100);
    newy = map(mouseY, 0, windowHeight, 0, 100);
    emotions.push([newx, newy, txt]);
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
  } else if (keyCode === ENTER) {
    displayAll = !displayAll;
  } else if (keyCode === TAB) {
    keyCode = 0;
    displayRussell = !displayRussell;
  } else if (keyCode === 32) {
    space = !space;
  }
}
