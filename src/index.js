import * as THREE from 'three';

import init from "./init.js";
import drawStair from './parts/stair.js';
import drawClosedStringer from './parts/closedStringer.js';

const { sizes, scene, canvas, camera, renderer, controls } = init();

// const width = 1;
const totalRise = 3;
const run = 3;

// const woodThickness = 0.05;
// const stringerThickness = 0.05;

const standartStairHeight = 0.26; // constant
const standartStairWidth = 0.3;
const standartSringerWidth = 0.4;
const length = 1;
const thickness = 0.05;

// number of stairs
const stairsNumber = Math.round(totalRise / standartStairHeight);

const factStairHeight = (totalRise / stairsNumber);
const factRun = (stairsNumber - 1) * standartStairWidth;

const stairAngleRad = Math.atan(totalRise / factRun);
const stairAngleGrad = Math.atan(totalRise / factRun) * (180 / Math.PI);

const stairsLocationPoints = [];
let x = -standartStairWidth;
let y = 0;
let z = 0;

for (let i = 1; i < stairsNumber; i += 1) {
  x += standartStairWidth;
  y += factStairHeight;
  stairsLocationPoints.push({x, y, z});
}
console.log(stairsLocationPoints)
stairsLocationPoints.forEach((point) => {
  const stair = drawStair(point, standartStairWidth);
  scene.add(stair);
})

const stringer1 = drawClosedStringer(totalRise, { x: 0, y: 0, z: 0}, factRun, stairAngleRad, standartSringerWidth, thickness);
const stringer2 = drawClosedStringer(totalRise, { x: 0, y: 0, z: 1}, factRun, stairAngleRad, standartSringerWidth, thickness);
scene.add(stringer1);
scene.add(stringer2);


