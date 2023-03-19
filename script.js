"use strict";

//modal start
const modal = document.querySelector(".modal");
const test = document.querySelector(".test");
const close = document.querySelector(".close");
const radioButtons = document.querySelectorAll("input[name='behavior']");
const set = document.querySelector(".js-set");
//modal end

let pixelsPerSide = 16;
const canvasDiv = document.querySelector(".js-canvas");
const sizeSetter = document.querySelector(".hero__settings");
const clear = document.querySelector(".js-clear");
const update = document.querySelector(".js-update");

set.addEventListener('click', () => {
    modal.style.display = "none";
    pixelsPerSide = Number(document.querySelector("#pixels").value);
    clearCanvas();
    drawCanvas(pixelsPerSide);
    addEfect();
});

sizeSetter.addEventListener('click', () => modal.style.display = "block");

close.addEventListener('click', () => modal.style.display = "none");

clear.addEventListener('click', () => clearColor())

update.addEventListener('click', () => {
    clearCanvas();
    drawCanvas(pixelsPerSide);
    addEfect();
})

function getCurrentBehavior() {
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            return radioButton.value;
        }
    }
}

function addEfect() {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
        box.addEventListener(getCurrentBehavior(), () => box.style.backgroundColor = "black");
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