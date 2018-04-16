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

	function motion(e) {
		/*
		// This produces different results on iOS and Android.
		var acc = e.acceleration;
		if (!acc.hasOwnProperty("x")) {
			acc = e.accelerationIncludingGravity;
		}
		*/
		var acc = e.accelerationIncludingGravity;

		if (!acc.x) return;

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
