"use strict";

let canvas;

window.onload = init;

function init() {
	canvas = document.querySelector("canvas");
	setTargetContext(canvas.getContext("2d"));

	background(Color.hsl(200, 100, 10));
	stroke(Color.rgb(255));
	grid(new Vector(100, 100), new Vector(51, 51), new Vector(0, 0), new Vector(400, 400))

	let imgData = createImageData(100, 500);

	for(let i = 0; i < imgData.data.length; i += 4) {
		imgData.data[i] = randomInt();
		imgData.data[i + 1] = pickComposant();
		imgData.data[i + 2] = pickComposant();
		imgData.data[i + 3] = 255;
	}

	putImageData(imgData, 600, 100);
}

function pickComposant() {
	return 51*Math.floor(Math.random()*6);
}
