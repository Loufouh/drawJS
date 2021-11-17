/*
 *
 *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *  	WARNING: This whole module of code is based on
 *           	 the dimensions of the font : "monospace"
 *
 *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
*/

"use strict";

/**
 * Ratio fontsize/width.
 * @type {number}
 */
const WIDTH_RATIO = 18 / 8;
/**
 * Ratio fontsize/height.
 * @type {number}
 */
const HEIGHT_RATIO = 75 / 48;

/**
 * Fontsize mode enumeration.
 * @type {{WIDTH: string, HEIGHT: string, FONTSIZE: string}}
 */
const FONTSIZE_MODE = {
    FONTSIZE: "fontsize",
    WIDTH: "width",
    HEIGHT: "height"
}


/**
 * Configure the font.
 * @param size The size of the font.
 * @param fontName The name of the font.
 * @param sizeMode The size mode (from FONTSIZE_MODE enum).
 * @param ctx The canvas' context.
 */
function font(size, fontName, sizeMode = FONTSIZE_MODE.FONTSIZE, ctx = targetContext) {
    if (sizeMode === FONTSIZE_MODE.WIDTH)
        size *= WIDTH_RATIO;
    else if (sizeMode === FONTSIZE_MODE.HEIGHT)
        size *= HEIGHT_RATIO;
    ctx.font = size + "px " + fontName;
}

/**
 * Set text alignment.
 * @param alignment The alignment ('left', 'right', 'center', 'start', 'end')
 * @param ctx The canvas' context.
 */
function textAlign(alignment, ctx = targetContext) {
    ctx.textAlign = alignment;
}

/**
 * Draw a text at a position.
 * @param x The x coordinate of the text.
 * @param y The y coordinate of the text.
 * @param str The text to draw.
 * @param ctx The canvas' context.
 */
function text(x, y, str, ctx = targetContext) {
    if (isStroking)
        ctx.strokeText(str, x, y);
    if (isFilling)
        ctx.fillText(str, x, y);
}

/**
 * Draw a text in a box (font size and name will be set automatically).
 * @param xBoxLeft The x coordinate of the box (based on the top left corner).
 * @param yBoxTop The y coordinate of the box (based on the top left corner).
 * @param boxWidth The width of the box.
 * @param boxHeight The height of the box.
 * @param str The text to draw.
 * @param ctx The canvas' context.
 */
function textFitInBox(xBoxLeft, yBoxTop, boxWidth, boxHeight, str, ctx = targetContext) {
    let boxPos = new Vector(xBoxLeft, yBoxTop);
    let boxDim = new Vector(boxWidth, boxHeight);
    let strDim;

    if (boxDim.x / str.length < boxDim.y) {
        strDim = getFontDimensions((boxDim.x * 5 / 12) / str.length, FONTSIZE_MODE.WIDTH);
    } else {
        strDim = getFontDimensions(boxDim.y * 12 / 24, FONTSIZE_MODE.HEIGHT);
    }

    textAlign("center", ctx);
    font(strDim.x, "monospace", FONTSIZE_MODE.WIDTH, ctx);
    text(boxPos.x + boxDim.x / 2, boxPos.y + (boxDim.y + strDim.y) / 2, str, ctx);
}

/**
 * Get the dimensions of char based on a size.
 * @param size The size.
 * @param sizeMode The size mode (from FONTSIZE_MODE enum).
 * @returns {Vector|*} The dimensions of a char.
 */
function getFontDimensions(size, sizeMode) {
    let fontDim = new Vector();

    if (sizeMode === FONTSIZE_MODE.WIDTH) {
        fontDim.x = size;
        fontDim.y = getHeightOfChar(fontDim.x, FONTSIZE_MODE.WIDTH);
    } else if (sizeMode === FONTSIZE_MODE.HEIGHT) {
        fontDim.y = size;
        fontDim.x = getWidthOfChar(fontDim.y, FONTSIZE_MODE.HEIGHT);
    } else if (sizeMode === FONTSIZE_MODE.FONTSIZE) {
        fontDim.x = getWidthOfChar(size, FONTSIZE_MODE.FONTSIZE);
        fontDim.y = getHeightOfChar(size, FONTSIZE_MODE.FONTSIZE);
    } else {
        return error("The value entered is wrong, it's necessary to know the width, the height or the fontsize to deduce the font dimensions !",
            new Vector(1, 1));
    }

    return fontDim;
}

/**
 * Get the font size based on an alternative size mode.
 * @param size The size.
 * @param sizeMode The size mode (from FONTSIZE_MODE enum).
 * @returns {number|*} The font size.
 */
function getFontSize(size, sizeMode) {
    if (sizeMode === FONTSIZE_MODE.WIDTH)
        return size * WIDTH_RATIO
    else if (sizeMode === FONTSIZE_MODE.HEIGHT)
        return size * HEIGHT_RATIO;
    else {
        return error("The value entered is wrong, it's necessary to know the height or the width of a caractere to deduce the fontsize !", 1);
    }
}

/**
 * Get the width of a char based on another size mode.
 * @param size The size.
 * @param sizeMode The size mode (from FONTSIZE_MODE enum).
 * @returns {number|*} The width of a char.
 */
function getWidthOfChar(size, sizeMode = FONTSIZE_MODE.FONTSIZE) {
    if (sizeMode === FONTSIZE_MODE.FONTSIZE)
        return size / WIDTH_RATIO;
    else if (sizeMode === FONTSIZE_MODE.HEIGHT)
        return size * HEIGHT_RATIO / WIDTH_RATIO;
    else
        return error("The value entered is wrong, it's necessary to know the fontsize or the height of a caractere to deduce its width !", 1);
}

/**
 * Get the height of a char based on another size mode.
 * @param size The size.
 * @param sizeMode The size mode (from FONTSIZE_MODE enum).
 * @returns {number|*} The height of a char.
 */
function getHeightOfChar(size, sizeMode = FONTSIZE_MODE.FONTSIZE) {
    if (sizeMode === FONTSIZE_MODE.FONTSIZE)
        return size / HEIGHT_RATIO;
    else if (sizeMode === FONTSIZE_MODE.WIDTH)
        return size * WIDTH_RATIO / HEIGHT_RATIO;
    else
        return error("The value entered is wrong, it's necessary to know the fontsize or the width of a caractere to deduce its height !", 1);
}
