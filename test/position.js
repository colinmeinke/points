import expect from 'expect';

import position from '../src/position';

describe( 'position', () => {
  it( 'should calculate correct position on two point line', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 0, y: 100 },
    ];

    expect( position( shape, 0.5 )).toEqual({ x: 0, y: 50 });
  });

  it( 'should calculate correct position on complex two point line', () => {
    const shape = [
      { x: 100, y: 10, moveTo: true },
      { x: -100, y: -90 },
    ];

    expect( position( shape, 0.25 )).toEqual({ x: 50, y: -15 });
  });

  it( 'should calculate correct position on square', () => {
    const shape = [
      { x: 50, y: 50, moveTo: true },
      { x: -50, y: 50 },
      { x: -50, y: -50 },
      { x: 50, y: -50 },
      { x: 50, y: 50 },
    ];

    expect( position( shape, 0.75 )).toEqual({ x: 50, y: -50 });
  });

  it( 'should calculate correct position on circle', () => {
    const shape = [
      { x: 50, y: 30, moveTo: true },
      { x: 50, y: 70, curve: { type: 'arc', rx: 20, ry: 20 }},
      { x: 50, y: 30, curve: { type: 'arc', rx: 20, ry: 20 }},
    ];

    const { x, y } = position( shape, 0.25 );
    const p = { x: Math.round( x ), y: Math.round( y )};

    expect( p ).toEqual({ x: 30, y: 50 });
  });

  it( 'should calculate correct position on line with mid-shape moveTo', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 20, moveTo: true },
      { x: 0, y: 20 },
    ];

    expect( position( shape, 0.75 )).toEqual({ x: 50, y: 20 });
  });
});
