"use strict";

// https://whatwebcando.today/device-motion.html
// https://www.raymondcamden.com/2017/04/25/using-device-motion-on-the-web/
// https://github.com/cfjedimaster/webdemos

function main() {

	window.addEventListener("devicemotion", motion, false);

	var lastX, lastY, lastZ;
	var moveCounter = 0;
	var trackThresh = 0.01;
	var countThresh = 2.0;
	var activeThresh = 20.0;

	var box = document.getElementById("box");
	var light = document.getElementById("light");
	var lightOn = false;

	var acc = {
	  x:0,
	  y:0,
	  z:0
	};

	function motion(e) {

		acc.x = e.acceleration.alpha;
		acc.y = e.acceleration.beta;
		acc.z = e.acceleration.gamma;
		
		//if (!acc.hasOwnProperty("x")) {
			//acc = e.accelerationIncludingGravity;
		//}

		//var acc = e.accelerationIncludingGravity;

		//if (!acc.x) return;

		// only fires if x,y,z > threshold
		if (Math.abs(acc.x) >= trackThresh && Math.abs(acc.y) >= trackThresh && Math.abs(acc.z) >= trackThresh) {
			if (!lastX) {
				lastX = acc.x;
				lastY = acc.y;
				lastZ = acc.z;
				return;
			}

			var deltaX = Math.abs(acc.x - lastX);
			var deltaY = Math.abs(acc.y - lastY);
			var deltaZ = Math.abs(acc.z - lastZ);
			
			if (deltaX + deltaY + deltaZ >= countThresh) {
				moveCounter++;
			} else {
				moveCounter = Math.max(0, --moveCounter);			
			}

			lastX = acc.x;
			lastY = acc.y;
			lastZ = acc.z;
		}

		if (moveCounter >= activeThresh) {
			console.log("SHAKE!");
			lightOn = !lightOn;
			moveCounter = 0;
			document.body.style.backgroundColor = "yellow";
		} else if (moveCounter < trackThresh) {
			document.body.style.backgroundColor = "blue";
		}
			
		var boxText = "<b>thresh:</b> " + moveCounter + "/" + activeThresh;
		boxText += "<br><br><b>x:</b> " + round(lastX, 3) + "<br><b>y:</b> " + round(lastY, 3) + "<br><b>z:</b> " + round(lastZ, 3);
		box.innerHTML = boxText;

		if (lightOn) {
			light.innerHTML = "O";
			light.style.backgroundColor = "green";
		} else {
			light.innerHTML = "X";
			light.style.backgroundColor = "red";
		}
	}

	function round(number, precision) {
	  	var factor = Math.pow(10, precision);
	  	return Math.round(number * factor) / factor;
	}

}

window.onload = main;

/*
var acc = {
  x:0,
  y:0,
  z:0
};

var count = 0;

if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', getDeviceRotation, false);
}else{
  $(".accelerometer").html("NOT SUPPORTED")
}

var x_0 = $V([acc.x, acc.y, acc.z]); //vector. Initial accelerometer values

//P prior knowledge of state
var P_0 = $M([
              [1,0,0],
              [0,1,0],
              [0,0,1]
            ]); //identity matrix. Initial covariance. Set to 1
var F_k = $M([
              [1,0,0],
              [0,1,0],
              [0,0,1]
            ]); //identity matrix. How change to model is applied. Set to 1
var Q_k = $M([
              [0,0,0],
              [0,0,0],
              [0,0,0]
            ]); //empty matrix. Noise in system is zero

var KM = new KalmanModel(x_0,P_0,F_k,Q_k);

var z_k = $V([acc.x, acc.y, acc.z]); //Updated accelerometer values
var H_k = $M([
              [1,0,0],
              [0,1,0],
              [0,0,1]
            ]); //identity matrix. Describes relationship between model and observation
var R_k = $M([
              [2,0,0],
              [0,2,0],
              [0,0,2]
            ]); //2x Scalar matrix. Describes noise from sensor. Set to 2 to begin
var KO = new KalmanObservation(z_k,H_k,R_k);

//each 1/2th second take new reading from accelerometer to update
var getNewPos = window.setInterval(function(){

  // if(count < 20){

    KO.z_k = $V([acc.x, acc.y, acc.z]); //vector to be new reading from x, y, z
    KM.update(KO);

    //$(".accelerometer").html("x:" +acc.x+", y:" +acc.y+", z:" +acc.z);
    console.log(KM.x_k.elements[0], KM.x_k.elements[1], KM.x_k.elements[2]);
    $(".kalman-result").html(" x:" +KM.x_k.elements[0]+", y:" +KM.x_k.elements[1]+", z:" +KM.x_k.elements[2]);
    $(".difference").html(" x:" +(acc.x-KM.x_k.elements[0])+", y:" +(acc.y-KM.x_k.elements[1])+", z:" +(acc.z-KM.x_k.elements[2]))
    // count++;
  //}
}, 100);

 //read event data from device
function getDeviceRotation(evt){
 
    // gamma is the left-to-right tilt in degrees, where right is positive
    // beta is the front-to-back tilt in degrees, where front is positive
    // alpha is the compass direction the device is facing in degrees
    acc.x = evt.alpha;
    acc.y = evt.beta;
    acc.z = evt.gamma; 
    $(".accelerometer").html(" x:" +acc.x+", y:" +acc.y+", z:" +acc.z);
}
*/
