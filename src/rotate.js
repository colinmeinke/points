import { applyFuncToShapes } from './helpers'
import boundingBox from './boundingBox'

const rotatePoint = (x, y, c, s, about) => {
  const { x: offsetX, y: offsetY } = about
  const relativeX = x - offsetX
  const relativeY = y - offsetY

  return [
    (relativeX * c - relativeY * s) + offsetX,
    (relativeX * s + relativeY * c) + offsetY
  ]
}

const rotatePoints = (shape, angle, about) => shape.map(point => {
  const r = angle * Math.PI / 180
  const c = Math.cos(r)
  const s = Math.sin(r)
  const [ x, y ] = rotatePoint(point.x, point.y, c, s, about)
  const p = { ...point, x, y }

  if (p.curve) {
    if (p.curve.type === 'quadratic' || p.curve.type === 'cubic') {
      const [ x1, y1 ] = rotatePoint(p.curve.x1, p.curve.y1, c, s, about)
      p.curve = { ...p.curve, x1, y1 }
    }

    if (p.curve.type === 'cubic') {
      const [ x2, y2 ] = rotatePoint(p.curve.x2, p.curve.y2, c, s, about)
      p.curve = { ...p.curve, x2, y2 }
    }
  }

  return p
})

const rotate = (s, angle) => {
  const { center: about } = boundingBox(s)
  return applyFuncToShapes(rotatePoints, s, angle, about)
}

export default rotate
