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

const isShapeArray = s => Array.isArray(s[ 0 ])

const numberAtInterval = (a, b, interval) => {
  const c = a === b ? 0 : Math.abs(b - a)
  return c === 0 ? a : (a < b ? a + c * interval : a - c * interval)
}

export {
  angleFromSides,
  applyFuncToShapes,
  getShapeArray,
  isShapeArray,
  numberAtInterval
}
