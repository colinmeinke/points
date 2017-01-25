import { angleFromSides } from './helpers'
import cubify from './cubify'
import { curvedPoints } from './add'
import { linearLength } from './length'

const angle = triangle => {
  const [ ax, ay ] = triangle[ 0 ]
  const [ bx, by ] = triangle[ 1 ]
  const [ cx, cy ] = triangle[ 2 ]

  const a = linearLength(ax, ay, bx, by)
  const b = linearLength(bx, by, cx, cy)
  const c = linearLength(cx, cy, ax, ay)

  return angleFromSides(a, b, c)
}

const curved = shape => shape.reduce((c, { curve }) => curve ? true : c, false)

const decurve = (shape, accuracy = 1) => {
  if (!curved(shape)) {
    return shape
  }

  const s = cubify(shape)
  const d = []

  s.map((point, i) => {
    if (point.curve) {
      const prevPoint = s[ i - 1 ]
      straighten(prevPoint, point, accuracy)
        .map(p => d.push(p))
    } else {
      d.push(point)
    }
  })

  return d
}

const straight = (x1, y1, cx1, cy1, x2, y2, cx2, cy2, accuracy) => {
  const t1 = [[ cx1, cy1 ], [ x2, y2 ], [ x1, y1 ]]
  const t2 = [[ cx2, cy2 ], [ x1, y1 ], [ x2, y2 ]]
  return angle(t1) < accuracy && angle(t2) < accuracy
}

const straighten = (prevPoint, point, accuracy) => {
  const { x: x1, y: y1 } = prevPoint
  const { x: x2, y: y2, curve } = point
  const { x1: cx1, y1: cy1, x2: cx2, y2: cy2 } = curve

  if (straight(x1, y1, cx1, cy1, x2, y2, cx2, cy2, accuracy)) {
    return [ point ]
  }

  const [ midPoint, lastPoint ] = curvedPoints(prevPoint, point)

  return [
    ...straighten(prevPoint, midPoint, accuracy),
    ...straighten(midPoint, lastPoint, accuracy)
  ]
}

export default decurve
