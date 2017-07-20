import { distance, applyFuncToShapes } from './helpers'
import moveIndex from './moveIndex'
import boundingBox from './boundingBox'

const autoIndexPoints = (points, p) => {
  // As first minimal number, use native maximum safe integer for best result
  let min = Number.MAX_SAFE_INTEGER

  // Get points center
  let { center: bbox } = boundingBox(points)

  // Normalize to relatives it's center for better matching result
  bbox.x += p.x
  bbox.y += p.y

  let bestIndex = 0

  points.map((point, i) => {
    let dist = distance(bbox, point)
    if (dist < min) {
      bestIndex = i
      min = dist
    }
  })
  if (bestIndex) {
    points = moveIndex(points, bestIndex)
  }
  return points
}

const autoIndex = (points, p) => applyFuncToShapes(autoIndexPoints, points, p)

export default autoIndex
