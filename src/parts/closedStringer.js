import * as THREE from 'three';

const drawClosedStringer = (totalRise, locationPoint = { x: 0, y: 0, z: 0}, factRun, stairAngleRad, sringerWidth, thickness) => {
  const shape = new THREE.Shape();


  // stringer shape
  const stringerFullLength = factRun / Math.cos(stairAngleRad);
  const stringerHeight = stringerFullLength * Math.sin(stairAngleRad); // must equal total rise
  const floorContactSurfaceLength = sringerWidth / 3 / Math.sin(stairAngleRad);
  const stringerLowerSideLength = (factRun - floorContactSurfaceLength) / Math.cos(stairAngleRad); // not used
  const ceilingContactSurfaceLength = sringerWidth * 2 / 3 / Math.sin(Math.PI - stairAngleRad);

  shape.moveTo(locationPoint.x, locationPoint.y);
  shape.lineTo(floorContactSurfaceLength, locationPoint.y);
  shape.lineTo(factRun, totalRise - ceilingContactSurfaceLength);
  shape.lineTo(factRun, totalRise);
  shape.lineTo(factRun - floorContactSurfaceLength, totalRise);
  shape.lineTo(locationPoint.x, ceilingContactSurfaceLength);
  shape.lineTo(locationPoint.x, locationPoint.y);

  const extrudeSettings = {
    steps: 1,
    depth: thickness,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.005,
    bevelOffset: 0,
    bevelSegments: 1
  };
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  const material = new THREE.MeshBasicMaterial({ color: 'green' });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = locationPoint.z;
  return mesh;
};

export default drawClosedStringer;