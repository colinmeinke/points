import cubify from './cubify';

const middle = ( a, b ) => {
  const c = a === b ? 0 : Math.abs( b - a );
  return c === 0 ? a : ( a < b ? a + c / 2 : a - c / 2 );
};

const basicPoints = ( a, b ) => [{
  x: middle( a.x, b.x ),
  y: middle( a.y, b.y ),
}, b ];

const curvePoints = ( a, b ) => {
  const { x1, y1, x2, y2 } = b.curve;

  const A = { x: a.x, y: a.y };
  const B = { x: x1, y: y1 };
  const C = { x: x2, y: y2 };
  const D = { x: b.x, y: b.y };
  const E = { x: middle( A.x, B.x ), y: middle( A.y, B.y )};
  const F = { x: middle( B.x, C.x ), y: middle( B.y, C.y )};
  const G = { x: middle( C.x, D.x ), y: middle( C.y, D.y )};
  const H = { x: middle( E.x, F.x ), y: middle( E.y, F.y )};
  const J = { x: middle( F.x, G.x ), y: middle( F.y, G.y )};
  const K = { x: middle( H.x, J.x ), y: middle( H.y, J.y )};

  return [
    { x: K.x, y: K.y, curve: { type: 'cubic', x1: E.x, y1: E.y, x2: H.x, y2: H.y }},
    { x: D.x, y: D.y, curve: { type: 'cubic', x1: J.x, y1: J.y, x2: G.x, y2: G.y }},
  ];
};

const points = ( a, b ) => b.curve ? curvePoints( a, b ) : basicPoints( a, b );

const addPoints = ( shape, pointsRequired ) => {
  const s = [ ...shape ];

  for ( let i = 1; i < s.length; i += 2 ) {
    if ( s.length >= pointsRequired ) {
      return s;
    }

    const [ a, b ] = points( s[ i - 1 ], s[ i ]);

    s.splice( i, 1, a, b );
  }

  return addPoints( s, pointsRequired );
};

const add = ( shape, pointsRequired ) => addPoints( cubify( shape ), pointsRequired );

export default add;
