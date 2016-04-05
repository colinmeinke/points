import expect from 'expect';

import boundingBox from '../src/boundingBox';

describe( 'boundingBox', () => {
  it( 'should return correct coordinates', () => {
    const points = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 },
    ];

    const expectedCoordinates = {
      bottom: 100,
      center: { x: 50, y: 50 },
      left: 0,
      right: 100,
      top: 0,
    };

    expect( boundingBox( points )).toEqual( expectedCoordinates );
  });
});
