import decurve from './decurve'
import length, { linearLength } from './length'
import { angleFromSides, numberAtInterval } from './helpers'

const angle = (x1, y1, x2, y2, a) => {
  if (x1 === x2) {
    return y1 >= y2 ? 0 : 180
  }

  const b = 100
  const c = linearLength(x2, y2, x1, y1 - b)
  const ang = angleFromSides(a, b, c)

  return x1 < x2 ? ang : 360 - ang
}

const over = (shape, length, totalLength, desiredLength) => {
  const { x: x1, y: y1 } = shape[ length - 2 ]
  const { x: x2, y: y2 } = shape[ length - 1 ]
  const segmentLength = linearLength(x1, y1, x2, y2)
  const segmentInterval = (desiredLength - totalLength) / segmentLength + 1
  return { x1, y1, x2, y2, segmentInterval, segmentLength }
}

const position = (shape, interval, accuracy) => {
  const s = decurve(shape, accuracy)
  const l = s.length
  const t = length(s)
  const d = t * interval

  const { x1, y1, x2, y2, segmentInterval, segmentLength } =
    interval > 1 ? over(s, l, t, d)
      : (interval < 0 ? under(s, d) : within(s, l, d))

  return {
    angle: angle(x1, y1, x2, y2, segmentLength),
    x: numberAtInterval(x1, x2, segmentInterval),
    y: numberAtInterval(y1, y2, segmentInterval)
  }
}

const under = (shape, desiredLength) => {
  const { x: x1, y: y1 } = shape[ 0 ]
  const { x: x2, y: y2 } = shape[ 1 ]
  const segmentLength = linearLength(x1, y1, x2, y2)
  const segmentInterval = desiredLength / segmentLength
  return { x1, y1, x2, y2, segmentInterval, segmentLength }
}

const within = (shape, length, desiredLength) => {
  let currentLength = 0

  for (let i = 0; i < length; i++) {
    const { moveTo } = shape[ i ]

    if (!moveTo) {
      const { x: x1, y: y1 } = shape[ i - 1 ]
      const { x: x2, y: y2 } = shape[ i ]

      const segmentLength = linearLength(x1, y1, x2, y2)

      if (currentLength + segmentLength >= desiredLength) {
        const segmentInterval = (desiredLength - currentLength) / segmentLength
        return { x1, y1, x2, y2, segmentInterval, segmentLength }
      }

      currentLength += segmentLength
    }
  }
}

export default position
