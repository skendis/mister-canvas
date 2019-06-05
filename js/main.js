'use strict'
console.log('hello main.js');

let canvas;
let ctx;

function onInit() {
    canvas = document.querySelector('#paintCanvas');
    ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

