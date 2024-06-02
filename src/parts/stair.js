import * as THREE from 'three';

const drawStair = (locationPoint, width, length) => {
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
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffc18c,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1
  });

  const mesh = new THREE.Mesh(geometry, material);

  const edgesGeomtery = new THREE.EdgesGeometry(mesh.geometry);
  const edgesMatreial = new THREE.LineBasicMaterial( { color: 0x59200f } );
  var edges = new THREE.LineSegments(edgesGeomtery, edgesMatreial);
  mesh.add(edges);

  

  return mesh;
};

export default drawStair;
