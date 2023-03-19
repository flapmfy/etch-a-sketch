"use strict";

let pixelsPerSide = 16;
const canvasDiv = document.querySelector(".js-canvas");
const sizeSetter = document.querySelector(".hero__settings");
const clear = document.querySelector(".js-clear");
const update = document.querySelector(".js-update");

sizeSetter.addEventListener('click', () => {
    pixelsPerSide = prompt("How many pixels per side?", 10);
    clearCanvas();
    drawCanvas(pixelsPerSide);
    addEfect();
})

update.addEventListener('click', () => {
    clearCanvas();
    drawCanvas(pixelsPerSide);
    addEfect();
})

clear.addEventListener('click', () => clearColor())

function addEfect() {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
        box.addEventListener('mousedown', () => box.style.backgroundColor = "black");
    })
}

function createBox(size) {
    const box = document.createElement("div");
    box.style.cssText = `width: ${size}px; height: ${size}px; background-color: white; border: 1px solid black`;
    box.classList.add("box");
    return box;
}

function drawLine(boxCount, pixelSize) {
    let line = document.createElement("div");
    line.style.cssText = "display: flex; max-width: 100%; width: 100%;";

    for (let i = 0; i < boxCount; i++) {
        line.appendChild( createBox(pixelSize) );
    }

    return line;
}

function drawCanvas(size) {
    const canvasGrid = document.createElement("div");
    let pixelSize = getPixelSize();

    for (let i = 0; i < size; i++) {
        canvasGrid.appendChild(drawLine(size, pixelSize));
    }

    canvasDiv.appendChild(canvasGrid);
}

function getPixelSize() {
    let canvasSize = canvasDiv.clientWidth;
    let pixelSize = canvasSize / pixelsPerSide;

    return pixelSize;
}

function clearCanvas() {
    canvasDiv.innerHTML = "";
}

function clearColor() {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(box => box.style.backgroundColor = "white");
}

//funkce pro reset obsahu plátna
//funkce pro výpočet počtu pixelů a řádek, které se vejdou na plátno
//funkce start pro, která vypočte velikost a vykreslí plátno