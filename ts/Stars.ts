// @ts-ignore
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

const textureLoader = new THREE.TextureLoader();
const Stars = new THREE.Mesh(
  new THREE.SphereGeometry(90, 64, 64),
  new THREE.MeshBasicMaterial({
    map: textureLoader.load('../media/starsBackground.png'),
    side: THREE.BackSide,
  })
);

export default { Stars };
