const offset = ( points, x = 0, y = 0 ) => points.map( point => {
  const p = { ...point };

  p.x += x;
  p.y += y;

  if ( p.curve ) {
    if ( p.curve.type === 'quadratic' || p.curve.type === 'cubic' ) {
      p.curve.x1 += x;
      p.curve.y1 += y;
    }

    if ( p.curve.type === 'cubic' ) {
      p.curve.x2 += x;
      p.curve.y2 += y;
    }
  }

  return p;
});

export default offset;
