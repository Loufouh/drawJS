"use strict";

/**
 * Reset all transformations
 * @param ctx The canvas' context.
 */
function resetTransform(ctx = targetContext) {
    setTransform(
        1,
        0,
        0,
        1,
        0,
        0,
        ctx
    );
}

/**
 * Apply a transformation.
 * @param horizontalScaling The horizontal scaling.
 * @param horizontalSkewing The horizontal skewing.
 * @param verticalSkewing The vertical skewing.
 * @param verticalScaling The vertical scaling.
 * @param horizontalTranslation The vertical translation.
 * @param verticalTranslation The vertical translation.
 * @param ctx The canvas' context.
 */
function setTransform(horizontalScaling, horizontalSkewing, verticalSkewing, verticalScaling, horizontalTranslation, verticalTranslation, ctx = targetContext) {
    ctx.setTransform(
        horizontalScaling,
        horizontalSkewing,
        verticalSkewing,
        verticalScaling,
        horizontalTranslation,
        verticalTranslation
    );
}

/**
 * Apply a translation.
 * @param x The x translation.
 * @param y The y translation.
 * @param ctx The canvas' context.
 */
function translate(x, y, ctx = targetContext) {
    ctx.translate(x, y);
}

/**
 * Apply a clockwise rotation (the rotation point is the origin of the canvas, we can use a translation to change it).
 * @param angle The angle of the rotation (in radians).
 * @param ctx The canvas' context.
 */
function rotate(angle, ctx = targetContext) {
    ctx.rotate(angle);
}

/**
 * Apply a scaling transformation.
 * @param x The x scaling.
 * @param y The y scaling.
 * @param ctx The canvas' context.
 */
function scale(x, y, ctx = targetContext) {
    ctx.scale(x, y);
}

/**
 * Save the current transformations (use restore() to get it back).
 * @param ctx The canvas' context.
 */
function save(ctx = targetContext) {
    ctx.save();
}

/**
 * Restore transformations (previously registered with save()).
 * @param ctx The canvas' context.
 */
function restore(ctx = targetContext) {
    ctx.restore();
}
