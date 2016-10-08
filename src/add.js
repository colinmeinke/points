import cubify from './cubify'
import { numberAtInterval } from './helpers'

const basicPoints = (a, b) => [{
  x: numberAtInterval(a.x, b.x, 0.5),
  y: numberAtInterval(a.y, b.y, 0.5)
}, b]

const curvePoints = (a, b) => {
  const { x1, y1, x2, y2 } = b.curve

  const A = { x: a.x, y: a.y }
  const B = { x: x1, y: y1 }
  const C = { x: x2, y: y2 }
  const D = { x: b.x, y: b.y }
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

const points = (a, b) => b.curve ? curvePoints(a, b) : basicPoints(a, b)

const addPoints = (shape, pointsRequired) => {
  const s = [ ...shape ]

  for (let i = 1; i < s.length; i += 2) {
    if (s.length >= pointsRequired) {
      return s
    }

    const [ a, b ] = points(s[ i - 1 ], s[ i ])

    s.splice(i, 1, a, b)
  }

  return addPoints(s, pointsRequired)
}

const add = (shape, pointsRequired) => addPoints(cubify(shape), pointsRequired)

export { curvePoints }
export default add
