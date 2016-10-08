import { applyFuncToShapes } from './helpers'

const offsetPoints = (shape, x, y) => shape.map(point => {
  const p = { ...point }

  p.x += x
  p.y += y

  if (p.curve) {
    p.curve = { ...p.curve }

    if (p.curve.type === 'quadratic' || p.curve.type === 'cubic') {
      p.curve.x1 += x
      p.curve.y1 += y
    }

    if (p.curve.type === 'cubic') {
      p.curve.x2 += x
      p.curve.y2 += y
    }
  }

  return p
})

const offset = (s, x = 0, y = 0) => applyFuncToShapes(offsetPoints, s, x, y)

export default offset
