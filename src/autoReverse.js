import area from './area';
import reverse from './reverse';

export default function autoReverse (shape) {
	let direction = area(shape);
	if (direction > 0) {
		shape = reverse(shape);
	}
	return shape;
}
