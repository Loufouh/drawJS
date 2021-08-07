"use strict";

let canvas;

window.onload = function () {
    canvas = document.querySelector("canvas");
    setTargetContext(canvas.getContext("2d"));

    background(Color.hsl(200, 100, 10));

    drawGridTest();
    drawLineTest();
    drawImageDataTest();
    drawGradientTest();
}

function drawGridTest() {
    stroke(Color.rgb(255));
    strokeWeight(3);
    lineJoin('round');

    grid(
        new Vector(100, 100),
        new Vector(51, 51),
        new Vector(0, 0),
        new Vector(400, 400)
    )
}

function drawLineTest() {
    stroke(Color.rgb(255));
    strokeWeight(3);

    lineDashOffset(2);
    setLineDash([5, 10]);

    line(
        10,
        10,
        600,
        100
    );
}

function drawImageDataTest() {
    let imgData = createImageData(100, 500);

    mapImageData(imgData, pickColor);
    putImageData(imgData, 600, 100);
}

function drawGradientTest() {
    let linearGradient = createRadialGradient(
        300,
        600,
        20,
        300,
        600,
        90
    );

    linearGradient.addColorStop(0, 'rgb(255, 10, 10)');
    linearGradient.addColorStop(0.1, 'rgb(100, 255, 10)');
    linearGradient.addColorStop(1, 'hsl(200, 100%, 10%)');

    fillGradient(linearGradient);
    noStroke();

    circle(300, 600, 90);
}

/**
 * Pick a random color.
 * @returns {Color} The picked color.
 */
function pickColor() {
    return new Color(
        51 * Math.floor(Math.random() * 6),
        51 * Math.floor(Math.random() * 6),
        51 * Math.floor(Math.random() * 6)
	);
}
