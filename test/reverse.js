/* globals test expect */

import reverse from '../src/reverse'

test('`reverse` should reverse order of points', () => {
  const shape = [
    { x: 0, y: 0, moveTo: true },
    { x: 100, y: 0 },
    { x: 100, y: 100 },
    { x: 0, y: 100 },
    { x: 0, y: 0 }
  ]

  const expectedShape = [
    { x: 0, y: 0, moveTo: true },
    { x: 0, y: 100 },
    { x: 100, y: 100 },
    { x: 100, y: 0 },
    { x: 0, y: 0 },
  ]

  expect(reverse(shape)).toEqual(expectedShape)
})

test('`reverse` should maintain moveTo props in middle of points', () => {
  const shape = [
    { x: 0, y: 0, moveTo: true },
    { x: 100, y: 0 },
    { x: 100, y: 100, moveTo: true },
    { x: 0, y: 100 },
    { x: 0, y: 0 }
  ]

  const expectedShape = [
    { x: 0, y: 0, moveTo: true },
    { x: 0, y: 100 },
    { x: 100, y: 100 },
    { x: 100, y: 0, moveTo: true },
    { x: 0, y: 0 },
  ]

  expect(reverse(shape)).toEqual(expectedShape)
})
