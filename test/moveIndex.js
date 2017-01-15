/* globals test expect */

import moveIndex from '../src/moveIndex'

test('`movieIndex` should move index to correct point when positive offset', () => {
  const shape = [
    { x: 0, y: 0, moveTo: true },
    { x: 50, y: 25 },
    { x: -10, y: -100 },
    { x: 40, y: 30 },
    { x: 20, y: 50 },
    { x: 0, y: 0 }
  ]

  const expectedShape = [
    { x: -10, y: -100, moveTo: true },
    { x: 40, y: 30 },
    { x: 20, y: 50 },
    { x: 0, y: 0 },
    { x: 50, y: 25 },
    { x: -10, y: -100 }
  ]

  expect(moveIndex(shape, 2)).toEqual(expectedShape)
})

test('`movieIndex` should move index to correct point positive offset more than number of total points', () => {
  const shape = [
    { x: 0, y: 0, moveTo: true },
    { x: 50, y: 25 },
    { x: -10, y: -100 },
    { x: 40, y: 30 },
    { x: 20, y: 50 },
    { x: 0, y: 0 }
  ]

  const expectedShape = [
    { x: 40, y: 30, moveTo: true },
    { x: 20, y: 50 },
    { x: 0, y: 0 },
    { x: 50, y: 25 },
    { x: -10, y: -100 },
    { x: 40, y: 30 }
  ]

  expect(moveIndex(shape, 13)).toEqual(expectedShape)
})

test('`movieIndex` should move index to correct point when negative offset', () => {
  const shape = [
    { x: 0, y: 0, moveTo: true },
    { x: 50, y: 25 },
    { x: -10, y: -100 },
    { x: 40, y: 30 },
    { x: 20, y: 50 },
    { x: 0, y: 0 }
  ]

  const expectedShape = [
    { x: 40, y: 30, moveTo: true },
    { x: 20, y: 50 },
    { x: 0, y: 0 },
    { x: 50, y: 25 },
    { x: -10, y: -100 },
    { x: 40, y: 30 }
  ]

  expect(moveIndex(shape, -2)).toEqual(expectedShape)
})

test('`movieIndex` should move index to correct point when negative offset more than number of total points', () => {
  const shape = [
    { x: 0, y: 0, moveTo: true },
    { x: 50, y: 25 },
    { x: -10, y: -100 },
    { x: 40, y: 30 },
    { x: 20, y: 50 },
    { x: 0, y: 0 }
  ]

  const expectedShape = [
    { x: -10, y: -100, moveTo: true },
    { x: 40, y: 30 },
    { x: 20, y: 50 },
    { x: 0, y: 0 },
    { x: 50, y: 25 },
    { x: -10, y: -100 }
  ]

  expect(moveIndex(shape, -13)).toEqual(expectedShape)
})

test('`movieIndex` should handle moving index when multiple moveTo points', () => {
  const shape = [
    { x: 0, y: 0, moveTo: true },
    { x: 0, y: 100 },
    { x: 100, y: 0, moveTo: true },
    { x: 100, y: 100 },
    { x: 200, y: 0, moveTo: true },
    { x: 200, y: 100 },
    { x: 0, y: 0 }
  ]

  const expectedShape = [
    { x: 100, y: 0, moveTo: true },
    { x: 100, y: 100 },
    { x: 200, y: 0, moveTo: true },
    { x: 200, y: 100 },
    { x: 0, y: 0 },
    { x: 0, y: 0, moveTo: true },
    { x: 0, y: 100 }
  ]

  expect(moveIndex(shape, 2)).toEqual(expectedShape)
})

test('`movieIndex` should handle moving index to curve point', () => {
  const shape = [
    { x: 0, y: 0, moveTo: true },
    { x: 50, y: 25, curve: { type: 'quadratic', x1: 0, y1: 25 } },
    { x: -10, y: -100 },
    { x: 40, y: 30 },
    { x: 20, y: 50 },
    { x: 0, y: 0 }
  ]

  const expectedShape = [
    { x: 50, y: 25, moveTo: true },
    { x: -10, y: -100 },
    { x: 40, y: 30 },
    { x: 20, y: 50 },
    { x: 0, y: 0 },
    { x: 50, y: 25, curve: { type: 'quadratic', x1: 0, y1: 25 } }
  ]

  expect(moveIndex(shape, 1)).toEqual(expectedShape)
})

test('`moveIndex` should handle move index on non-joining shape', () => {
  const shape = [
    { x: 30, y: 40, moveTo: true },
    { x: 40, y: 80 },
    { x: 50, y: 60 }
  ]

  const expectedShape = [
    { x: 40, y: 80, moveTo: true },
    { x: 50, y: 60 },
    { x: 30, y: 40, moveTo: true },
    { x: 40, y: 80 }
  ]

  expect(moveIndex(shape, 1)).toEqual(expectedShape)
})

test('`moveIndex` should handle move index on multi-line joining shape', () => {
  const shape = [
    { x: 30, y: 40, moveTo: true },
    { x: 40, y: 80 },
    { x: 50, y: 60 },
    { x: 30, y: 40 },
    { x: 130, y: 40, moveTo: true },
    { x: 140, y: 80 },
    { x: 150, y: 60 },
    { x: 130, y: 40 }
  ]

  const expectedShape = [
    { x: 40, y: 80, moveTo: true },
    { x: 50, y: 60 },
    { x: 30, y: 40 },
    { x: 40, y: 80 },
    { x: 130, y: 40, moveTo: true },
    { x: 140, y: 80 },
    { x: 150, y: 60 },
    { x: 130, y: 40 }
  ]

  expect(moveIndex(shape, 1)).toEqual(expectedShape)
})

test('`moveIndex` should handle a more complex move index on multi-line joining shape', () => {
  const shape = [
    { x: 30, y: 40, moveTo: true },
    { x: 40, y: 80 },
    { x: 50, y: 60 },
    { x: 30, y: 40 },
    { x: 130, y: 40, moveTo: true },
    { x: 140, y: 80 },
    { x: 150, y: 60 },
    { x: 130, y: 40 }
  ]

  const expectedShape = [
    { x: 150, y: 60, moveTo: true },
    { x: 130, y: 40 },
    { x: 140, y: 80 },
    { x: 150, y: 60 },
    { x: 30, y: 40, moveTo: true },
    { x: 40, y: 80 },
    { x: 50, y: 60 },
    { x: 30, y: 40 }
  ]

  expect(moveIndex(shape, 11)).toEqual(expectedShape)
})

test('`moveIndex` should handle a move index on multi-line mixed joining and non-joining shape', () => {
  const shape = [
    { x: 10, y: 10, moveTo: true },
    { x: 10, y: 100 },
    { x: 100, y: 10, moveTo: true },
    { x: 200, y: 100 },
    { x: 100, y: 100 },
    { x: 100, y: 10 },
    { x: 200, y: 10, moveTo: true },
    { x: 10, y: 10 }
  ]

  const expectedShape = [
    { x: 200, y: 100, moveTo: true },
    { x: 100, y: 100 },
    { x: 100, y: 10 },
    { x: 200, y: 100 },
    { x: 200, y: 10, moveTo: true },
    { x: 10, y: 10 },
    { x: 10, y: 10, moveTo: true },
    { x: 10, y: 100 }
  ]

  expect(moveIndex(shape, 3)).toEqual(expectedShape)
})

test('`moveIndex` should handle move index on non-joining shape with curves', () => {
  const shape = [
    { x: 0, y: 0, moveTo: true },
    { x: 100, y: 100, curve: { type: 'cubic', x1: 100, y1: 0, x2: 0, y2: 100 } },
    { x: 200, y: 0, curve: { type: 'cubic', x1: 200, y1: 100, x2: 100, y2: 0 } },
    { x: 300, y: 100, curve: { type: 'cubic', x1: 300, y1: 0, x2: 200, y2: 100 } }
  ]

  const expectedShape = [
    { x: 100, y: 100, moveTo: true },
    { x: 200, y: 0, curve: { type: 'cubic', x1: 200, y1: 100, x2: 100, y2: 0 } },
    { x: 300, y: 100, curve: { type: 'cubic', x1: 300, y1: 0, x2: 200, y2: 100 } },
    { x: 0, y: 0, moveTo: true },
    { x: 100, y: 100, curve: { type: 'cubic', x1: 100, y1: 0, x2: 0, y2: 100 } }
  ]

  expect(moveIndex(shape, 1)).toEqual(expectedShape)
})
