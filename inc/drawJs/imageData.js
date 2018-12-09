"use strict";

function createImageData(width, height, ctx=targetContext) {
	return ctx.createImageData(width, height, ctx);
}

function getImageData(x, y, width, height, ctx=targetContext) {
	return ctx.getImageData(x, y, width, height);
}

function putImageData(imgData, x, y, ctx=targetContext) {
	ctx.putImageData(imgData, x, y);
}
