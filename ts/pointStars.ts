// @ts-ignore
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

const customMaterial1 = new THREE.ShaderMaterial({
  uniforms: {},
  // @ts-ignore
  vertexShader: document.getElementById('vertexShaderStars1').textContent,
  // @ts-ignore
  fragmentShader: document.getElementById('fragmentShaderStars1').textContent,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending,
});

const customMaterial2 = new THREE.ShaderMaterial({
  uniforms: {},
  // @ts-ignore
  vertexShader: document.getElementById('vertexShaderStars2').textContent,
  // @ts-ignore
  fragmentShader: document.getElementById('fragmentShaderStars2').textContent,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending,
});

const newRandomSpherePoint = (r: number) => {
  let x = Math.random() * Math.PI * 2;
  let y = Math.random() * Math.PI * 2;
  let cosY = Math.cos(y);
  return [r * Math.cos(x) * cosY, r * Math.sin(x) * cosY, r * Math.sin(y)];
};

const cameraPos = new THREE.Vector3(0, 0, 2);
let pointStars = [];

for (let i = 0; i < 100; i++) {
  const size = Math.random() * 0.25;
  const geometry = new THREE.SphereGeometry(size, 16);
  geometry.lookAt(cameraPos);
  let material_ = Math.random() > 0.5 ? customMaterial1 : customMaterial2;
  const star = new THREE.Mesh(geometry, material_);
  star.position.set(...newRandomSpherePoint(30));
  pointStars.push(star);
}

export default { pointStars };
