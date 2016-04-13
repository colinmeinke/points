import expect from 'expect';

import scale from '../src/scale';

describe( 'scale', () => {
  it( 'should increase scale correctly from center', () => {
    const points = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedPoints = [
      { x: -50, y: -50, moveTo: true },
      { x: 150, y: -50 },
      { x: 150, y: 150 },
      { x: -50, y: 150 },
      { x: -50, y: -50 },
    ];

    expect( scale( points, 2, 'center' )).toEqual( expectedPoints );
  });

  it( 'should decrease scale correctly from center', () => {
    const points = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedPoints = [
      { x: 25, y: 25, moveTo: true },
      { x: 75, y: 25 },
      { x: 75, y: 75 },
      { x: 25, y: 75 },
      { x: 25, y: 25 },
    ];

    expect( scale( points, 0.5, 'center' )).toEqual( expectedPoints );
  });

  it( 'should increase scale correctly from top left', () => {
    const points = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedPoints = [
      { x: 0, y: 0, moveTo: true },
      { x: 200, y: 0 },
      { x: 200, y: 200 },
      { x: 0, y: 200 },
      { x: 0, y: 0 },
    ];

    expect( scale( points, 2, 'topLeft' )).toEqual( expectedPoints );
  });

  it( 'should decrease scale correctly from top left', () => {
    const points = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedPoints = [
      { x: 0, y: 0, moveTo: true },
      { x: 50, y: 0 },
      { x: 50, y: 50 },
      { x: 0, y: 50 },
      { x: 0, y: 0 },
    ];

    expect( scale( points, 0.5, 'topLeft' )).toEqual( expectedPoints );
  });

  it( 'should increase scale correctly from top right', () => {
    const points = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedPoints = [
      { x: -100, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 200 },
      { x: -100, y: 200 },
      { x: -100, y: 0 },
    ];

    expect( scale( points, 2, 'topRight' )).toEqual( expectedPoints );
  });

  it( 'should decrease scale correctly from top right', () => {
    const points = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedPoints = [
      { x: 50, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 50 },
      { x: 50, y: 50 },
      { x: 50, y: 0 },
    ];

    expect( scale( points, 0.5, 'topRight' )).toEqual( expectedPoints );
  });

  it( 'should increase scale correctly from bottom right', () => {
    const points = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedPoints = [
      { x: -100, y: -100, moveTo: true },
      { x: 100, y: -100 },
      { x: 100, y: 100 },
      { x: -100, y: 100 },
      { x: -100, y: -100 },
    ];

    expect( scale( points, 2, 'bottomRight' )).toEqual( expectedPoints );
  });

  it( 'should decrease scale correctly from bottom right', () => {
    const points = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedPoints = [
      { x: 50, y: 50, moveTo: true },
      { x: 100, y: 50 },
      { x: 100, y: 100 },
      { x: 50, y: 100 },
      { x: 50, y: 50 },
    ];

    expect( scale( points, 0.5, 'bottomRight' )).toEqual( expectedPoints );
  });

  it( 'should increase scale correctly from bottom left', () => {
    const points = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedPoints = [
      { x: 0, y: -100, moveTo: true },
      { x: 200, y: -100 },
      { x: 200, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: -100 },
    ];

    expect( scale( points, 2, 'bottomLeft' )).toEqual( expectedPoints );
  });

  it( 'should decrease scale correctly from bottom left', () => {
    const points = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedPoints = [
      { x: 0, y: 50, moveTo: true },
      { x: 50, y: 50 },
      { x: 50, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 50 },
    ];

    expect( scale( points, 0.5, 'bottomLeft' )).toEqual( expectedPoints );
  });
});
