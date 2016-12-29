import cubify from './cubify'
import { applyFuncToShapes } from './helpers'

const reversePoints = shape => {
  let m
  let c

  return shape.reverse().map(({ x, y, moveTo, curve }, i) => {
    const point = { x, y }

    if (c) {
      const { x1: x2, y1: y2, x2: x1, y2: y1 } = c
      point.curve = { type: 'cubic', x1, y1, x2, y2 }
    }

    if (i === 0 || m) {
      point.moveTo = true
    }

    m = moveTo
    c = curve || null

    return point
  })
}

const reverse = s => applyFuncToShapes(reversePoints, cubify(s))

export default reverse
