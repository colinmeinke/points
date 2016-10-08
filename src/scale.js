import boundingBox from './boundingBox'
import { applyFuncToShapes } from './helpers'

const scalePoint = (point, scaleFactor, anchorX, anchorY) => {
  const p = { ...point }

  p.x = anchorX - ((anchorX - p.x) * scaleFactor)
  p.y = anchorY - ((anchorY - p.y) * scaleFactor)

  if (point.curve) {
    p.curve = { ...p.curve }

    if (p.curve.type === 'arc') {
      if (p.curve.rx) {
        p.curve.rx = p.curve.rx * scaleFactor
      }

      if (p.curve.ry) {
        p.curve.ry = p.curve.ry * scaleFactor
      }
    } else {
      p.curve.x1 = anchorX - ((anchorX - p.curve.x1) * scaleFactor)
      p.curve.y1 = anchorY - ((anchorY - p.curve.y1) * scaleFactor)

      if (p.curve.type === 'cubic') {
        p.curve.x2 = anchorX - ((anchorX - p.curve.x2) * scaleFactor)
        p.curve.y2 = anchorY - ((anchorY - p.curve.y2) * scaleFactor)
      }
    }
  }

  return p
}

const scale = (s, scaleFactor, anchor = 'center') => {
  const { bottom, center, left, right, top } = boundingBox(s)

  let anchorX = center.x
  let anchorY = center.y

  switch (anchor) {
    case 'topLeft':
      anchorX = left
      anchorY = top
      break
    case 'topRight':
      anchorX = right
      anchorY = top
      break
    case 'bottomRight':
      anchorX = right
      anchorY = bottom
      break
    case 'bottomLeft':
      anchorX = left
      anchorY = bottom
      break
  }

  return applyFuncToShapes(shape => shape.map(point => {
    return scalePoint(point, scaleFactor, anchorX, anchorY)
  }), s)
}

export default scale
