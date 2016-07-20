import cubify from './cubify';
import { curvePoints } from './add';

const defaultAccuracy = 1;

const angle = triangle => {
  const [ ax, ay ] = triangle[ 0 ];
  const [ bx, by ] = triangle[ 1 ];
  const [ cx, cy ] = triangle[ 2 ];

  const a = linearLength( ax, ay, bx, by );
  const b = linearLength( bx, by, cx, cy );
  const c = linearLength( cx, cy, ax, ay );

  const r = Math.acos(
    ( Math.pow( a, 2 ) + Math.pow( c, 2 ) - Math.pow( b, 2 )) /
    ( 2 * a * c )
  );

  return r * ( 180 / Math.PI );
};

const curved = shape => shape.reduce(( c, { curve }) => curve ? true : c, false );

const decurve = ( shape, accuracy = defaultAccuracy ) => {
  const s = cubify( shape );
  const d = [];

  s.map(( point, i ) => {
    if ( point.curve ) {
      const prevPoint = s[ i - 1 ];
      straighten( prevPoint, point, accuracy )
        .map( p => d.push( p ));
    } else {
      d.push( point );
    }
  });

  return d;
};

const length = ( shape, accuracy = defaultAccuracy ) => {
  const s = curved( shape ) ? decurve( shape, accuracy ) : shape;

  return s.reduce(( currentLength, { x: x2, y: y2, moveTo }, i ) => {
    if ( !moveTo ) {
      const { x: x1, y: y1 } = s[ i - 1 ];
      currentLength += linearLength( x1, y1, x2, y2 );
    }

    return currentLength;
  }, 0 );
};

const linearLength = ( x1, y1, x2, y2 ) => Math.sqrt(
  Math.pow( x1 - x2, 2 ) + Math.pow( y1 - y2, 2 )
);

const straight = ( x1, y1, cx1, cy1, x2, y2, cx2, cy2, accuracy ) => {
  const t1 = [[ x1, y1 ], [ x2, y2 ], [ cx1, cy1 ]];
  const t2 = [[ x2, y2 ], [ x1, y1 ], [ cx2, cy2 ]];
  return angle( t1 ) < accuracy && angle( t2 ) < accuracy;
};

const straighten = ( prevPoint, point, accuracy ) => {
  const { x: x1, y: y1 } = prevPoint;
  const { x: x2, y: y2, curve } = point;
  const { x1: cx1, y1: cy1, x2: cx2, y2: cy2 } = curve;

  if ( straight( x1, y1, cx1, cy1, x2, y2, cx2, cy2, accuracy )) {
    return [ point ];
  }

  const [ midPoint, lastPoint ] = curvePoints( prevPoint, point );

  return [
    ...straighten( prevPoint, midPoint, accuracy ),
    ...straighten( midPoint, lastPoint, accuracy ),
  ];
};

export { decurve };
export default length;
