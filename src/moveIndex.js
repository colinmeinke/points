const countLinePoints = lines => lines.reduce((count, points) => (
  count + countPoints(points)
), 0)

const countPoints = points => points.length - (isJoined(points) ? 1 : 0)

const isJoined = points => {
  const firstPoint = points[ 0 ]
  const lastPoint = points[ points.length - 1 ]
  return firstPoint.x === lastPoint.x && firstPoint.y === lastPoint.y
}

const joinLines = lines => lines.reduce((shape, line) => (
  [ ...shape, ...line ]
), [])

const moveIndex = (shape, offset) => {
  const lines = splitLines(shape)
  const count = countLinePoints(lines)
  const normalisedOffset = ((offset % count) + count) % count

  if (!normalisedOffset) {
    return shape
  }

  const { lineIndex, pointIndex } = nextIndex(lines, normalisedOffset)
  const reorderedLines = reorderLines(lines, lineIndex)
  const firstLine = reorderPoints(reorderedLines[ 0 ], pointIndex)
  const restOfLines = [ ...reorderedLines ].splice(1)

  return joinLines([ firstLine, ...restOfLines ])
}

const nextIndex = (lines, offset) => {
  for (let i = 0, l = lines.length; i < l; i++) {
    const count = countPoints(lines[ i ])

    if (offset <= count - 1) {
      return {
        lineIndex: i,
        pointIndex: offset
      }
    }

    offset -= count
  }
}

const reorderLines = (lines, offset) => [ ...lines ]
  .splice(offset)
  .concat([ ...lines ].splice(0, offset))

const reorderPoints = (points, offset) => {
  if (!offset) {
    return points
  }

  const nextPoints = [
    { x: points[ offset ].x, y: points[ offset ].y, moveTo: true },
    ...[ ...points ].splice(offset + 1)
  ]

  if (isJoined(points)) {
    return [
      ...nextPoints,
      ...[ ...points ].splice(1, offset)
    ]
  }

  return [
    ...nextPoints,
    ...[ ...points ].splice(0, offset + 1)
  ]
}

const splitLines = shape => shape.reduce((lines, point) => {
  if (point.moveTo) {
    lines.push([])
  }

  lines[ lines.length - 1 ].push(point)

  return lines
}, [])

export default moveIndex
