// @ts-ignore
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
// @ts-ignore
import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';
// @ts-ignore
import { RenderPass } from 'https://unpkg.com/three@0.127.0/examples/jsm/postprocessing/RenderPass.js';
// @ts-ignore
import { EffectComposer } from 'https://unpkg.com/three@0.127.0/examples/jsm/postprocessing/EffectComposer.js';
// @ts-ignore
import { UnrealBloomPass } from 'https://unpkg.com/three@0.127.0/examples/jsm/postprocessing/UnrealBloomPass.js';
// @ts-ignore
import { FilmPass } from 'https://unpkg.com/three@0.127.0/examples/jsm/postprocessing/FilmPass.js';

import Earth from './Earth.js';
import Stars from './Stars.js';
import Sun from './Sun.js';
import pointStars from './pointStars.js';
import utils from './utils.js';
import animationCurves from './animationCurves.js';

const ENABLEHELPERS = false;
const ENABLECONTROLLERS = false;
const EARTHROTATIONSPEED = 0.0015;
const DIRECTIONLIGHTDIST = 10;
const INITIALCAMERAPOSITION = animationCurves.circleRadius;
const MAXFPS = 1000 / 50;
const VELOCITYCOEEFICIENT = 0.09;

// Initializing
let Scene = new THREE.Scene();

// Setting up Camera;
let Camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  100
);
Camera.position.z = INITIALCAMERAPOSITION;

// Setting up Renderer
let Renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#MainCanvas'),
  antialias: true,
  alpha: true,
});
Renderer.setPixelRatio(window.devicePixelRatio);
Renderer.setSize(window.innerWidth, window.innerHeight);
Renderer.toneMapping = THREE.LinearToneMapping;
Renderer.autoClear = false;

// Effect Composer
const effectComposer = new EffectComposer(Renderer);
effectComposer.setSize(window.innerWidth, window.innerHeight);
const renderPass = new RenderPass(Scene, Camera);
effectComposer.addPass(renderPass);

// Ligtning
// Ambient Light
Scene.add(new THREE.AmbientLight(0x333333, 0.6));

// Directional Light as Sun Light
let directionLight = new THREE.DirectionalLight(0xeae5d0, 0.75);
directionLight.position.set(DIRECTIONLIGHTDIST, 0, DIRECTIONLIGHTDIST);
Scene.add(directionLight);

// Stars
Scene.add(Stars.Stars);
pointStars.pointStars.map((eachPointStar) => Scene.add(eachPointStar));

// Earth
Scene.add(Earth.Earth);
Scene.add(Earth.Cloud);

// Sun
Scene.add(Sun.sunGlow);

// Post Processing
const unrealBloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.5,
  0.85,
  0.1
);
effectComposer.addPass(unrealBloomPass);

Scene.fog = new THREE.FogExp2(0xdfe9f3, 0.001);

const filmPass = new FilmPass(0.2, 0.04, 500, false);
filmPass.renderToScreen = true;
effectComposer.addPass(filmPass);

// Helpers
if (ENABLEHELPERS) {
  let axisHelper = new THREE.AxesHelper(2);
  let directionlightHelper = new THREE.DirectionalLightHelper(directionLight);
  Scene.add(axisHelper, directionlightHelper);
}

// Controls
let Controls = new OrbitControls(Camera, Renderer.domElement);
if (!ENABLECONTROLLERS) {
  Controls.enabled = false;
}

let currentHeight = 0;
let maxMappingValue = 80; // kepping track of max value of what scroll percentage can get for difference devices.
let lastMappedValue = 0;
let mappedValue = lastMappedValue;
let renderAlgorithmHeight = 0;
let constantAnimate = 0;
const constantAnimateMagnitude = 0.03;
// Animation loop
const animate = (newTime: number) => {
  currentHeight = utils.getCurrentScrollPercentage();
  let desiredVecocity =
    VELOCITYCOEEFICIENT * (currentHeight - renderAlgorithmHeight);
  renderAlgorithmHeight += desiredVecocity;

  // refresing mapped value.
  mappedValue = utils.map_(renderAlgorithmHeight, 0, maxMappingValue, 0, 100);

  // Earth's rotation
  Earth.Earth.rotation.y += EARTHROTATIONSPEED;
  Earth.Cloud.rotation.y += EARTHROTATIONSPEED;

  // when controllers are enables.
  if (ENABLECONTROLLERS) {
    Controls.update();
  }
  // Animating Camera + itreating a fixed value.

  lastMappedValue = mappedValue;
  let animationValue = animationCurves.cameraAnimationCurve(
    mappedValue + constantAnimate,
    maxMappingValue
  );
  Camera.rotation.y = animationValue[0];
  Camera.position.z = animationValue[1];
  Camera.position.x = animationValue[2];

  constantAnimate += constantAnimateMagnitude;

  // limiting FPS
  setTimeout(() => {
    // Rendering.
    requestAnimationFrame(animate);
    effectComposer.render();
  }, MAXFPS);
};

// Adding animation loop to renderer
requestAnimationFrame(animate);
