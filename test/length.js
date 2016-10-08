/* eslint-env mocha */

import expect from 'expect'

import length from '../src/length'

describe('length', () => {
  it('should calculate correct length of square', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 0 }
    ]

    expect(length(shape)).toEqual(400)
  })

  it('should calculate correct length of reversed square', () => {
    const shape = [
      { x: 100, y: 100, moveTo: true },
      { x: 100, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 100 },
      { x: 100, y: 100 }
    ]

    expect(length(shape)).toEqual(400)
  })

  it('should calculate correct length of rectangle', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 50 },
      { x: 0, y: 50 },
      { x: 0, y: 0 }
    ]

    expect(length(shape)).toEqual(300)
  })

  it('should calculate correct length of right angle triangle', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 50 },
      { x: 0, y: 0 }
    ]

    const expectedLength =
      Math.sqrt(Math.pow(100, 2) + Math.pow(50, 2)) + 100 + 50

    expect(length(shape)).toEqual(expectedLength)
  })

  it('should calculate correct length of non right angle triangle', () => {
    const shape = [
      { x: 100, y: 100, moveTo: true },
      { x: 127, y: 65 },
      { x: 89, y: 72 },
      { x: 100, y: 100 }
    ]

    const expectedLength =
      Math.sqrt(Math.pow(27, 2) + Math.pow(35, 2)) +
      Math.sqrt(Math.pow(38, 2) + Math.pow(7, 2)) +
      Math.sqrt(Math.pow(11, 2) + Math.pow(28, 2))

    expect(length(shape)).toEqual(expectedLength)
  })

  it('should calculate correct length of two point line', () => {
    const shape = [
      { x: 20, y: 90, moveTo: true },
      { x: 1, y: 2862 }
    ]

    const expectedLength =
      Math.sqrt(Math.pow(19, 2) + Math.pow(2772, 2))

    expect(length(shape)).toEqual(expectedLength)
  })

  it('should calculate correct length of line with mid-shape moveTo', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 20, moveTo: true },
      { x: 0, y: 20 }
    ]

    expect(length(shape)).toEqual(200)
  })

  it('should calculate correct length of circle', () => {
    const shape = [
      { x: 50, y: 30, moveTo: true },
      { x: 50, y: 70, curve: { type: 'arc', rx: 20, ry: 20 } },
      { x: 50, y: 30, curve: { type: 'arc', rx: 20, ry: 20 } }
    ]

    const expectedLength = Math.round(40 * Math.PI)
    const shapeLength = Math.round(length(shape))

    expect(shapeLength).toEqual(expectedLength)
  })

  it('should calculate correct length of ellipse', () => {
    const shape = [
      { x: 50, y: 0, moveTo: true },
      { x: 50, y: 40, curve: { type: 'arc', rx: 3, ry: 20 } },
      { x: 50, y: 0, curve: { type: 'arc', rx: 3, ry: 20 } }
    ]

    const expectedLength = Math.round(82.5294189453125)
    const shapeLength = Math.round(length(shape))

    expect(shapeLength).toEqual(expectedLength)
  })

  it('should calculate correct length of abstract curved shape', () => {
    const shape = [
      { x: 213, y: 222, moveTo: true },
      { x: 130, y: 183, curve: { type: 'cubic', x1: 219, y1: 150, x2: 165, y2: 139 } },
      { x: 247, y: 51.6, curve: { type: 'cubic', x1: 125, y1: 123, x2: 171, y2: 73.8 } },
      { x: 280, y: 102, curve: { type: 'cubic', x1: 205, y1: 78, x2: 236, y2: 108 } },
      { x: 286, y: 68.2, curve: { type: 'cubic', x1: 281, y1: 90.3, x2: 282, y2: 79 } },
      { x: 289, y: 79.7, curve: { type: 'cubic', x1: 287, y1: 72, x2: 288, y2: 75.8 } },
      { x: 300, y: 79.7, curve: { type: 'cubic', x1: 293, y1: 79.7, x2: 296, y2: 79.7 } },
      { x: 311, y: 79.7, curve: { type: 'cubic', x1: 304, y1: 79.7, x2: 307, y2: 79.7 } },
      { x: 314, y: 68.2, curve: { type: 'cubic', x1: 312, y1: 75.8, x2: 313, y2: 72 } },
      { x: 320, y: 102, curve: { type: 'cubic', x1: 318, y1: 79, x2: 319, y2: 90.3 } },
      { x: 353, y: 51.6, curve: { type: 'cubic', x1: 364, y1: 108, x2: 395, y2: 78 } },
      { x: 470, y: 183, curve: { type: 'cubic', x1: 429, y1: 73.8, x2: 475, y2: 123 } },
      { x: 387, y: 222, curve: { type: 'cubic', x1: 435, y1: 139, x2: 381, y2: 150 } },
      { x: 300, y: 248, curve: { type: 'cubic', x1: 364, y1: 176, x2: 315, y2: 172 } },
      { x: 213, y: 222, curve: { type: 'cubic', x1: 285, y1: 172, x2: 236, y2: 176 } },
      { x: 213, y: 222 }
    ]

    const expectedLength = Math.round(1245.733642578125)
    const shapeLength = Math.round(length(shape))

    expect(shapeLength).toEqual(expectedLength)
  })
})
