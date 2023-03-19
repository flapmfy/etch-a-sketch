"use strict";

const canvasDiv = document.querySelector(".js-canvas");
const sizeSetter = document.querySelector(".hero__settings");
const reset = document.querySelector(".js-reset");
const start = document.querySelector(".js-start");


function createBox(size) {
    const box = document.createElement("div");
    box.style.cssText = `width: ${size}px; height: ${size}px; background-color: white; border: 1px solid black`;
    return box;
}

function drawLine(boxCount) {
    let line = document.createElement("div");
    line.style.cssText = "display: flex";

    for (let i = 0; i < boxCount; i++) {
        line.appendChild( createBox(50) );
    }

    return line;
}

function drawCanvas(size) {
    const canvasGrid = document.createElement("div");
    for (let i = 0; i < size; i++) {
        canvasGrid.appendChild(drawLine(size));
    }

    canvasDiv.appendChild(canvasGrid);
}

drawCanvas(10);
//funkce pro reset obsahu plátna
//funkce pro výpočet počtu pixelů a řádek, které se vejdou na plátno
//funkce start pro, která vypočte velikost a vykreslí plátno