"use strict";

//options
const sizeDisplay = document.querySelector(".canvas-size");
const eraser = document.querySelector(".js-eraser");
const rainbow = document.querySelector(".js-rainbow");

//modal window
const setSize = document.querySelector(".js-set");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close");
const pixelsInput = document.querySelector("#pixels");

const radioButtons = document.querySelectorAll(".radiobox");

//canvas
const canvasDiv = document.querySelector(".js-canvas");
const settingsBtn = document.querySelector(".hero__settings");
const clear = document.querySelector(".js-clear");
const update = document.querySelector(".js-update");

//globals
let borderSize = "1px";
let defaultColor = "white";
let isEraserActive = false;
let isRainbowActive = false;
let pixelColor = "orange";
let pixelsPerSide = 16;
let hold = false;

//setup on load
setupCanvas();
displayCurrentSize(pixelsPerSide);


//canvas settings events
eraser.addEventListener('click', () => {
    eraser.classList.toggle("active-option");
    rainbow.classList.remove("active-option");
    isEraserActive = toggleOption(isEraserActive);
    isRainbowActive = false;
});

rainbow.addEventListener('click', () => {
    rainbow.classList.toggle("active-option");
    eraser.classList.remove("active-option");
    isRainbowActive = toggleOption(isRainbowActive);
    isEraserActive = false;
});


//modal events
sizeDisplay.addEventListener('click', () => modal.style.display = "block");

setSize.addEventListener('click', () => {
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            borderSize = radioButton.value;
        }
    }

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


//canvas events
clear.addEventListener('click', () => clearColor());

update.addEventListener('click', () => setupCanvas());

canvasDiv.addEventListener('mousedown', () => {
    hold = true
});

canvasDiv.addEventListener('mouseup', () => {
    hold = false
});


//*****************************functions*****************************/

function randomNum(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function getRandomColor() {
    let randomColor = `rgb(${randomNum(100, 255)}, ${randomNum(100, 255)}, ${randomNum(100, 255)})`;
    return randomColor;
}

function toggleOption(variable) {
    if (variable === true) {
        return false;
    }

    return true;
}

function setupCanvas() {
    clearCanvas();
    drawCanvas(pixelsPerSide);
    addEfect();
}

function addEfect() {
    const boxes = document.querySelectorAll(".box");

    boxes.forEach(box => {
        box.addEventListener('mousedown', () => {box.style.backgroundColor = setCurrentCanvavsSetting()});

        box.addEventListener('mouseover', () => {
                if (hold) {
                    box.style.backgroundColor = setCurrentCanvavsSetting();
                }
        });
    })
}

function setCurrentCanvavsSetting() {
    if (isEraserActive) {
        return defaultColor;
    } else if (isRainbowActive) {
        return getRandomColor();
    } else {
        return pixelColor;
    }
}

function createBox(size) {
    const box = document.createElement("div");
    box.style.cssText = `width: ${size}px; height: ${size}px; background-color: ${defaultColor}; border: ${borderSize} solid #f3f3f3`;
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
    boxes.forEach(box => box.style.backgroundColor = defaultColor);
}

function displayCurrentSize(size) {
    sizeDisplay.textContent = `${size} X ${size}`;
}