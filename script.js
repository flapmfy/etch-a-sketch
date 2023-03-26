"use strict";

const modal = document.querySelector(".modal");
const test = document.querySelector(".test");
const closeModal = document.querySelector(".close");
const radioButtons = document.querySelectorAll("input[name='behavior']");
const setSize = document.querySelector(".js-set");
const pixelsInput = document.querySelector("#pixels");

let pixelColor = "orange";
let pixelsPerSide = 16;
const sizeDisplay = document.querySelector(".canvas-size");
const canvasDiv = document.querySelector(".js-canvas");
const settingsBtn = document.querySelector(".hero__settings");
const clear = document.querySelector(".js-clear");
const update = document.querySelector(".js-update");

setupCanvas();
displayCurrentSize(pixelsPerSide);

setSize.addEventListener('click', () => {
    pixelsPerSide = Number(pixelsInput.value);
    if (pixelsPerSide <= 80) {
        modal.style.display = "none";
        displayCurrentSize(pixelsPerSide);
        setupCanvas();
    } else {
        alert("Maximum number of pixels per side is 80");
    }
});

settingsBtn.addEventListener('click', () => modal.style.display = "block");

closeModal.addEventListener('click', () => modal.style.display = "none");

clear.addEventListener('click', () => clearColor());

update.addEventListener('click', () => setupCanvas());


let hold = false;

canvasDiv.addEventListener('mousedown', () => {
    hold = true
});

canvasDiv.addEventListener('mouseup', () => {
    hold = false
});

function setupCanvas() {
    clearCanvas();
    drawCanvas(pixelsPerSide);
    addEfect();
}

function addEfect() {
    const boxes = document.querySelectorAll(".box");

    boxes.forEach(box => {
        box.addEventListener('mouseover', () => {
                if (hold) {
                    box.style.backgroundColor = pixelColor;
                }
        });

        box.addEventListener('mousedown', () => box.style.backgroundColor = pixelColor)
    })
}

function createBox(size) {
    const box = document.createElement("div");
    box.style.cssText = `width: ${size}px; height: ${size}px; background-color: white; border: 1px solid #f3f3f3`;
    box.classList.add("box");
    return box;
}

function drawRow(boxCount, pixelSize) {
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
        canvasGrid.appendChild(drawRow(size, pixelSize));
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

function displayCurrentSize(size) {
    sizeDisplay.textContent = `${size} X ${size}`;
}