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

function setPixel(x, y, imgData, color) {
	let i = getPixelIndex(x, y, imgData);

	imgData.data[i] = color.r;
	imgData.data[i + 1] = color.g;
	imgData.data[i + 2] = color.b;
	imgData.data[i + 3] = Math.floor(color.a*255);
}

function getPixel(x, y, imgData) {
	let i = getPixelIndex(x, y, imgData);

	return new Color( imgData.data[i],
			  imgData.data[i + 1],
			  imgData.data[i + 2],
			  Math.floor(imgData.data[i + 3]/255) );
}

function getPixelIndex(x, y, imgData) {
	if(x < 0 || x >= imgData.width)
		return error("x has a wrong value ! (" + x + ")", 0);
	if(y < 0 || y >= imgData.height)
		return error("y has a wrong value ! (" + y + ")", 0);

	return y*imgData.width + x*4;
}
