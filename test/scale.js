import expect from 'expect';

import scale from '../src/scale';

describe( 'scale', () => {
  it( 'should increase scale correctly from center', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedShape = [
      { x: -50, y: -50, moveTo: true },
      { x: 150, y: -50 },
      { x: 150, y: 150 },
      { x: -50, y: 150 },
      { x: -50, y: -50 },
    ];

    expect( scale( shape, 2, 'center' )).toEqual( expectedShape );
  });

  it( 'should decrease scale correctly from center', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedShape = [
      { x: 25, y: 25, moveTo: true },
      { x: 75, y: 25 },
      { x: 75, y: 75 },
      { x: 25, y: 75 },
      { x: 25, y: 25 },
    ];

    expect( scale( shape, 0.5, 'center' )).toEqual( expectedShape );
  });

  it( 'should increase scale correctly from top left', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedShape = [
      { x: 0, y: 0, moveTo: true },
      { x: 200, y: 0 },
      { x: 200, y: 200 },
      { x: 0, y: 200 },
      { x: 0, y: 0 },
    ];

    expect( scale( shape, 2, 'topLeft' )).toEqual( expectedShape );
  });

  it( 'should decrease scale correctly from top left', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedShape = [
      { x: 0, y: 0, moveTo: true },
      { x: 50, y: 0 },
      { x: 50, y: 50 },
      { x: 0, y: 50 },
      { x: 0, y: 0 },
    ];

    expect( scale( shape, 0.5, 'topLeft' )).toEqual( expectedShape );
  });

  it( 'should increase scale correctly from top right', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedShape = [
      { x: -100, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 200 },
      { x: -100, y: 200 },
      { x: -100, y: 0 },
    ];

    expect( scale( shape, 2, 'topRight' )).toEqual( expectedShape );
  });

  it( 'should decrease scale correctly from top right', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedShape = [
      { x: 50, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 50 },
      { x: 50, y: 50 },
      { x: 50, y: 0 },
    ];

    expect( scale( shape, 0.5, 'topRight' )).toEqual( expectedShape );
  });

  it( 'should increase scale correctly from bottom right', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedShape = [
      { x: -100, y: -100, moveTo: true },
      { x: 100, y: -100 },
      { x: 100, y: 100 },
      { x: -100, y: 100 },
      { x: -100, y: -100 },
    ];

    expect( scale( shape, 2, 'bottomRight' )).toEqual( expectedShape );
  });

  it( 'should decrease scale correctly from bottom right', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedShape = [
      { x: 50, y: 50, moveTo: true },
      { x: 100, y: 50 },
      { x: 100, y: 100 },
      { x: 50, y: 100 },
      { x: 50, y: 50 },
    ];

    expect( scale( shape, 0.5, 'bottomRight' )).toEqual( expectedShape );
  });

  it( 'should increase scale correctly from bottom left', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedShape = [
      { x: 0, y: -100, moveTo: true },
      { x: 200, y: -100 },
      { x: 200, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: -100 },
    ];

    expect( scale( shape, 2, 'bottomLeft' )).toEqual( expectedShape );
  });

  it( 'should decrease scale correctly from bottom left', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedShape = [
      { x: 0, y: 50, moveTo: true },
      { x: 50, y: 50 },
      { x: 50, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 50 },
    ];

    expect( scale( shape, 0.5, 'bottomLeft' )).toEqual( expectedShape );
  });

  it( 'should increase scale correctly when shape array', () => {
    const shapes = [
      [
        { x: 0, y: 0, moveTo: true },
        { x: 100, y: 0 },
        { x: 100, y: 100 },
        { x: 0, y: 100 },
        { x: 0, y: 0 },
      ],
      [
        { x: 50, y: 50, moveTo: true },
        { x: 150, y: 50 },
        { x: 150, y: 150 },
        { x: 50, y: 150 },
        { x: 50, y: 50 },
      ],
    ];

    const expectedShapes = [
      [
        { x: -75, y: -75, moveTo: true },
        { x: 125, y: -75 },
        { x: 125, y: 125 },
        { x: -75, y: 125 },
        { x: -75, y: -75 },
      ],
      [
        { x: 25, y: 25, moveTo: true },
        { x: 225, y: 25 },
        { x: 225, y: 225 },
        { x: 25, y: 225 },
        { x: 25, y: 25 },
      ],
    ];

    expect( scale( shapes, 2, 'center' )).toEqual( expectedShapes );
  });
});
