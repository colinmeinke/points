/* globals test expect */

import add from '../src/add'

test('`add` should throw an error if not passed a second argument', () => {
  const shape = [
    { x: 0, y: 0, moveTo: true },
    { x: 50, y: 25 },
    { x: -10, y: -100 }
  ]

  expect(() => add(shape)).toThrow()
})

test('`add` should add correct number of extra points', () => {
  const shape = [
    { x: 0, y: 0, moveTo: true },
    { x: 50, y: 25 },
    { x: -10, y: -100 }
  ]

  expect(add(shape, 5).length).toBe(5)
})

test('`add` should add correct extra points at midpoints', () => {
  const shape = [
    { x: 0, y: 0, moveTo: true },
    { x: 50, y: 25 },
    { x: -10, y: -100 }
  ]

  const expectedShape = [
    { x: 0, y: 0, moveTo: true },
    { x: 25, y: 12.5 },
    { x: 50, y: 25 },
    { x: 20, y: -37.5 },
    { x: -10, y: -100 }
  ]

  expect(add(shape, 5)).toEqual(expectedShape)
})

test('`add` should add correct extra midpoints at midpoints when less than one per join', () => {
  const shape = [
    { x: 50, y: 50, moveTo: true },
    { x: 150, y: 50 },
    { x: 150, y: 150 },
    { x: 50, y: 150 },
    { x: 50, y: 50 }
  ]

  const expectedShape = [
    { x: 50, y: 50, moveTo: true },
    { x: 100, y: 50 },
    { x: 150, y: 50 },
    { x: 150, y: 150 },
    { x: 50, y: 150 },
    { x: 50, y: 50 }
  ]

  expect(add(shape, 6)).toEqual(expectedShape)
})

test('`add` should add correct number of extra points when more than one per join', () => {
  const shape = [
    { x: 0, y: 0, moveTo: true },
    { x: 50, y: 25 },
    { x: -10, y: -100 }
  ]

  expect(add(shape, 8).length).toBe(8)
})

test('`add` should add correct extra midpoints at midpoints when more than one per join', () => {
  const shape = [
    { x: 0, y: 0, moveTo: true },
    { x: 50, y: 25 },
    { x: -10, y: -100 }
  ]

  const expectedShape = [
    { x: 0, y: 0, moveTo: true },
    { x: 12.5, y: 6.25 },
    { x: 25, y: 12.5 },
    { x: 37.5, y: 18.75 },
    { x: 50, y: 25 },
    { x: 35, y: -6.25 },
    { x: 20, y: -37.5 },
    { x: -10, y: -100 }
  ]

  expect(add(shape, 8)).toEqual(expectedShape)
})

test('`add` should add correct curve midpoint', () => {
  const shape = [
    { x: 0, y: 0, moveTo: true },
    { x: 100, y: 0, curve: { type: 'cubic', x1: 0, y1: 30, x2: 100, y2: 30 } }
  ]

  const expectedShape = [
    { x: 0, y: 0, moveTo: true },
    { x: 50, y: 22.5, curve: { type: 'cubic', x1: 0, y1: 15, x2: 25, y2: 22.5 } },
    { x: 100, y: 0, curve: { type: 'cubic', x1: 75, y1: 22.5, x2: 100, y2: 15 } }
  ]

  expect(add(shape, 3)).toEqual(expectedShape)
})

test('`add` should not add midpoint between a moveTo point', () => {
  const shape = [
    { x: 10, y: 10, moveTo: true },
    { x: 10, y: 20 },
    { x: 20, y: 10, moveTo: true },
    { x: 20, y: 20 }
  ]

  const expectedShape = [
    { x: 10, y: 10, moveTo: true },
    { x: 10, y: 15 },
    { x: 10, y: 20 },
    { x: 20, y: 10, moveTo: true },
    { x: 20, y: 15 },
    { x: 20, y: 20 }
  ]

  expect(add(shape, 6)).toEqual(expectedShape)
})
