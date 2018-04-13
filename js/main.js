"use strict";

// https://whatwebcando.today/device-motion.html
// https://www.raymondcamden.com/2017/04/25/using-device-motion-on-the-web/
// https://github.com/cfjedimaster/webdemos

function main() {

	window.addEventListener('devicemotion', motion, false);

	var lastX, lastY, lastZ;
	var moveCounter = 0;
	var trackThresh = 1;
	var countThresh = 3;
	var shakeThresh = 20;

	var box = document.getElementById("box");

	function motion(e) {
		var acc = e.acceleration;
		if (!acc.hasOwnProperty('x')) {
			acc = e.accelerationIncludingGravity;
		}

		if (!acc.x) return;

		// only fires if x,y,z > threshold
		//if (Math.abs(acc.x) > trackThresh && Math.abs(acc.y) > trackThresh && Math.abs(acc.z) > trackThresh) {
		if (!lastX) {
			lastX = acc.x;
			lastY = acc.y;
			lastZ = acc.z;
			return;
		}

		var deltaX = Math.abs(acc.x - lastX);
		var deltaY = Math.abs(acc.y - lastY);
		var deltaZ = Math.abs(acc.z - lastZ);
		
		if (deltaX + deltaY + deltaZ > countThresh) {
			moveCounter++;
		} else {
			moveCounter = Math.max(0, --moveCounter);
		}

		lastX = acc.x;
		lastY = acc.y;
		lastZ = acc.z;
		//} else {
			//moveCounter = Math.max(0, --moveCounter);			
		//}

		if (moveCounter > shakeThresh) {
			console.log('SHAKE!!!');
			document.body.style.backgroundColor = "red";
		} else if (moveCounter === 0) {
			document.body.style.backgroundColor = "blue";
		}
			
		box.innerHTML = "counter: " + moveCounter + "/" + shakeThresh + "<br>" + acc;
	}

}

window.onload = main;