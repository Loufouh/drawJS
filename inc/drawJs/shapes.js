"use strict";

let targetContext;

/**
 * Target a canvas' context (so you won't have to specify it everywhere).
 * @param ctx The canvas' context.
 */
function setTargetContext(ctx) {
	targetContext = ctx;
}

/**
 * Set the stroke weight.
 * @param weight The weight.
 * @param ctx The canvas' context.
 */
function strokeWeight(weight, ctx=targetContext) {
	ctx.lineWidth = weight;
}

/**
 * Draw border for the canvas.
 * @param color The color.
 * @param ctx The canvas' context.
 */
function border(color, ctx=targetContext) {
	noFill();
	stroke(color, ctx);
	rect(
		0,
		0,
		ctx.canvas.width,
		ctx.canvas.height,
		ctx
	);
}

/**
 * Draw a circle.
 * @param xCenter The coordinate of the circle (based on its center).
 * @param yCenter The coordinate of the circle (based on its center).
 * @param radius The radius of the circle.
 * @param ctx The canvas' context.
 */
function circle(xCenter, yCenter, radius, ctx=targetContext) {
	arc(
		xCenter,
		yCenter,
		radius,
		0,
		2*Math.PI,
		false,
		ctx
	);
}

/**
 * Draw an arc.
 * @param xCenter The coordinate of the arc (based on its center).
 * @param yCenter The coordinate of the arc (based on its center).
 * @param radius The radius of the arc.
 * @param startAngle The start angle of the arc (in radians).
 * @param stopAngle The stop angle of the arc (in radians).
 * @param counterClockwise True to draw counter-clockwise, False to draw it clockwise.
 * @param ctx The canvas' context.
 */
function arc(xCenter, yCenter, radius, startAngle, stopAngle, counterClockwise=false, ctx=targetContext) {
	ctx.beginPath();
	ctx.arc(xCenter, yCenter, radius, startAngle, stopAngle);

	drawShape(ctx);

	ctx.closePath();
}

/**
 * Draw a rectangle.
 * @param xLeft The x coordinate of the rectangle (based on the top left corner).
 * @param yTop The y coordinate of the rectangle (based on the top left corner).
 * @param width The width of the rectangle.
 * @param height The height of the rectangle.
 * @param ctx The canvas' context.
 */
function rect(xLeft, yTop, width, height, ctx=targetContext) {
	ctx.beginPath();
	ctx.rect(xLeft, yTop, width, height);

	drawShape(ctx);

	ctx.closePath();
}

/**
 * Draw a grid.
 * @param pos The position of the grid as a Vector (based on the top left corner).
 * @param scales The dimension of each square as a Vector.
 * @param separators The dimension of each separator as a Vector.
 * @param dimensions The dimensions of the grid as a Vector.
 */
function grid(pos, scales, separators, dimensions) {
	rect(pos.x, pos.y, dimensions.x, dimensions.y);

	// Draw vertical lines
	for(let i = (pos.x + scales.x) ; i <= (pos.x + dimensions.x - 1); i += scales.x) {
		line(i, pos.y, i, (pos.y + dimensions.y));
		i += separators.x;
		line(i, pos.y, i, (pos.y + dimensions.y));
	}

	// Draw horizontal lines
	for(let j = (pos.y + scales.y) ; j <= (pos.y + dimensions.y - 1); j += scales.y) {
		line(pos.x, j, (pos.x + dimensions.x), j);
		j += separators.y;
		line(pos.x, j, (pos.x + dimensions.x), j);
	}
}


/**
 * Draw a line.
 * @param x1 The x coordinate of the first point.
 * @param y1 The y coordinate of the first point.
 * @param x2 The x coordinate of the second point.
 * @param y2 The y coordinate of the second point.
 * @param ctx The canvas' context.
 */
function line(x1, y1, x2, y2, ctx=targetContext) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);

	drawShape(ctx);

	ctx.closePath();
}

/**
 * Draw an image.
 * @param img The image to draw.
 * @param sx The x coordinate of the source image sub-rectangle (based on the top left corner).
 * @param sy The y coordinate of the source image sub-rectangle (based on the top left corner).
 * @param sWidth The width of the source image sub-rectangle.
 * @param sHeight The height of the source image sub-rectangle.
 * @param dx The x coordinate on the canvas (based on the top left corner).
 * @param dy The y coordinate on the canvas (based on the top left corner).
 * @param dWidth The width of the image on the canvas.
 * @param dHeight The height of the image on the canvas.
 * @param ctx The canvas' context.
 */
function drawImage(img, sx, sy, sWidth=img.width, sHeight=img.height, dx, dy, dWidth, dHeight, ctx=targetContext) {
	if(dx === undefined) {
		ctx.drawImage(img, sx, sy, sWidth, sHeight);
	} else {
		ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
	}
}
