'use strict'
console.log('hello main.js');

let gCanvas;
let gCtx;

let flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false,
    brushColor = 'black',
    brushSize = 2;


function onInit() {
    gCanvas = document.querySelector('#paintCanvas');
    gCtx = gCanvas.getContext('2d')
    gCanvas.width = window.innerWidth;
    gCanvas.height = window.innerHeight-50;

    gCanvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    gCanvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    gCanvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    gCanvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);

}

function setBrushSize(el) {
    brushSize = el.value;
}

function setColor(el) {
    brushColor = el.value;
}

function setBgCanvas(el) {
    gCtx.fillStyle = el.value;
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);
}

function draw() {
    gCtx.beginPath();
    gCtx.moveTo(prevX, prevY);
    gCtx.lineTo(currX, currY);
    gCtx.strokeStyle = brushColor;
    gCtx.lineWidth = brushSize;
    gCtx.stroke();
    gCtx.closePath();
}



function erase() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}



function downloadCanvas(elLink) {
    console.log("download")
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-img.jpg';
}
function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - gCanvas.offsetLeft;
        currY = e.clientY - gCanvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            gCtx.beginPath();
            gCtx.fillStyle = brushColor;
            gCtx.fillRect(currX, currY, 2, 2);
            gCtx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - gCanvas.offsetLeft;
            currY = e.clientY - gCanvas.offsetTop;
            draw();
        }
    }
}
