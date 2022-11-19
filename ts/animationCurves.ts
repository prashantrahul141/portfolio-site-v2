const worker = new Worker('./js/cameraPositionAnimationCurveWorker.js');

// Takes a value between `start1` and `stop1` as `value`
// returns the HARD CLAMPED value it maps between `start2` and `stop2`
const map_ = (
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number
): number => {
  let mapValue =
    start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  return mapValue < start2 ? start2 : mapValue > stop2 ? stop2 : mapValue;
};

const MAXRADIUS = 6.2;
const MINRADIUS = 3.2;
const circleRadius = map_(window.innerWidth, 1080, 500, MINRADIUS, MAXRADIUS);

let animationValues = [0, circleRadius, 0];
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
  circleRadius,
};
