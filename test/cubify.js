/* globals test expect */

import cubify from '../src/cubify'

test('`cubify` should return same shape with cubic beziers instead of arcs', () => {
  const shape1 = [
    { x: 80, y: 80, moveTo: true },
    { x: 125, y: 125, curve: { type: 'arc', rx: 45, ry: 45 } },
    { x: 125, y: 80 },
    { x: 80, y: 80 }
  ]

  const expectedShape1 = [
    { x: 80, y: 80, moveTo: true },
    {
      x: 125,
      y: 125,
      curve: {
        type: 'cubic',
        x1: 80,
        y1: 104.8528137423857,
        x2: 100.14718625761431,
        y2: 125
      }
    },
    { x: 125, y: 80 },
    { x: 80, y: 80 }
  ]

  const shape2 = [
    { x: 230, y: 80, moveTo: true },
    { x: 275, y: 125, curve: { type: 'arc', rx: 45, ry: 45, largeArcFlag: 1 } },
    { x: 275, y: 80 },
    { x: 230, y: 80 }
  ]

  const expectedShape2 = [
    { x: 230, y: 80, moveTo: true },
    {
      x: 185,
      y: 125,
      curve: {
        type: 'cubic',
        x1: 205.1471862576143,
        y1: 80,
        x2: 185,
        y2: 100.1471862576143
      }
    },
    {
      x: 230,
      y: 170,
      curve: {
        type: 'cubic',
        x1: 185,
        y1: 149.8528137423857,
        x2: 205.1471862576143,
        y2: 170
      }
    },
    {
      x: 275,
      y: 125.00000000000001,
      curve: {
        type: 'cubic',
        x1: 254.8528137423857,
        y1: 170,
        x2: 275,
        y2: 149.8528137423857
      }
    },
    { x: 275, y: 80 },
    { x: 230, y: 80 }
  ]

  const shape3 = [
    { x: 80, y: 230, moveTo: true },
    { x: 125, y: 275, curve: { type: 'arc', rx: 45, ry: 45, sweepFlag: 1 } },
    { x: 125, y: 230 },
    { x: 80, y: 230 }
  ]

  const expectedShape3 = [
    { x: 80, y: 230, moveTo: true },
    {
      x: 125,
      y: 275,
      curve: {
        type: 'cubic',
        x1: 104.8528137423857,
        y1: 230,
        x2: 125,
        y2: 250.1471862576143
      }
    },
    { x: 125, y: 230 },
    { x: 80, y: 230 }
  ]

  const shape4 = [
    { x: 230, y: 230, moveTo: true },
    { x: 275, y: 275, curve: { type: 'arc', rx: 45, ry: 45, largeArcFlag: 1, sweepFlag: 1 } },
    { x: 275, y: 230 },
    { x: 230, y: 230 }
  ]

  const expectedShape4 = [
    { x: 230, y: 230, moveTo: true },
    {
      x: 275,
      y: 185,
      curve: {
        type: 'cubic',
        x1: 230,
        y1: 205.1471862576143,
        x2: 250.1471862576143,
        y2: 185
      }
    },
    {
      x: 320,
      y: 230,
      curve: {
        type: 'cubic',
        x1: 299.8528137423857,
        y1: 185,
        x2: 320,
        y2: 205.1471862576143
      }
    },
    {
      x: 275,
      y: 275,
      curve: {
        type: 'cubic',
        x1: 320,
        y1: 254.8528137423857,
        x2: 299.8528137423857,
        y2: 275
      }
    },
    { x: 275, y: 230 },
    { x: 230, y: 230 }
  ]

  expect(cubify(shape1)).toEqual(expectedShape1)
  expect(cubify(shape2)).toEqual(expectedShape2)
  expect(cubify(shape3)).toEqual(expectedShape3)
  expect(cubify(shape4)).toEqual(expectedShape4)
})
