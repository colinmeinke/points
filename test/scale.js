import expect from 'expect';

import scale from '../src/scale';

describe( 'scale', () => {
  it( 'should increase scale correctly', () => {
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

  it( 'should decrease scale correctly', () => {
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
});
