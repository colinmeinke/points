const moveIndex = ( shape, offset ) => {
  const k = shape.length - 1;
  const c = shape[ 0 ];
  const l = shape[ k ];
  const o = (( offset % k ) + k ) % k;

  if ( c.x === l.x && c.y === l.y ) {
    return [
      { x: shape[ o ].x, y: shape[ o ].y },
      ...shape.splice( o + 1 ),
      ...shape.splice( 1, o ),
    ];
  }

  return shape;
};

export default moveIndex;
