const isShapeArray = s => Array.isArray( s[ 0 ]);

const getShapeArray = s => isShapeArray( s ) ? s : [ s ];

const applyFuncToShapes = ( f, s, ...args ) => {
  if ( isShapeArray( s )) {
    return s.map( shape => f( shape, ...args ));
  }

  return f( s, ...args );
};

export { applyFuncToShapes, getShapeArray, isShapeArray };
