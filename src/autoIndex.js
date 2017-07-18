import { distance } from './helpers';
import moveIndex from './moveIndex';

export default function autoIndex (point, index, p) {
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
