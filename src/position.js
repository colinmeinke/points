import decurve from './decurve';
import length, { linearLength } from './length';
import { numberAtInterval } from './helpers';

const over = ( shape, length, totalLength, desiredLength ) => {
  const { x: x1, y: y1 } = shape[ length - 2 ];
  const { x: x2, y: y2 } = shape[ length - 1 ];
  const segmentLength = linearLength( x1, y1, x2, y2 );
  const segmentInterval = ( desiredLength - totalLength ) / segmentLength + 1;
  return { x1, y1, x2, y2, segmentInterval };
};

const position = ( shape, interval, accuracy ) => {
  const s = decurve( shape, accuracy );
  const l = s.length;
  const t = length( s );
  const d = t * interval;

  const { x1, y1, x2, y2, segmentInterval } =
    interval > 1 ? over( s, l, t, d ) :
      ( interval < 0 ? under( s, d ) : within( s, l, d ));

  return {
    x: numberAtInterval( x1, x2, segmentInterval ),
    y: numberAtInterval( y1, y2, segmentInterval ),
  };
};

const under = ( shape, desiredLength ) => {
  const { x: x1, y: y1 } = shape[ 1 ];
  const { x: x2, y: y2 } = shape[ 0 ];
  const segmentLength = linearLength( x1, y1, x2, y2 );
  const segmentInterval = Math.abs( desiredLength ) / segmentLength + 1;
  return { x1, y1, x2, y2, segmentInterval };
};

const within = ( shape, length, desiredLength ) => {
  let currentLength = 0;

  for ( let i = 0; i < length; i++ ) {
    const { moveTo } = shape[ i ];

    if ( !moveTo ) {
      const { x: x1, y: y1 } = shape[ i - 1 ];
      const { x: x2, y: y2 } = shape[ i ];

      const segmentLength = linearLength( x1, y1, x2, y2 );

      if ( currentLength + segmentLength >= desiredLength ) {
        const segmentInterval = ( desiredLength - currentLength ) / segmentLength;
        return { x1, y1, x2, y2, segmentInterval };
      }

      currentLength += segmentLength;
    }
  }
};

export default position;
