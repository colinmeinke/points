import cubify from './cubify';

const reversePoints = shape => {
  let c;

  return shape.reverse().map(({ x, y, curve }) => {
    const point = { x, y };

    if ( c ) {
      const { x1: x2, y1: y2, x2: x1, y2: y1 } = c;
      point.curve = { type: 'cubic', x1, y1, x2, y2 };
    }

    c = curve ? curve : null;

    return point;
  });
};

const reverse = s => applyFuncToShapes( cubify( s ), reversePoints );

export default reverse;
