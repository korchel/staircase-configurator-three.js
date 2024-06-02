import * as THREE from 'three';


import store from './store.js';
import drawStair from './parts/stair.js';
import drawClosedStringer from './parts/closedStringer.js';

const drawClosedStringerStraight = (scene, sizes) => {
  const object = new THREE.Object3D();
  
  const totalRise = sizes.height;
  const width = sizes.width;
  const run = 3;

  const standartStairHeight = 0.26; // constant
  const standartStairWidth = 0.3;
  const standartSringerWidth = 0.4;
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
    stairsLocationPoints.push({ x, y, z });
  }

  stairsLocationPoints.forEach((point) => {
    const stair = drawStair(point, standartStairWidth, width);
    object.add(stair);
  });

  const stringer1 = drawClosedStringer(totalRise, { x: 0, y: 0, z: 0 }, factRun, stairAngleRad, standartSringerWidth, thickness);
  const stringer2 = drawClosedStringer(totalRise, { x: 0, y: 0, z: width }, factRun, stairAngleRad, standartSringerWidth, thickness);

  object.add(stringer1, stringer2)
  scene.add(object);
};

export default drawClosedStringerStraight;