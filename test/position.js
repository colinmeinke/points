/* eslint-env mocha */

import expect from 'expect'

import position from '../src/position'

describe('position', () => {
  it('should calculate correct position on two point line', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 0, y: 100 }
    ]

    expect(position(shape, 0.5)).toInclude({ x: 0, y: 50 })
  })

  it('should calculate correct position on complex two point line', () => {
    const shape = [
      { x: 100, y: 10, moveTo: true },
      { x: -100, y: -90 }
    ]

    expect(position(shape, 0.25)).toInclude({ x: 50, y: -15 })
  })

  it('should calculate correct position on two point line with undeshoot', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 0, y: 100 }
    ]

    expect(position(shape, -0.25)).toInclude({ x: 0, y: -25 })
  })

  it('should calculate correct position on multi point line with undeshoot', () => {
    const shape = [
      { x: 50, y: -150, moveTo: true },
      { x: -50, y: -50 },
      { x: 50, y: 50 }
    ]

    const interval = -1.5
    const sideA = Math.sqrt(Math.pow(100, 2) + Math.pow(100, 2))
    const sideB = Math.sqrt(Math.pow(100, 2) + Math.pow(100, 2))
    const totalLength = sideA + sideB
    const undershoot = totalLength * Math.abs(interval)
    const ratio = undershoot / sideA + 1
    const x = -50 + (100 * ratio)
    const y = -50 + (-100 * ratio)

    expect(position(shape, interval)).toInclude({ x, y })
  })

  it('should calculate correct position on two point line with overshoot', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 0, y: 100 }
    ]

    expect(position(shape, 1.25)).toInclude({ x: 0, y: 125 })
  })

  it('should calculate correct position on multi point line with overshoot', () => {
    const shape = [
      { x: 50, y: -150, moveTo: true },
      { x: -50, y: -50 },
      { x: 50, y: 50 }
    ]

    const interval = 1.15
    const sideA = Math.sqrt(Math.pow(100, 2) + Math.pow(100, 2))
    const sideB = Math.sqrt(Math.pow(100, 2) + Math.pow(100, 2))
    const totalLength = sideA + sideB
    const overshoot = totalLength * interval - totalLength
    const ratio = overshoot / sideB + 1
    const x = -50 + (100 * ratio)
    const y = -50 + (100 * ratio)

    expect(position(shape, interval)).toInclude({ x, y })
  })

  it('should calculate correct position on square', () => {
    const shape = [
      { x: 50, y: 50, moveTo: true },
      { x: -50, y: 50 },
      { x: -50, y: -50 },
      { x: 50, y: -50 },
      { x: 50, y: 50 }
    ]

    expect(position(shape, 0.75)).toInclude({ x: 50, y: -50 })
  })

  it('should calculate correct position on circle', () => {
    const shape = [
      { x: 50, y: 30, moveTo: true },
      { x: 50, y: 70, curve: { type: 'arc', rx: 20, ry: 20 } },
      { x: 50, y: 30, curve: { type: 'arc', rx: 20, ry: 20 } }
    ]

    const { x, y } = position(shape, 0.25)
    const p = { x: Math.round(x), y: Math.round(y) }

    expect(p).toInclude({ x: 30, y: 50 })
  })

  it('should calculate correct position on line with mid-shape moveTo', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 0 },
      { x: 100, y: 20, moveTo: true },
      { x: 0, y: 20 }
    ]

    expect(position(shape, 0.75)).toInclude({ x: 50, y: 20 })
  })

  it('should calculate correct angle if b directly below a', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 0, y: 100 }
    ]

    const { angle } = position(shape, 0.5)

    expect(angle).toEqual(180)
  })

  it('should calculate correct angle if a directly below b', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 0, y: -100 }
    ]

    const { angle } = position(shape, 0.5)

    expect(angle).toEqual(0)
  })

  it('should calculate correct angle if b to right of a', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: 100, y: 100 }
    ]

    const { angle } = position(shape, 0.5)

    expect(Math.round(angle)).toEqual(135)
  })

  it('should calculate correct angle if a to right of b', () => {
    const shape = [
      { x: 0, y: 0, moveTo: true },
      { x: -100, y: 0 }
    ]

    const { angle } = position(shape, 0.5)

    expect(angle).toEqual(270)
  })
})
