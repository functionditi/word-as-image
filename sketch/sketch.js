// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let features = {}
let visuals = []



function setup() {
  createCanvas(windowWidth, windowHeight);
  var dataURL = canvas.toDataURL();
console.log(dataURL);
   //background(255);
  video = createCapture(VIDEO);
  video.size(width, height);
  rectMode(CENTER);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });
  video.hide();
  
}

function modelReady() {
  //select('#status').html('Model Loaded');
}

function draw() {
  
 
  //image(video, 0, 0, width, height);
   
  drawKeypoints();
  for (var p in features) {
    if( features.hasOwnProperty(p) ) {
      if(Math.abs(features[p].dx) > 2) {
      	visuals.push(new Visual(features[p].x, features[p].y));
      }
    } 
  }  
  
  visuals.forEach(el => {
  	el.draw();
  })
  
}

class Visual {
	constructor(theX, theY) {
  	this.x = theX;
    this.y = theY;
    this.col = color(random(255),random(255),random(255));
    //this.age = 0;
    this.limit = 100;
  }
  
  draw() {
  	push();
    translate(this.x, this.y);
    fill(0);
    pop();
    visuals.splice(visuals.indexOf(this), 1);
  }
}


function drawKeypoints()  {
 
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      let matchPoints = ['nose'];
      let sep=50;
      let n=8;
      let w=width/n;
      let h=height/n;

  for (let i=0; i<width-0; i+=w){
    for (let j=0; j<height-0; j+=h){
      push();
     let circ;
      if (matchPoints.indexOf(keypoint.part)>-1 && keypoint.score > 0.3) {
  
      //    if (-keypoint.position.x+width>=i && -keypoint.position.x+width<i+w && keypoint.position.y>=j && keypoint.position.y<j+h){
      //   fill(255);
      //   circ=0;
      // }
      //   else{
      //     circ=1;

      if (mouseX>=i && mouseX<i+w && mouseY>=j && mouseY<j+h){
        fill(255);
        circ=0;
      }
        else{
          circ=1;
    noStroke();
    noFill();
        }
        if(!(keypoint.part in features)) {
        	features[keypoint.part] = {
          	x:keypoint.position.x,
            y:keypoint.position.y,
            px:keypoint.position.x,
            py:keypoint.position.y,
            dx:0,
            dy:0
          }
        }
        features[keypoint.part].x = keypoint.position.x
        features[keypoint.part].y = keypoint.position.y
        features[keypoint.part].dx = features[keypoint.part].px - keypoint.position.x
        features[keypoint.part].dy = features[keypoint.part].py - keypoint.position.y
        features[keypoint.part].px = keypoint.position.x
        features[keypoint.part].py = keypoint.position.y
      } else {
      	delete features[keypoint.part];
        
      }
        ellipse(i+w/2, j+h/2, w, h);
        pop();
    }
  }
      noStroke();
      //stroke(0);
   noFill();
    }
  }
}

function keyPressed() {
  if (keyCode==83) {
    saveCanvas('png');
  }
}
