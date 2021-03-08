let notosans;
function preload() {
  notosans = loadFont(
    "https://cdn.glitch.com/d343bc20-d576-4fcf-8829-86baa7d563d6%2FNotoSansSC-Regular.otf?v=1605939143378"
  );
}

var x = 0;
var y = 0;
let displayed_emotions = new Set();

let x1 = 100;
let y1 = 100;
let x2 = 200;
let y2 = 300;
let width = x2 - x1;
let height = y2 - y1;

function setup() {
  background(0);
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseClicked(markCorner);
  textSize(35);
  textFont(notosans);
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

  // firebase.initializeApp(config);
  // database = firebase.database();
  // var ref = database.ref("users");
  // ref.on("value", gotData, errData);

  // button = createButton("< help >");
  // button.position(windowWidth * 0.01, windowHeight * 0.88);
  // button.mousePressed(helpButton);
  // button.style("border", "none");
  // button.style("color", "white");
  // button.style("background-color", "Transparent");
  // button.style("outline", "none");
  // button.style("font-size", "30px");
  // button.style("font-family", "Inconsolata");
  // username = localStorage.getItem("username");

  textSize(27);
  mouseX = windowWidth * 0.5;
  mouseY = windowHeight * 0.5;

  background(0);
  translate(140, 0);
}


function draw() {
  noSmooth();
  // Draw gray box
  stroke(200);
  line(x1, y1, x1, y1+height);
  line(x1, y1, x1+width, y1);
  line(x1, y1+height, x2, y2);
  line(x1+width, y1, x2, y2);
}

function markCorner(){
  x2 = x1;
  y2 = y1;
  x1 = mouseX;
  y1 = mouseY;
}

function helpButton() {
  alert(
    "HOVER MOUSE to move.\nCLICK to mark an emotion location.\nTAB to toggle the circumplex labels.\nENTER to toggle the hidden emotions.\nSPACE to toggle black background. "
  );
}

function saveButton() {
  alert("Saving and filing under..." + username);
  submitData(username);
}

// function gotData(data) {
//   if (data.val() != null) {
//     var users = data.val();
//     var keys = Object.keys(users);
//     for (var i = 0; i < keys.length; i++) {
//       var k = keys[i];
//       var list = users[k].emotionlist;
//       var name = users[k].name;
//       if (name == username) {
//         emotions = users[keys[i]].emotionlist;
//         userId = keys[i];
//         console.log(keys[i]);
//       }
//     }
//   }
// }

// function submitData(username) {
//   var data = {
//     name: username,
//     emotionlist: emotions
//   };
//   if (userId == "") {
//     var ref = database.ref("users");
//     ref.push(data);
//   } else {
//     database.ref("users/" + userId).set(data);
//   }
// }

// function errData(err) {
//   console.log("Error!");
//   console.log(err);
// }

function keyPressed() {
  if (keyCode === ENTER) {
    displayAll = !displayAll;
  } else if (keyCode === TAB) {
    keyCode = 0;
    displayRussell = !displayRussell;
  } else if (keyCode === 32) {
    space = !space;
  }
}
