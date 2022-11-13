const worker = new Worker('./js/cameraPositionAnimationCurveWorker.js');

const circleRadius = 3.2;
let animationValues = [0, 3.2, 0];
const cameraAnimationCurve = (mappedValue: number, maxMappingValue: number) => {
  worker.postMessage({ mappedValue, maxMappingValue, circleRadius });
  return animationValues;
};

worker.onmessage = (message) => {
  animationValues[0] = message.data[0];
  animationValues[1] = message.data[1];
  animationValues[2] = message.data[2];
};

export default {
  cameraAnimationCurve,
};
