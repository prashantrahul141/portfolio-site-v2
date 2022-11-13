const map_ = (
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number
): number => {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
};

this.onmessage = (message) => {
  let returnAngle = map_(
    message.data.mappedValue,
    0,
    message.data.maxMappingValue,
    0,
    -Math.PI
  );
  let _thetha = map_(
    message.data.mappedValue,
    0,
    message.data.maxMappingValue,
    0,
    -Math.PI
  );
  let x = 0 + message.data.circleRadius * Math.cos(_thetha);
  let y = 0 + message.data.circleRadius * Math.sin(_thetha);
  postMessage([returnAngle, x, y]);
};
