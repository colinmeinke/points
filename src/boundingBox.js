import decurve from './decurve'
import { getShapeArray } from './helpers'

const boundingBox = s => {
  let bottom
  let left
  let right
  let top

  const shapes = getShapeArray(s)

  shapes.map(shape => decurve(shape).map(({ x, y }) => {
    if (typeof bottom !== 'number' || y > bottom) {
      bottom = y
    }

    if (typeof left !== 'number' || x < left) {
      left = x
    }

    if (typeof right !== 'number' || x > right) {
      right = x
    }

    if (typeof top !== 'number' || y < top) {
      top = y
    }
  }))

  return {
    bottom,
    center: {
      x: left + ((right - left) / 2),
      y: top + ((bottom - top) / 2)
    },
    left,
    right,
    top
  }
}

export default boundingBox
