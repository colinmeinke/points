/* eslint-env mocha */

import expect from 'expect'

import remove from '../src/remove'

describe('remove', () => {
  it('should remove midpoint', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 25, y: 0 },
      { x: 50, y: 0 }
    ]

    const expectedShapes = [
      { x: 0, y: 0, moveTo: true },
      { x: 50, y: 0 }
    ]

    expect(remove(shape)).toEqual(expectedShapes)
  })

  it('should remove multiple midpoints', () => {
    const shape = [
      { x: 1, y: 1, moveTo: true },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 4 }
    ]

    const expectedShapes = [
      { x: 1, y: 1, moveTo: true },
      { x: 4, y: 4 }
    ]

    expect(remove(shape)).toEqual(expectedShapes)
  })

  it('should not remove midpoint if curve', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 25, y: 0, curve: { type: 'arc', rx: 1, ry: 1 } },
      { x: 50, y: 0 }
    ]

    expect(remove(shape)).toEqual(shape)
  })

  it('should remove duplicate point', () => {
    const shape = [
      { x: 0, y: 10, moveTo: true },
      { x: 25, y: 0 },
      { x: 25, y: 0 },
      { x: 50, y: 50 }
    ]

    const expectedShapes = [
      { x: 0, y: 10, moveTo: true },
      { x: 25, y: 0 },
      { x: 50, y: 50 }
    ]

    expect(remove(shape)).toEqual(expectedShapes)
  })

  it('should remove multiple duplicate points', () => {
    const shape = [
      { x: 0, y: 10, moveTo: true },
      { x: 25, y: 0 },
      { x: 25, y: 0 },
      { x: 25, y: 0 },
      { x: 50, y: 50 }
    ]

    const expectedShapes = [
      { x: 0, y: 10, moveTo: true },
      { x: 25, y: 0 },
      { x: 50, y: 50 }
    ]

    expect(remove(shape)).toEqual(expectedShapes)
  })

  it('should not remove duplicate point if curve', () => {
    const shape = [
      { x: 0, y: 10, moveTo: true },
      { x: 25, y: 0 },
      { x: 25, y: 0, curve: { type: 'arc', rx: 1, ry: 1 } },
      { x: 50, y: 50 }
    ]

    expect(remove(shape)).toEqual(shape)
  })
})
