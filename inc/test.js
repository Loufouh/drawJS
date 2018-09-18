"use strict";

let canvas;

window.onload = init;

function init() {
	canvas = document.querySelector("canvas");
	setTargetContext(canvas.getContext("2d"));

	background(Color.hsl(200, 100, 10));
	stroke(Color.rgb(255));
	grid(new Vector(100, 100), new Vector(51, 51), new Vector(0, 0), new Vector(400, 400))
}
