const isShapeArray = s => Array.isArray( s[ 0 ]);

const getShapeArray = s => isShapeArray( s ) ? s : [ s ];

const applyFuncToShapes = ( s, f ) => {
  if ( isShapeArray( s )) {
    return s.map( shape => f( s ));
  }

  return f( s );
};

export { applyFuncToShapes, getShapeArray, isShapeArray };
