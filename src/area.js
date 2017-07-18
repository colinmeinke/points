import { applyFuncToShapes } from './helpers';

const areaPoints = polygon => {
  return polygon.reduce((area, {x:x,y:y}, i) => {
	const {x:x1,y:y1} = i === 0 ? polygon[polygon.length - 1] : polygon[i - 1];
	area += (x1 + x) * (y1 - y)
	return area;
  }, 0);
}

const area = polygon => applyFuncToShapes(areaPoints, polygon);

export default area;
