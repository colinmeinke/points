/* globals test expect */

import offset from '../src/offset'

test('`offset` should correctly handle missing offsets', () => {
  const shape = [
    { x: 0, y: 0, moveTo: true },
    { x: 50, y: 25 },
    { x: -10, y: -100 }
  ]

  expect(offset(shape)).toEqual(shape)
})

test('`offset` should add correct offset', () => {
  const shape = [
    { x: 0, y: 0, moveTo: true },
    { x: 50, y: 25 },
    { x: -10, y: -100 }
  ]

  const expectedShapes = [
    { x: 10, y: -5, moveTo: true },
    { x: 60, y: 20 },
    { x: 0, y: -105 }
  ]

  expect(offset(shape, 10, -5)).toEqual(expectedShapes)
})

test('`offset` should add correct offsets to arc curve', () => {
  const shape = [
    { x: 0, y: 0, moveTo: true },
    {
      x: 80,
      y: 35,
      curve: {
        type: 'arc',
        rx: 2,
        ry: 2,
        xAxisRotation: 45,
        sweepFlag: 1,
        largeArcFlag: 1
      }
    },
    { x: -10, y: -100 }
  ]

  const expectedShapes = [
    { x: 10, y: -5, moveTo: true },
    {
      x: 90,
      y: 30,
      curve: {
        type: 'arc',
        rx: 2,
        ry: 2,
        xAxisRotation: 45,
        sweepFlag: 1,
        largeArcFlag: 1
      }
    },
    { x: 0, y: -105 }
  ]

  expect(offset(shape, 10, -5)).toEqual(expectedShapes)
})

test('`offset` should add correct offsets to quadratic curve', () => {
  const shape = [
    { x: 0, y: 0, moveTo: true },
    {
      x: 100,
      y: 200,
      curve: {
        type: 'quadratic',
        x1: 50,
        y1: 200
      }
    },
    { x: -10, y: -100 }
  ]

  const expectedShapes = [
    { x: 10, y: -5, moveTo: true },
    {
      x: 110,
      y: 195,
      curve: {
        type: 'quadratic',
        x1: 60,
        y1: 195
      }
    },
    { x: 0, y: -105 }
  ]

  expect(offset(shape, 10, -5)).toEqual(expectedShapes)
})

test('`offset` should add correct offsets to cubic curve', () => {
  const shape = [
    { x: 0, y: 0, moveTo: true },
    {
      x: 5,
      y: 10,
      curve: {
        type: 'cubic',
        x1: 2,
        y1: 0,
        x2: 3,
        y2: 10
      }
    },
    { x: -10, y: -100 }
  ]

  const expectedShapes = [
    { x: 10, y: -5, moveTo: true },
    {
      x: 15,
      y: 5,
      curve: {
        type: 'cubic',
        x1: 12,
        y1: -5,
        x2: 13,
        y2: 5
      }
    },
    { x: 0, y: -105 }
  ]

  expect(offset(shape, 10, -5)).toEqual(expectedShapes)
})
