import { distance, applyFuncToShapes } from './helpers';
import moveIndex from './moveIndex';

const autoIndexPoints = (point, p) => {
  let min = Number.MAX_SAFE_INTEGER;
  let minIdx;
  for (let i = 0; i < point.length; i++) {
    let dist = distance(p, point[i]);
    if (dist < min) {
      minIdx = i;
      min = dist;
    }
  }
  if (minIdx) {
    point = moveIndex(point, minIdx);
  }
  return point;
}

const autoIndex = point = applyFuncToShapes(autoIndexPoints, point);

export default autoIndex;
