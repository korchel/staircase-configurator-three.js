import * as THREE from 'three';
import onChange from 'on-change';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import renderStairCase from './renderStairCase.js';

const control = (watchedState, store) => (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const height = Number(formData.get('height')) / 1000;
  const width = Number(formData.get('width')) / 1000;
  const geometry = formData.get('geometry');
  watchedState.sizes = { height, width };
  watchedState.stairCaseType = geometry;
};

const init = (store) => {
  const elements = {
    form: document.querySelector('.form'),
  };

  const sizes  = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xEEEEEE)

  const axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );

  const canvas = document.querySelector('.canvas');

  const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height);
  camera.position.z = 5;
  camera.position.y = 5;
  camera.position.x = -5;
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

  window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  });

  const watchedState = onChange(store, () => {
    scene.remove(scene.children[2])
    renderStairCase(store, scene);
  });

  elements.form.addEventListener('submit', control(watchedState, store));
};

export default init;