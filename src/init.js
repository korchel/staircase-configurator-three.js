import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const init = () => {
  const sizes  = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const scene = new THREE.Scene();

  const axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );

  const canvas = document.querySelector('.canvas');

  const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height);
  camera.position.z = 10;
  camera.position.y = 10;
  camera.position.x = 10;
  scene.add(camera);

  const controls = new OrbitControls(camera, canvas);
	controls.enableDamping = true;

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);

  const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };
  tick();

  return { sizes, scene, canvas, camera, renderer, controls };
};

export default init;