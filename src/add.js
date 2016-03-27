const straightMidPoint = ( a, b ) => {
  const x = a.x === b.x ? 0 : Math.abs( b.x - a.x );
  const y = a.y === b.y ? 0 : Math.abs( b.y - a.y );

  return {
    x: x === 0 ? a.x : ( a.x < b.x ? a.x + x / 2 : a.x - x / 2 ),
    y: y === 0 ? a.y : ( a.y < b.y ? a.y + y / 2 : a.y - y / 2 ),
  };
};

const midPoint = ( a, b ) => {
  if ( !b.curve ) {
    return straightMidPoint( a, b );
  }

  return false;
};

const add = ( shape, pointsRequired ) => {
  const s = [ ...shape ];

  for ( let i = 1; i < s.length; ) {
    const m = midPoint( s[ i - 1 ], s[ i ]);

    if ( m ) {
      s.splice( i, 0, m );

      if ( s.length === pointsRequired ) {
        return s;
      }

      i += 2;
    } else {
      i++;
    }
  }

  if ( s.length === shape.length ) {
    const additionalPoints = pointsRequired - s.length;
    const newPoint = { x: s[ 0 ].x, y: s[ 0 ].y };

    for ( let i = 0; i < additionalPoints; i++ ) {
      s.unshift( newPoint );
    }

    return s;
  }

  return add( s, pointsRequired );
}

export default add;
