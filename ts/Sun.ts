// @ts-ignore
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

// Constants
const sunRadius = 23;
const sunSegments = 32;
const sunDist = 45;

const customMaterial = new THREE.ShaderMaterial({
  uniforms: {},
  // @ts-ignore
  vertexShader: document.getElementById('vertexShader').textContent,
  // @ts-ignore
  fragmentShader: document.getElementById('fragmentShader').textContent,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending,
  transparent: true,
});

const sunGlow = new THREE.Mesh(
  new THREE.SphereGeometry(sunRadius, sunSegments, sunSegments),
  customMaterial
);

sunGlow.position.set(sunDist, 0, sunDist);
export default { sunGlow };
