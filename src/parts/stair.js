import * as THREE from 'three';

const drawStair = (locationPoint, width) => {
  const length = 1;
  const thickness = 0.05;

  const shape = new THREE.Shape();

  shape.moveTo(locationPoint.x, locationPoint.y);
  shape.lineTo(locationPoint.x + width, locationPoint.y);
  shape.lineTo(locationPoint.x + width, locationPoint.y - thickness);
  shape.lineTo(locationPoint.x, locationPoint.y - thickness);
  shape.lineTo(locationPoint.x, locationPoint.y);

  const extrudeSettings = {
    steps: 10,
    depth: length,
    bevelEnabled: false,
    bevelThickness: 0.005,
    bevelSize: 0.005,
    bevelOffset: 0,
    bevelSegments: 1
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  const material = new THREE.MeshBasicMaterial({ color: 'red' });


  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
};

export default drawStair;
