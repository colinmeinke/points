const angleFromSides = (a, b, c) => {
  const r = Math.acos(
    (Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) /
    (2 * a * b)
  )

  return r * (180 / Math.PI)
}

const applyFuncToShapes = (f, s, ...args) => {
  if (isShapeArray(s)) {
    return s.map(shape => f(shape, ...args))
  }

  return f(s, ...args)
}

const getShapeArray = s => isShapeArray(s) ? s : [ s ]

const linearLength = (x1, y1, x2, y2) => Math.sqrt(
  Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
)

const isShapeArray = s => Array.isArray(s[ 0 ])

const numberAtInterval = (a, b, interval) => {
  const c = a === b ? 0 : Math.abs(b - a)
  return c === 0 ? a : (a < b ? a + c * interval : a - c * interval)
}

export {
  angleFromSides,
  applyFuncToShapes,
  getShapeArray,
  linearLength,
  isShapeArray,
  numberAtInterval
}
