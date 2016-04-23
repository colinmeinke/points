import expect from 'expect';

import { applyFuncToShapes, getShapeArray, isShapeArray } from '../src/helpers';

describe( 'isShapeArray', () => {
  it( 'should return true if array of arrays', () => {
    expect( isShapeArray([[],[],[]])).toBe( true );
  });

  it( 'should return false if array of objects', () => {
    expect( isShapeArray([{},{},{}])).toBe( false );
  });

  it( 'should return false if empty array', () => {
    expect( isShapeArray([])).toBe( false );
  });
});

describe( 'getShapeArray', () => {
  it( 'should return shapes array if array of shapes', () => {
    const shapes = [
      [
        { x: 1, y: 1, moveTo: true },
        { x: 2, y: 2 },
      ],
      [
        { x: 3, y: 3, moveTo: true },
        { x: 4, y: 4 },
      ],
    ];

    expect( getShapeArray( shapes )).toEqual( shapes );
  });

  it( 'should return shapes array if a single of shape', () => {
    const shape = [
      { x: 1, y: 1, moveTo: true },
      { x: 2, y: 2 },
    ];

    const expectedShapes = [
      [
        { x: 1, y: 1, moveTo: true },
        { x: 2, y: 2 },
      ],
    ];

    expect( getShapeArray( shape )).toEqual( expectedShapes );
  });
});

describe( 'applyFuncToShapes', () => {
  it( 'should apply function to single shape', () => {
    const shape = [
      [
        { x: 1, y: 1, moveTo: true },
        { x: 2, y: 2 },
      ],
      [
        { x: 3, y: 3, moveTo: true },
        { x: 4, y: 4 },
      ],
    ];

    const func = s => s.map( p => ({ ...p, x: p.x + 1, y: p.y + 1 }));

    const expectedShape = [
      [
        { x: 2, y: 2, moveTo: true },
        { x: 3, y: 3 },
      ],
      [
        { x: 4, y: 4, moveTo: true },
        { x: 5, y: 5 },
      ],
    ];

    expect( applyFuncToShapes( func, shape )).toEqual( expectedShape );
  });

  it( 'should apply function to shapes array', () => {
    const shapes = [
      { x: 1, y: 1, moveTo: true },
      { x: 2, y: 2 },
    ];

    const func = s => s.map( p => ({ ...p, x: p.x + 1, y: p.y + 1 }));

    const expectedShapes = [
      { x: 2, y: 2, moveTo: true },
      { x: 3, y: 3 },
    ];

    expect( applyFuncToShapes( func, shapes )).toEqual( expectedShapes );
  });

  it( 'should apply function with arguments', () => {
    const shape = [
      [
        { x: 1, y: 1, moveTo: true },
        { x: 2, y: 2 },
      ],
      [
        { x: 3, y: 3, moveTo: true },
        { x: 4, y: 4 },
      ],
    ];

    const func = ( s, n ) => s.map( p => ({ ...p, x: p.x + n, y: p.y + n }));

    const expectedShape = [
      [
        { x: 6, y: 6, moveTo: true },
        { x: 7, y: 7 },
      ],
      [
        { x: 8, y: 8, moveTo: true },
        { x: 9, y: 9 },
      ],
    ];

    expect( applyFuncToShapes( func, shape, 5 )).toEqual( expectedShape );
  });
});
