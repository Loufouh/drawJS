import {drawJS, style, color, shapes, imageData, text} from "../node_modules/@louis700/drawjs/index.js";
import {vector} from "../node_modules/@louis700/mathjs/index.js";

"use strict";

let canvas;

window.onload = function () {
    canvas = document.querySelector("canvas");
    drawJS.setTargetContext(canvas.getContext("2d"));

    style.background(color.Color.hsl(200, 100, 10));

    drawGridTest();
    drawLineTest();
    drawImageDataTest();
    drawGradientTest();
    drawTextTest();
}

function drawGridTest() {
    style.stroke(color.Color.rgb(255));
    shapes.strokeWeight(3);
    style.lineJoin('round');

  shapes.simpleGrid(
      new vector.Vector(100, 100),
      new vector.Vector(8, 8),
      new vector.Vector(400, 400)
  );
}

function drawLineTest() {
    style.stroke(color.Color.rgb(255));
    shapes.strokeWeight(3);

    style.lineDashOffset(2);
    style.setLineDash([5, 10]);

    shapes.line(
        500,
        100,
        600,
        100
    );

    shapes.line(
        500,
        500,
        600,
        600
    );
}

function drawImageDataTest() {
    let imgData = imageData.createImageData(100, 500);

    imageData.mapImageData(imgData, pickColor);

    imageData.putImageData(imgData, 600, 100);
}

function drawGradientTest() {
    let radialGradient = style.createRadialGradient(
        300,
        600,
        20,
        300,
        600,
        90
    );

    radialGradient.addColorStop(0, 'rgb(200, 16, 255)');
    radialGradient.addColorStop(1, 'hsl(200, 100%, 10%)');

    style.fillGradient(radialGradient);
    style.noStroke();

    shapes.circle(300, 600, 90);
}

function drawImageTest() {
    let img = new Image();
    img.src = "image.png";

    img.addEventListener("load", () => {
        shapes.drawImage(
            img,
            610,
            10,
            80,
            80
        );

        shapes.drawSubImage(
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
    style.noFill();
    style.stroke(new color.Color(200, 16, 255));
    style.lineJoin('round')
    style.setLineDash([])

    text.font(100, 'monospace');
    text.text(100, 90, "DrawJS")
}

/**
 * Pick a random color.
 * @returns {color.Color} The picked color.
 */
function pickColor() {
    if(Math.random() < .2) {
        return new color.Color(200, 16, 255);
    } else {
        return new color.Color(0, 34, 51);
    }
}
