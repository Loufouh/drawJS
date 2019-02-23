"use strict";

let canvas;

window.onload = init;

function init() {
	canvas = document.querySelector("canvas");
	setTargetContext(canvas.getContext("2d"));

	background(Color.hsl(200, 100, 10));
	stroke(Color.rgb(255));
	strokeWeight(3);
	lineJoin('round');

	grid(new Vector(100, 100), new Vector(51, 51), new Vector(0, 0), new Vector(400, 400))

	lineDashOffset(2);
	setLineDash([5, 10]);

	line(10, 10, 600, 100);

	let imgData = createImageData(100, 500);

	mapImageData(imgData, pickColor);
	putImageData(imgData, 600, 100);

	let linearGradient = createLinearGradient(10, 525, 510, 675);
	
	linearGradient.addColorStop(0.25, 'hsl(200, 100%, 10%)');
	linearGradient.addColorStop(0.3, 'rgb(100, 255, 10)');
	linearGradient.addColorStop(0.75, 'rgb(255, 15, 10)');
	linearGradient.addColorStop(1, 'hsl(200, 100%, 10%)');
	
	noStroke();
	fillGradient(linearGradient);

	rect(10, 525, 500, 150);
}

function pickColor() {
	return new Color( 51*Math.floor(Math.random()*6),
			  51*Math.floor(Math.random()*6),
			  51*Math.floor(Math.random()*6) );
}
