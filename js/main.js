"use strict";

// https://whatwebcando.today/device-motion.html
// https://www.raymondcamden.com/2017/04/25/using-device-motion-on-the-web/
// https://github.com/cfjedimaster/webdemos

function main() {

	window.addEventListener('devicemotion', motion, false);

	let lastX, lastY, lastZ;
	let moveCounter = 0;

	function motion(e) {
		let acc = e.acceleration;
		if (!acc.hasOwnProperty('x')) {
			acc = e.accelerationIncludingGravity;
		}

		if (!acc.x) return;

		// only log if x,y,z > 1
		if (Math.abs(acc.x) >= 1 && Math.abs(acc.y) >= 1 && Math.abs(acc.z) >=1) {
			// console.log('motion', acc);
			if (!lastX) {
				lastX = acc.x;
				lastY = acc.y;
				lastZ = acc.z;
				return;
			}

			let deltaX = Math.abs(acc.x - lastX);
			let deltaY = Math.abs(acc.y - lastY);
			let deltaZ = Math.abs(acc.z - lastZ);
			
			if (deltaX + deltaY + deltaZ > 3) {
				moveCounter++;
			} else {
				moveCounter = Math.max(0, --moveCounter);
			}

			if (moveCounter > 10) {
				console.log('SHAKE!!!');
				document.body.style.backgroundColor = "red";
				moveCounter = 0;
			}

			lastX = acc.x;
			lastY = acc.y;
			lastZ = acc.z;
		}
	}
}

window.onload = main;