// returns total vertical length of the page
const getTotalHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
// returns current scrolled position
const getCurrentScrollHeight = () => {
    return document.documentElement.scrollTop;
};
// returns the percentage betwen
const getCurrentScrollPercentage = () => {
    return (document.documentElement.scrollTop / getTotalHeight) * 100;
};
// Takes a value between `start1` and `stop1` as `value`
// returns the value it maps between `start2` and `stop2`
const map_ = (value, start1, stop1, start2, stop2) => {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
};
// returns a smoother version of map_ according to a iterator value.
const smoothMap = (value, start1, stop1, start2, stop2, iterator) => {
    let _mapValue = map_(value, start1, stop1, start2, stop2);
    return (iterator / 100) * _mapValue;
};
export default {
    getTotalHeight,
    getCurrentScrollHeight,
    getCurrentScrollPercentage,
    map_,
    smoothMap,
};
