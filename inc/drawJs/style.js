"use strict";

let isStroking = true;
let isFilling = true;

/**
 * Draw the current shape.
 * @param ctx The canvas' context.
 */
function drawShape(ctx=targetContext) {
	if(isFilling)
		ctx.fill();
	if(isStroking)
		ctx.stroke();
}

/**
 * Create a radial gradient.
 * @param x1 The x coordinate of the start circle (based on its center).
 * @param y1 The y coordinate of the start circle (based on its center).
 * @param r1 The radius of the start circle.
 * @param x2 The x coordinate of the end circle (based on its center).
 * @param y2 The y coordinate of the end circle (based on its center).
 * @param r2 The radius of the end circle.
 * @param ctx The canvas' context.
 * @returns {CanvasGradient} The radial gradient.
 */
function createRadialGradient(x1, y1, r1, x2, y2, r2, ctx=targetContext) {
	return ctx.createRadialGradient(x1, y1, r1, x2, y2, r2, ctx=targetContext);
}

/**
 * Create a linear gradient.
 * @param x1 The x coordinate of the start point.
 * @param y1 The y coordinate of the start point.
 * @param x2 The x coordinate of the end point.
 * @param y2 The y coordinate of the end point.
 * @param ctx The canvas' context.
 * @returns {CanvasGradient} The linear gradient.
 */
function createLinearGradient(x1, y1, x2, y2, ctx=targetContext) {
	return ctx.createLinearGradient(x1, y1, x2, y2);
}

/**
 * Fill next shapes with a gradient.
 * @param gradient The gradient.
 * @param ctx The canvas' context.
 */
function fillGradient(gradient, ctx=targetContext) {
	ctx.fillStyle = gradient;
}

/**
 * Set strokes of next shapes to a gradient.
 * @param gradient The gradient.
 * @param ctx The canvas' context.
 */
function strokeGradient(gradient, ctx=targetContext) {
	ctx.strokeStyle = gradient;
}

/**
 * Fill next shapes with a color.
 * @param color The color.
 * @param ctx The canvas' context.
 */
function fill(color, ctx=targetContext) {
	if( !(color instanceof Color) )
		color = new Color(color);

	ctx.fillStyle = color.toString();
	isFilling = true;
}

/**
 * Set strokes of next shapes to a color.
 * @param color The color.
 * @param ctx The canvas' context.
 */
function stroke(color, ctx=targetContext) {
	if( !(color instanceof Color) )
		color = new Color(color);

	ctx.strokeStyle = color.toString();
	isStroking = true;
}

/**
 * Fill the whole canvas with a color.
 * @param color The color.
 * @param ctx The canvas' context.
 */
function background(color, ctx=targetContext) {
	fill(color, ctx);
	noStroke();
	rect(0, 0, ctx.canvas.width, ctx.canvas.height, ctx);
}

/**
 * Disable filling for next shapes (until the use of fill() or fillGradient()).
 */
function noFill() {
	isFilling = false;
}

/**
 * Disable stroke drawing for next shapes (until the use of stroke() of strokeGradient()).
 */
function noStroke() {
	isStroking = false;
}

/**
 * Set the line cap style.
 * @param type The line cap style.
 * @param ctx The canvas' context.
 */
function lineCap(type, ctx=targetContext) {
	ctx.lineCap = type;
}

/**
 * Set the line join style
 * @param type The line join style.
 * @param ctx The canvas' context.
 */
function lineJoin(type, ctx=targetContext) {
	ctx.lineJoin = type;
}

/**
 * Set the miter's limit.
 * @param value The miter's limit.
 * @param ctx The canvas' context.
 */
function miterLimit(value, ctx=targetContext) {
	ctx.miterLimit = value;
}

/**
 * Set the dash offset.
 * @param value The offset.
 * @param ctx The canvas' context.
 */
function lineDashOffset(value, ctx=targetContext) {
	ctx.lineDashOffset = value;
}

/**
 * Set the line dash pattern.
 * @param segments The array with line-gap length pattern as an array.
 * @param ctx The canvas' context.
 */
function setLineDash(segments, ctx=targetContext) {
	ctx.setLineDash(segments);
}

/**
 * Get the line dash pattern.
 * @param ctx The canvas' context.
 * @returns {number[]} The pattern as an array.
 */
function getLineDash(ctx=targetContext) {
	return ctx.getLineDash();
}
