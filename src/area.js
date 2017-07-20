import { applyFuncToShapes } from './helpers'

const areaPoints = polygon => {
  return polygon.reduce((area, {x, y}, i) => {
    const {x: x1, y: y1} = i === 0 ? polygon[polygon.length - 1] : polygon[i - 1]
    area += ((x1 + x) * (y1 - y)) / 2
    return area
  }, 0)
}

const area = polygon => applyFuncToShapes(areaPoints, polygon)

export default area
