const applyFuncToShapes = ( f, s, ...args ) => {
  if ( isShapeArray( s )) {
    return s.map( shape => f( shape, ...args ));
  }

  return f( s, ...args );
};

const getShapeArray = s => isShapeArray( s ) ? s : [ s ];

const isShapeArray = s => Array.isArray( s[ 0 ]);

const numberAtInterval = ( a, b, interval ) => {
  const c = a === b ? 0 : Math.abs( b - a );
  return c === 0 ? a : ( a < b ? a + c * interval : a - c * interval );
};

export { applyFuncToShapes, getShapeArray, isShapeArray, numberAtInterval };
