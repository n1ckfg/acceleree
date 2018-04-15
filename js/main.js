"use strict";

// https://whatwebcando.today/device-motion.html
// https://www.raymondcamden.com/2017/04/25/using-device-motion-on-the-web/
// https://github.com/cfjedimaster/webdemos

function main() {

	window.addEventListener("devicemotion", motion, false);

	var lastX, lastY, lastZ;
	var moveCounter = 0;
	var trackThresh = 0.001;
	var countThresh = 1.0;
	var activeThresh = 10.0;

	var box = document.getElementById("box");

	function motion(e) {
		var acc = e.acceleration;
		if (!acc.hasOwnProperty("x")) {
			acc = e.accelerationIncludingGravity;
		}

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
			}
				
			

			lastX = acc.x;
			lastY = acc.y;
			lastZ = acc.z;
		} else {
			moveCounter = Math.max(0, --moveCounter);			
		}

		if (moveCounter >= activeThresh) {
			console.log("SHAKE!");
			document.body.style.backgroundColor = "red";
		} else if (moveCounter < trackThresh) {
			document.body.style.backgroundColor = "blue";
		}
			
		var sayText = "<b>thresh:</b><br>" + moveCounter + "/" + activeThresh;
		sayText += "<br><br><b>x:</b> " + round(lastX, 3) + "<br><b>y:</b> " + round(lastY, 3) + "<br><b>z:</b> " + round(lastZ, 3);
		box.innerHTML = sayText;
	}

	function round(number, precision) {
	  	var factor = Math.pow(10, precision);
	  	return Math.round(number * factor) / factor;
	}

}

window.onload = main;
