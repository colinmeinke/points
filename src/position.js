import decurve from './decurve';
import length, { linearLength } from './length';
import { numberAtInterval } from './helpers';

const position = ( shape, interval, accuracy ) => {
  const s = decurve( shape, accuracy );
  const desiredLength = length( s ) * interval;

  let currentLength = 0;

  for ( let i = 0, l = s.length; i < l; i++ ) {
    const { x: x2, y: y2, moveTo } = s[ i ];

    if ( !moveTo ) {
      const { x: x1, y: y1 } = s[ i - 1 ];
      const segmentLength = linearLength( x1, y1, x2, y2 );

      if ( currentLength + segmentLength >= desiredLength ) {
        const segmentInterval = ( desiredLength - currentLength ) / segmentLength;

        return {
          x: numberAtInterval( x1, x2, segmentInterval ),
          y: numberAtInterval( y1, y2, segmentInterval ),
        };
      }

      currentLength += segmentLength;
    }
  }
};

export default position;
