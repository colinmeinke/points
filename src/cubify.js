import arcToBezier from './arcToBezier'
import { applyFuncToShapes } from './helpers'

const cubifyShape = shape => {
  const s = []

  for (let i = 0, l = shape.length; i < l; i++) {
    const point = shape[ i ]

    if (point.curve && point.curve.type !== 'cubic') {
      const { x: px, y: py } = shape[ i - 1 ]
      const { x: cx, y: cy } = point

      if (point.curve.type === 'arc') {
        const curves = arcToBezier({
          px,
          py,
          cx,
          cy,
          rx: point.curve.rx,
          ry: point.curve.ry,
          xAxisRotation: point.curve.xAxisRotation,
          largeArcFlag: point.curve.largeArcFlag,
          sweepFlag: point.curve.sweepFlag
        })

        curves.forEach(({ x1, y1, x2, y2, x, y }) => {
          s.push({ x, y, curve: { type: 'cubic', x1, y1, x2, y2 } })
        })
      } else if (point.curve.type === 'quadratic') {
        const x1 = px + (2 / 3 * (point.curve.x1 - px))
        const y1 = py + (2 / 3 * (point.curve.y1 - py))
        const x2 = cx + (2 / 3 * (point.curve.x1 - cx))
        const y2 = cy + (2 / 3 * (point.curve.y1 - cy))

        s.push({ x: cx, y: cy, curve: { type: 'cubic', x1, y1, x2, y2 } })
      }
    } else {
      s.push(point)
    }
  }

  return s
}

const cubify = s => applyFuncToShapes(cubifyShape, s)

export default cubify
