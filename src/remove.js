import { applyFuncToShapes } from './helpers'

const isBetween = (a, b, c) => {
  if (b.curve || c.curve) {
    return false
  }

  const crossProduct =
    (c.y - a.y) *
    (b.x - a.x) -
    (c.x - a.x) *
    (b.y - a.y)

  if (Math.abs(crossProduct) > Number.EPSILON) {
    return false
  }

  const dotProduct =
    (c.x - a.x) *
    (b.x - a.x) +
    (c.y - a.y) *
    (b.y - a.y)

  if (dotProduct < 0) {
    return false
  }

  const squaredLengthBA =
    (b.x - a.x) *
    (b.x - a.x) +
    (b.y - a.y) *
    (b.y - a.y)

  if (dotProduct > squaredLengthBA) {
    return false
  }

  return true
}

const removePoints = shape => {
  const s = []

  for (let i = 0, l = shape.length; i < l; i++) {
    const a = s[ s.length - 1 ]
    const b = shape[ i + 1 ]
    const c = shape[ i ]

    if (!(a && b && c) || !(isBetween(a, b, c))) {
      s.push(c)
    }
  }

  return s
}

const remove = s => applyFuncToShapes(removePoints, s)

export default remove
