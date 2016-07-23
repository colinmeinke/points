import expect from 'expect';

import boundingBox from '../src/boundingBox';

describe( 'boundingBox', () => {
  it( 'should return correct coordinates from shape', () => {
    const shape = [
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

    expect( boundingBox( shape )).toEqual( expectedCoordinates );
  });

  it( 'should return correct coordinates from shape array', () => {
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

    const expectedCoordinates = {
      bottom: 150,
      center: { x: 75, y: 75 },
      left: 0,
      right: 150,
      top: 0,
    };

    expect( boundingBox( shapes )).toEqual( expectedCoordinates );
  });

  it( 'should return correct coordinates from circle', () => {
    const shape = [
      { x: 50, y: 30, moveTo: true },
      { x: 50, y: 70, curve: { type: 'arc', rx: 20, ry: 20, sweepFlag: 1 }},
      { x: 50, y: 30, curve: { type: 'arc', rx: 20, ry: 20, sweepFlag: 1 }},
    ];

    const expectedCoordinates = {
      bottom: 70,
      center: { x: 50, y: 50 },
      left: 30,
      right: 70,
      top: 30,
    };

    expect( boundingBox( shape )).toEqual( expectedCoordinates );
  });
});
