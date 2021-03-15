let notosans;let img;

this.crossOrigin = 'anonymous';
	
	function preload() {
	  notosans = loadFont(
	    "https://cdn.glitch.com/d343bc20-d576-4fcf-8829-86baa7d563d6%2FNotoSansSC-Regular.otf?v=1605939143378"
	    );
	}
	
	var x = 0;
	var y = 0;
	let displayed_emotions = new Set();
	
	let x1 = 0;
	let y1 = 0;
	let x2 = x1 + 40;
	let y2 = y1 + 40;
	let even = true;
	let angle = 0;
	
	function setup() {
	  background(0);
	  angleMode(DEGREES);
	  cnv = createCanvas(windowWidth, windowHeight, WEBGL);
	  // cnv = createCanvas(windowWidth, windowHeight);
	  cnv.mouseClicked(markCorner);
	  textSize(35);
	  textFont(notosans);
	  textAlign(LEFT, CENTER);
	  img = createImg('https://cdn.glitch.com/32b5db6a-e476-4e16-aec6-aacf0ab94b13%2Fchinatown.jpg?v=1615496210201');
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
	  background(0);
	  translate(140, 0);
	}
	
	function draw() {
	    noSmooth();
	    clear();
	    // image(img, -1*windowWidth/2,-1*windowHeight/2); 
	    // Draw gray box
	    stroke('crimson');
	    let width = Math.abs(x2 - x1);
	    let height = Math.abs(y2 - y1);
	    rotate_maybe();
	    line(x1, y1, x1, y1+height);
	    line(x1, y1, x1+width, y1);
	    line(x1, y1+height, x2, y2);
	    line(x1+width, y1, x2, y2);
	    // grid_s(x1, y1, x2, y2, 7, 7);
	    outlock(x1, y1, Math.abs(x1 - x2)/7);
	    // outlock(x1+100, y1-200, Math.abs(x1 - x2)/7);
	}
	
	function markCorner(){
	  x1 = mouseX - windowWidth/2;
	  y1 = mouseY - windowHeight/2;
	  x2 = x1+600;
	  y2 = y1+600;
	  angle=0;
	}
	
	function grid_s(x_1, y_1, x_2, y_2, num_rows, num_cols){
	  let w = Math.abs(x_1 - x_2)/num_rows;
	  let h = Math.abs(y_1 - y_2)/num_cols;
	  for (let i = 0; i < num_cols; i++){
	    for (let j = 0; j < num_rows; j++){
	        strokeWeight(2);
	        noFill();
	        rect(x_1 + w*i, y_1 + h*j, w, h);
	    }  
	  }
	}
	
	function add_spikes(x, y, side, unit){
	    strokeWeight(15);
	    line(x, y, x, y-unit); //top
	    line(x+side, y, x+side + unit, y); //right
	    line(x+side, y+side, x+side, y+side+unit);//bottom
	    line(x, y+side, x-unit, y+side); //left
	}
	
	function outlock(x_1, y_1, side){
	    let outlock_list = [[3*side, side], [2*side, 3*side], [1*side, 5*side]];
	    outlock_list.forEach(function(coord) {
	        strokeWeight(15);
	        let offset = coord[0];
	        let wid = coord[1];
	        rect(x_1 + offset, y_1 + offset, wid, wid);
	        add_spikes(x_1+offset, y_1+offset, wid, side);
	    });
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
	
	function rotate_maybe(){
	  rotateY(angle);
	}
	
	
	function keyPressed() {
	  if (keyCode === UP_ARROW) {
	    angle += 5;
	  } else if (keyCode === DOWN_ARROW) {
	    angle -= 5;
	  } else if (keyCode === 32) {
	    space = !space;
	  }
	}