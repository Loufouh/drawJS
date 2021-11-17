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
    drawTextTest();
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
        500,
        100,
        600,
        100
    );

    line(
        500,
        500,
        600,
        600
    );
}

function drawImageDataTest() {
    let imgData = createImageData(100, 500);

    mapImageData(imgData, pickColor);

    putImageData(imgData, 600, 100);
}

function drawGradientTest() {
    let radialGradient = createRadialGradient(
        300,
        600,
        20,
        300,
        600,
        90
    );

    radialGradient.addColorStop(0, 'rgb(200, 16, 255)');
    radialGradient.addColorStop(1, 'hsl(200, 100%, 10%)');

    fillGradient(radialGradient);
    noStroke();

    circle(300, 600, 90);
}

function drawImageTest() {
    let img = new Image();
    img.src = "image.png";

    img.addEventListener("load", () => {
        drawImage(
            img,
            610,
            10,
            80,
            80
        );

        drawSubImage(
            img,
            100,
            100,
            300,
            300,
            700,
            10,
            80,
            80
        );
    })
}

function drawTextTest() {
    noFill();
    stroke(new Color(200, 16, 255));
    lineJoin('round')
    setLineDash([])

    font(100, 'monospace');
    text(100, 90, "DrawJS")
}

/**
 * Pick a random color.
 * @returns {Color} The picked color.
 */
function pickColor() {
    if(Math.random() < .2) {
        return new Color(200, 16, 255);
    } else {
        return new Color(0, 34, 51);
    }
}
