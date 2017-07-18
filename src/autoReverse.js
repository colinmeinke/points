import area from './area';
import reverse from './reverse';
import { applyFuncToShapes } from './helpers';

const autoReversePoints = shape => {
	let direction = area(shape);
	if (direction > 0) {
		shape = reverse(shape);
	}
	return shape;
}

const autoReverse = shape => applyFuncToShapes(autoReversePoints, shape);

export default autoReverse;
