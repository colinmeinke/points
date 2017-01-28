import cubify from './cubify'
import { numberAtInterval } from './helpers'

const linearPoints = (from, to) => [
  {
    x: numberAtInterval(from.x, to.x, 0.5),
    y: numberAtInterval(from.y, to.y, 0.5)
  },
  to
]

const curvedPoints = (from, to) => {
  const { x1, y1, x2, y2 } = to.curve

  const A = { x: from.x, y: from.y }
  const B = { x: x1, y: y1 }
  const C = { x: x2, y: y2 }
  const D = { x: to.x, y: to.y }
  const E = { x: numberAtInterval(A.x, B.x, 0.5), y: numberAtInterval(A.y, B.y, 0.5) }
  const F = { x: numberAtInterval(B.x, C.x, 0.5), y: numberAtInterval(B.y, C.y, 0.5) }
  const G = { x: numberAtInterval(C.x, D.x, 0.5), y: numberAtInterval(C.y, D.y, 0.5) }
  const H = { x: numberAtInterval(E.x, F.x, 0.5), y: numberAtInterval(E.y, F.y, 0.5) }
  const J = { x: numberAtInterval(F.x, G.x, 0.5), y: numberAtInterval(F.y, G.y, 0.5) }
  const K = { x: numberAtInterval(H.x, J.x, 0.5), y: numberAtInterval(H.y, J.y, 0.5) }

  return [
    { x: K.x, y: K.y, curve: { type: 'cubic', x1: E.x, y1: E.y, x2: H.x, y2: H.y } },
    { x: D.x, y: D.y, curve: { type: 'cubic', x1: J.x, y1: J.y, x2: G.x, y2: G.y } }
  ]
}

const points = (from, to) => to.curve
  ? curvedPoints(from, to)
  : linearPoints(from, to)

const addPoints = (shape, pointsRequired) => {
  if (isNaN(pointsRequired)) {
    throw Error('`add` function must be passed a number as the second argument')
  }

  const nextShape = [ ...shape ]

  for (let i = 1; i < nextShape.length;) {
    if (nextShape.length >= pointsRequired) {
      return nextShape
    }

    const to = nextShape[ i ]

    if (to.moveTo) {
      i++
    } else {
      const from = nextShape[ i - 1 ]
      const [ midPoint, replacementPoint ] = points(from, to)

      nextShape.splice(i, 1, midPoint, replacementPoint)

      i += 2
    }
  }

  return addPoints(nextShape, pointsRequired)
}

const add = (shape, pointsRequired) => addPoints(cubify(shape), pointsRequired)

export { curvedPoints }
export default add
