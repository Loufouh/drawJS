"use strict";

/**
 * Do an action for each pixel of an image's data.
 * @param imgData The image's data.
 * @param func The function to apply.
 * @param use2DCoordinates True if the function needs x and y, false if it needs pixel index.
 */
function foreachImageData(imgData, func, use2DCoordinates=true) {
	foreachImageDataRect(0, 0, imgData.width, imgData.height, imgData, func, use2DCoordinates);
}

/**
 * Map each pixel of an image's data.
 * @param imgData The image's data.
 * @param func The function to apply (it has to return a Color object).
 * @param use2DCoordinates True if the function needs x and y, false if it needs pixel index.
 * @returns {*} The new image's data.
 */
function mapImageData(imgData, func, use2DCoordinates=true) {
	return mapImageDataRect(0, 0, imgData.width, imgData.height, imgData, func, use2DCoordinates);
}

/**
 * Do an action for each pixel of a rectangular region of an image's data.
 * @param posX The x coordinate of the region (based on the top left corner).
 * @param posY The y coordinate of the region (based on the top left corner).
 * @param width The width of the region.
 * @param height The height of the region.
 * @param imgData The image's data.
 * @param func The function to apply.
 * @param use2DCoordinates True if the function needs x and y, false if it needs pixel index.s
 */
function foreachImageDataRect(posX, posY, width, height, imgData, func, use2DCoordinates=true) {
	if(use2DCoordinates) {
		mapImageDataRect(posX, posY, width, height, imgData, (pixel, x, y) => {

			func(pixel, x, y);
			return pixel;

		}, use2DCoordinates)
	} else {
		mapImageDataRect(posX, posY, width, height, imgData, (pixel, x, y) => {

			func(pixel, x, y);
			return pixel;

		}, use2DCoordinates);
	}
}

/**
 * Map each pixel of a rectangular region of an image's data.
 * @param posX The x coordinate of the region (based on the top left corner).
 * @param posY The y coordinate of the region (based on the top left corner).
 * @param width The width of the region.
 * @param height The height of the region.
 * @param imgData The image's data.
 * @param func The function to apply (it has to return a Color object).
 * @param use2DCoordinates True if the function needs x and y, false if it needs pixel index.s
 * @returns {*} The new image's data.
 */
function mapImageDataRect(posX, posY, width, height, imgData, func, use2DCoordinates=true) {
	if( ( posX < 0 || posX + width > imgData.width ) ||
	    ( posY < 0 || posY + height > imgData.height ) )
		return error("The position and the dimensions precised don't match with imgData's dimensions.", imgData);
	
	if( (use2DCoordinates && func(new Color(0), 0, 0) === undefined ) || 
	    (!use2DCoordinates && func(new Color(0), 0, 0) === undefined) ) 
		return error("The output of func is undefined.", imgData)

	for(let x = posX; x < (posX + width); x++) {
		for(let y = posY; y < (posY + height); y++) {
			if(use2DCoordinates)
				setPixel( x, y, imgData, func( getPixel(x, y, imgData), x, y) );
			else
				setPixel( x, y, imgData, func( getPixel(x, y, imgData), getPixelIndex(x, y, imgData) ) );
		}
	}
	return imgData;
}

/**
 * Get a pixel of an image's data.
 * @param x The x coordinate of the pixel.
 * @param y The y coordinate of the pixel.
 * @param imgData The image's data.
 * @returns {Color} The pixel (as a Color object).
 */
function getPixel(x, y, imgData) {
	return getPixelByIndex( getPixelIndex(x, y, imgData) , imgData);
}

/**
 * Set a pixel of an image's data.
 * @param x The x coordinate of the pixel.
 * @param y The y coordinate of the pixel.
 * @param imgData The image's data.
 * @param color The pixel to set (as a Color object).
 */
function setPixel(x, y, imgData, color) {
	setPixelByIndex(getPixelIndex(x, y, imgData), imgData, color);
}

/**
 * Set a pixel of an image's data.
 * @param i The index of the pixel.
 * @param imgData The image's data.
 * @param color The pixel to set (as a Color object).
 */
function setPixelByIndex(i, imgData, color) {
	imgData.data[i*4] = color.r;
	imgData.data[i*4 + 1] = color.g;
	imgData.data[i*4 + 2] = color.b;
	imgData.data[i*4 + 3] = Math.floor(color.a*255);
}

/**
 * Get a pixel of an image's data.
 * @param i The index of the pixel.
 * @param imgData The image's data.
 * @returns {Color} The pixel to get (as a Color object).
 */
function getPixelByIndex(i, imgData) {	
	return new Color( imgData.data[i*4],
			  imgData.data[i*4 + 1],
			  imgData.data[i*4 + 2],
			  Math.floor(imgData.data[i*4 + 3]/255) );
}

/**
 * Calculate pixel's index from its cartesian coordinates.
 * @param x The x coordinate.
 * @param y The y coordinate.
 * @param imgData The image's data.
 * @returns {*} The index of the pixel.
 */
function getPixelIndex(x, y, imgData) {
	if(x < 0 || x >= imgData.width)
		return error("x has a wrong value ! (" + x + ")", 0);
	if(y < 0 || y >= imgData.height)
		return error("y has a wrong value ! (" + y + ")", 0);

	return y*imgData.width + x;
}

/**
 * Create an image's data
 * @param width The width
 * @param height The height
 * @param ctx The canvas' context.
 * @returns {ImageData} The image's data.
 */
function createImageData(width, height, ctx=targetContext) {
	return ctx.createImageData(width, height, ctx);
}

/**
 * Get the image's data of the region of the canvas.
 * @param x The x coordinate of the region (based on the top left corner).
 * @param y The y coordinate of the region (based on the top left corner).
 * @param width The width of the region.
 * @param height The height of the region.
 * @param ctx The canvas' context.
 * @returns {ImageData} The image's data.
 */
function getImageData(x, y, width, height, ctx=targetContext) {
	return ctx.getImageData(x, y, width, height);
}

/**
 * Write an image's data on the canvas.
 * @param imgData The image's data.
 * @param x The x coordinate (based on the top left corner).
 * @param y The y coordinate (based on the top left corner).
 * @param ctx The canvas' context.
 */
function putImageData(imgData, x, y, ctx=targetContext) {
	ctx.putImageData(imgData, x, y);
}

/**
 * Fill an image's data with a single value.
 * @param imgData The image's data.
 * @param value The value (as a Color object).
 * @returns {*} The new image's data.
 */
function fillImageData(imgData, value) {
	return mapImageData(imgData, () => value);
}

