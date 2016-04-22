import expect from 'expect';

import moveIndex from '../src/moveIndex';

describe( 'moveIndex', () => {
  it( 'should move index to correct point when positive offset', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
      { x: 40, y: 30 },
      { x: 20, y: 50 },
      { x: 0, y: 0 },
    ];

    const expectedShape = [
      { x: -10, y: -100, moveTo: true },
      { x: 40, y: 30 },
      { x: 20, y: 50 },
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
    ];

    expect( moveIndex( shape, 2 )).toEqual( expectedShape );
  });

  it( 'should move index to correct point positive offset more than number of total points', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
      { x: 40, y: 30 },
      { x: 20, y: 50 },
      { x: 0, y: 0 },
    ];

    const expectedShape = [
      { x: 40, y: 30, moveTo: true },
      { x: 20, y: 50 },
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
      { x: 40, y: 30 },
    ];

    expect( moveIndex( shape, 13 )).toEqual( expectedShape );
  });

  it( 'should move index to correct point when negative offset', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
      { x: 40, y: 30 },
      { x: 20, y: 50 },
      { x: 0, y: 0 },
    ];

    const expectedShape = [
      { x: 40, y: 30, moveTo: true },
      { x: 20, y: 50 },
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
      { x: 40, y: 30 },
    ];

    expect( moveIndex( shape, -2 )).toEqual( expectedShape );
  });

  it( 'should move index to correct point when negative offset more than number of total points', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
      { x: 40, y: 30 },
      { x: 20, y: 50 },
      { x: 0, y: 0 },
    ];

    const expectedShape = [
      { x: -10, y: -100, moveTo: true },
      { x: 40, y: 30 },
      { x: 20, y: 50 },
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
    ];

    expect( moveIndex( shape, -13 )).toEqual( expectedShape );
  });

  it( 'should handle moving index when multiple moveTo points', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 0, y: 100 },
      { x: 100, y: 0, moveTo: true },
      { x: 100, y: 100 },
      { x: 200, y: 0, moveTo: true },
      { x: 200, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedShape = [
      { x: 100, y: 0, moveTo: true },
      { x: 100, y: 100 },
      { x: 200, y: 0, moveTo: true },
      { x: 200, y: 100 },
      { x: 0, y: 0 },
      { x: 0, y: 100 },
      { x: 100, y: 0, moveTo: true },
    ];

    expect( moveIndex( shape, 2 )).toEqual( expectedShape );
  });

  it( 'should handle moving index to curve point', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 50, y: 25, curve: { type: 'quadratic', x1: 0, y1: 25 }},
      { x: -10, y: -100 },
      { x: 40, y: 30 },
      { x: 20, y: 50 },
      { x: 0, y: 0 },
    ];

    const expectedShape = [
      { x: 50, y: 25, moveTo: true },
      { x: -10, y: -100 },
      { x: 40, y: 30 },
      { x: 20, y: 50 },
      { x: 0, y: 0 },
      { x: 50, y: 25, curve: { type: 'quadratic', x1: 0, y1: 25 }},
    ];

    expect( moveIndex( shape, 1 )).toEqual( expectedShape );
  });

  it( 'should not move index if shape does not join', () => {
    const shape = [
      { x: 30, y: 40 },
      { x: 40, y: 50 },
      { x: 50, y: 60 },
    ];

    expect( moveIndex( shape, 1 )).toEqual( shape );
  });
});
