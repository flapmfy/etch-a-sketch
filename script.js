"use strict";

let boxSize = prompt("Set size of a single pixel", 1);
const canvas = document.querySelector(".js-canvas");
const sizeSetter = document.querySelector(".hero__settings");
const reset = document.querySelector(".js-reset");
const start = document.querySelector(".js-start");

// sizeSetter.addEventListener('click', () => {
//     boxSize = prompt("Set size of a single pixel");
//     drawCanvas(10);
// })

// start.addEventListener('click', drawCanvas(10));

function createBox() {
    const box = document.createElement("div");
    box.style.cssText = `width: ${boxSize}px; height: ${size}px; background-color: orange`;
    return box;
}

function drawLine(pixelCount) {
    let line = document.createElement("div");
    line.style.cssText = "display: flex";
    let size = 10;

    for (let i = 0; i < pixelCount; i++) {
        line.appendChild( createBox(boxSize) );
    }

    canvas.appendChild(line);
}

function drawCanvas(size) {
    for (let i = 0; i < size; i++) {
        drawLine(size);
    }
}

//funkce pro reset obsahu plátna
//funkce pro výpočet počtu pixelů a řádek, které se vejdou na plátno
//funkce start pro, která vypočte velikost a vykreslí plátno