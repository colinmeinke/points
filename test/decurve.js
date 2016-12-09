/* globals test expect */

import decurve from '../src/decurve'

test('`decurve` should return same shape when shape has no curves', () => {
  const shape = [
    { x: 525.667, y: 321.333, moveTo: true },
    { x: 462.8335, y: 321.333 },
    { x: 400, y: 321.333 },
    { x: 274.333, y: 321.333 },
    { x: 274.333, y: 200 },
    { x: 274.333, y: 78.667 },
    { x: 399.9995, y: 78.667 },
    { x: 525.666, y: 78.667 },
    { x: 525.666, y: 200 },
    { x: 525.666, y: 321.333 },
    { x: 525.6665, y: 321.333 },
    { x: 525.667, y: 321.333 }
  ]

  expect(decurve(shape, 1)).toEqual(shape)
})
