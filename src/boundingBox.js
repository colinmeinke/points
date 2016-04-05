const boundingBox = shape => {
  let bottom;
  let left;
  let right;
  let top;

  const shapes = Array.isArray( shape[ 0 ]) ? shape : [ shape ];

  shapes.forEach( shp => shp.forEach(({ x, y }) => {
    if ( !bottom || y > bottom ) {
      bottom = y;
    }

    if ( !left || x < left ) {
      left = x;
    }

    if ( !right || x > right ) {
      right = x;
    }

    if ( !top || y < top ) {
      top = y;
    }
  }));

  return {
    bottom,
    center: {
      x: left + (( right - left ) / 2 ),
      y: top + (( bottom - top ) / 2 )
    },
    left,
    right,
    top,
  };
};

export default boundingBox;
