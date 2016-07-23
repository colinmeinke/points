import expect from 'expect';

import rotate from '../src/rotate';

describe( 'rotate', () => {
  it( 'should correctly calculate rotation of square', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedShape = [
      { x: 100, y: 0, moveTo: true },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
      { x: 100, y: 0 },
    ];

    expect( rotate( shape, 90 )).toEqual( expectedShape );
  });

  it( 'should correctly calculate rotation of triangle', () => {
    const shape = [
      { x: 50, y: 0, moveTo: true },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 50, y: 0 },
    ];

    const expectedShape = [
      { x: 25, y: 93.3, moveTo: true },
      { x: 31.7, y: -18.3 },
      { x: 118.3, y: 31.7 },
      { x: 25, y: 93.3 },
    ];

    const result = rotate( shape, 210 ).map(({ x, y, ...props }) => {
      return {
        ...props,
        x: Math.round( x * 10 ) / 10,
        y: Math.round( y * 10 ) / 10,
      }
    });

    expect( result ).toEqual( expectedShape );
  });

  it( 'should correctly calculate rotation of curved path', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 100, curve: { type: 'quadratic', x1: 50, y1: 50 }},
      { x: 0, y: 200, curve: { type: 'quadratic', x1: 50, y1: 150 }},
      { x: -100, y: 100, curve: { type: 'quadratic', x1: -50, y1: 150 }},
      { x: 0, y: 0, curve: { type: 'quadratic', x1: -50 , y1: 50 }},
    ];

    const expectedShape = [
      { x: 100, y: 100, moveTo: true },
      { x: 0, y: 200, curve: { type: 'quadratic', x1: 50, y1: 150 }},
      { x: -100, y: 100, curve: { type: 'quadratic', x1: -50, y1: 150 }},
      { x: 0, y: 0, curve: { type: 'quadratic', x1: -50 , y1: 50 }},
      { x: 100, y: 100, curve: { type: 'quadratic', x1: 50, y1: 50 }}
    ];

    const result = rotate( shape, 90 ).map(({ x, y, ...props }) => {
      return {
        ...props,
        x: Math.round( x * 10 ) / 10,
        y: Math.round( y * 10 ) / 10,
      }
    });

    expect( result ).toEqual( expectedShape );
  });
});
