"use strict";

const modal = document.querySelector(".modal");
const test = document.querySelector(".test");
const closeModal = document.querySelector(".close");
const radioButtons = document.querySelectorAll("input[name='behavior']");
const setSize = document.querySelector(".js-set");

let pixelsPerSide = 16;
const canvasDiv = document.querySelector(".js-canvas");
const settingsBtn = document.querySelector(".hero__settings");
const clear = document.querySelector(".js-clear");
const update = document.querySelector(".js-update");

setSize.addEventListener('click', () => {
    pixelsPerSide = Number(document.querySelector("#pixels").value);
    if (pixelsPerSide <= 80) {
        modal.style.display = "none";
        setupCanvas();
    } else {
        alert("Maximum number of pixels per side is 80");
    }
});

settingsBtn.addEventListener('click', () => modal.style.display = "block");

closeModal.addEventListener('click', () => modal.style.display = "none");

clear.addEventListener('click', () => clearColor());

update.addEventListener('click', () => setupCanvas());

function setupCanvas() {
    clearCanvas();
    drawCanvas(pixelsPerSide);
    addEfect();
}

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