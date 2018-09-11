"use strict";

let canvas;

window.onload = init;

function init() {
	canvas = document.querySelector("canvas");
	setTargetContext(canvas.getContext("2d"));

	background(Color.hsla(140, 100, 50, 0.5));
}
