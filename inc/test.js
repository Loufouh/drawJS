import {drawJS, style, color, shapes, imageData, text, coordinate} from "../node_modules/@louis700/drawjs/index.js";
import {vector} from "../node_modules/@louis700/mathjs/index.js";

"use strict";

const PURPLE = new color.Color(200, 16, 255);
const WHITE = new color.Color(255);
const BACKGROUND_COLOR = new color.Color(0, 34, 51);

let canvas;

window.onload = function () {
    canvas = document.querySelector("canvas");
    drawJS.setTargetContext(canvas.getContext("2d"));

    style.background(BACKGROUND_COLOR);

    drawGridTest();
    drawShapeTest();
    drawLineTest();
    drawImageDataTest();
    drawGradientTest();
    drawTextTest();
    drawImageTest();
}

function drawGridTest() {
    style.stroke(WHITE);
    shapes.strokeWeight(3);
    style.lineJoin('round');

    shapes.simpleGrid(
        new vector.Vector(100, 100),
        new vector.Vector(8, 8),
        new vector.Vector(400, 400)
    );
}

function drawLineTest() {
    style.stroke(WHITE);
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

function drawShapeTest() {
    style.stroke(PURPLE);
    style.noFill();

    shapes.strokeWeight(2);

    coordinate.translate(350, 600);

    let points = new Array(1000)
                        .fill(1)
                        .map((p, i) => {
                            let angle = i*2*Math.PI/1000;
                            let radius = 70 + 5*Math.cos(i/5)*3*Math.sin(angle) + 3*Math.cos(i/10)*Math.sin(angle);

                            return new vector.Vector(
                                radius*Math.cos(angle),
                                radius*Math.sin(angle)
                            );
                        });
    console.log("points:", points);

    shapes.shape(points);

    coordinate.resetTransform();
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
    img.src = "assets/image.png";

    img.addEventListener("load", () => {
        shapes.drawImage(
            img,
            canvas.width - 1.8 * 80,
            10,
            144,
            80
        );

        coordinate.translate(1.8 * 80, canvas.height);
        coordinate.rotate(Math.PI);

        shapes.drawImage(
            img,
            10,
            0,
            144,
            80
        );

        coordinate.resetTransform();
    });
}

function drawTextTest() {
    style.noFill();
    style.stroke(PURPLE);
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
    if (Math.random() < .2) {
        return PURPLE;
    } else {
        return BACKGROUND_COLOR;
    }
}
