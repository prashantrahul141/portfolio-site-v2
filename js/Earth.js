// @ts-ignore
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
// Constants
const earthRadius = 0.5;
const earthSegments = 32;
const earthShininess = 8;
const textureLoader = new THREE.TextureLoader();
const initiaEarthPosition = [0, 0, 0];
// Making Earth Sphere mesh
const Earth = new THREE.Mesh(new THREE.SphereGeometry(earthRadius, earthSegments, earthSegments), new THREE.MeshPhongMaterial({
    map: textureLoader.load('../portfolio-site-v2/media/earthMap.webp'),
    bumpMap: textureLoader.load('../portfolio-site-v2/media/bumpMap.webp'),
    bumpScale: 0.08,
    specularMap: textureLoader.load('../portfolio-site-v2/media/specularMap.webp'),
    specular: new THREE.Color('grey'),
    shininess: earthShininess,
}));
// Making Cloud Sphere mesh
const Cloud = new THREE.Mesh(new THREE.SphereGeometry(earthRadius + 0.003, earthSegments, earthSegments), new THREE.MeshPhongMaterial({
    map: textureLoader.load('../portfolio-site-v2/media/cloudMap.webp'),
    transparent: true,
}));
const setPosition = (setPosition) => {
    Earth.position.set(...setPosition);
    Cloud.position.set(...setPosition);
};
setPosition(initiaEarthPosition);
// Exports
export default { Earth, Cloud };
