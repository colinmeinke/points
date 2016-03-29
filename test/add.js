import expect from 'expect';

import add from '../src/add';

describe( 'add', () => {
  it( 'should add correct number of extra points', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
    ];

    expect( add( points, 5 ).length ).toBe( 5 );
  });

  it( 'should add correct extra points at midpoints', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
    ];

    const expectedPoints = [
      { x: 0, y: 0 },
      { x: 25, y: 12.5 },
      { x: 50, y: 25 },
      { x: 20, y: -37.5 },
      { x: -10, y: -100 },
    ];

    expect( add( points, 5 )).toEqual( expectedPoints );
  });

  it( 'should add correct extra midpoints at midpoints when less than one per join', () => {
    const points = [
      { x: 50, y: 50 },
      { x: 150, y: 50 },
      { x: 150, y: 150 },
      { x: 50, y: 150 },
      { x: 50, y: 50 },
    ];

    const expectedPoints = [
      { x: 50, y: 50 },
      { x: 100, y: 50 },
      { x: 150, y: 50 },
      { x: 150, y: 150 },
      { x: 50, y: 150 },
      { x: 50, y: 50 },
    ];

    expect( add( points, 6 )).toEqual( expectedPoints );
  });

  it( 'should add correct number of extra points when more than one per join', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
    ];

    expect( add( points, 8 ).length ).toBe( 8 );
  });


  it( 'should add correct extra midpoints at midpoints when more than one per join', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 50, y: 25 },
      { x: -10, y: -100 },
    ];

    const expectedPoints = [
      { x: 0, y: 0 },
      { x: 12.5, y: 6.25 },
      { x: 25, y: 12.5 },
      { x: 37.5, y: 18.75 },
      { x: 50, y: 25 },
      { x: 35, y: -6.25 },
      { x: 20, y: -37.5 },
      { x: -10, y: -100 },
    ];

    expect( add( points, 8 )).toEqual( expectedPoints );
  });

  it( 'should add correct curve midpoint', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 100, y: 0, curve: { type: 'cubic', x1: 0, y1: 30, x2: 100, y2: 30 }},
    ];

    const expectedPoints = [
      { x: 0, y: 0 },
      { x: 50, y: 22.5, curve: { type: 'cubic', x1: 0, y1: 15, x2: 25, y2: 22.5 }},
      { x: 100, y: 0, curve: { type: 'cubic', x1: 75, y1: 22.5, x2: 100, y2: 15 }},
    ];

    expect( add( points, 3 )).toEqual( expectedPoints );
  });
});
