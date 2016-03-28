import expect from 'expect';

import moveIndex from '../src/moveIndex';

describe( 'moveIndex', () => {
  it( 'should move index to correct point when positive offset', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
      { x: 40, y: 30 },
      { x: 20, y: 50 },
      { x: 0, y: 0 },
    ];

    const expectedPoints = [
      { x: -10, y: -100 },
      { x: 40, y: 30 },
      { x: 20, y: 50 },
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
    ];

    expect( moveIndex( points, 2 )).toEqual( expectedPoints );
  });

  it( 'should move index to correct point positive offset more than number of total points', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
      { x: 40, y: 30 },
      { x: 20, y: 50 },
      { x: 0, y: 0 },
    ];

    const expectedPoints = [
      { x: 40, y: 30 },
      { x: 20, y: 50 },
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
      { x: 40, y: 30 },
    ];

    expect( moveIndex( points, 13 )).toEqual( expectedPoints );
  });

  it( 'should move index to correct point when negative offset', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
      { x: 40, y: 30 },
      { x: 20, y: 50 },
      { x: 0, y: 0 },
    ];

    const expectedPoints = [
      { x: 40, y: 30 },
      { x: 20, y: 50 },
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
      { x: 40, y: 30 },
    ];

    expect( moveIndex( points, -2 )).toEqual( expectedPoints );
  });

  it( 'should move index to correct point when negative offset more than number of total points', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
      { x: 40, y: 30 },
      { x: 20, y: 50 },
      { x: 0, y: 0 },
    ];

    const expectedPoints = [
      { x: -10, y: -100 },
      { x: 40, y: 30 },
      { x: 20, y: 50 },
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
    ];

    expect( moveIndex( points, -13 )).toEqual( expectedPoints );
  });

  it( 'should not move index if shape does not join', () => {
    const points = [
      { x: 30, y: 40 },
      { x: 40, y: 50 },
      { x: 50, y: 60 },
    ];

    expect( moveIndex( points, 1 )).toEqual( points );
  });
});
