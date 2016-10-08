// I extracted this from the a2c function from
// SVG path – https://github.com/fontello/svgpath
//
// All credit goes to:
//
// Sergey Batishchev – https://github.com/snb2013
// Vitaly Puzrin – https://github.com/puzrin
// Alex Kocharin – https://github.com/rlidwka

const TAU = Math.PI * 2

const mapToEllipse = ({ x, y }, rx, ry, cosphi, sinphi, centerx, centery) => {
  x *= rx
  y *= ry

  const xp = cosphi * x - sinphi * y
  const yp = sinphi * x + cosphi * y

  return {
    x: xp + centerx,
    y: yp + centery
  }
}

const approxUnitArc = (ang1, ang2) => {
  const a = 4 / 3 * Math.tan(ang2 / 4)

  const x1 = Math.cos(ang1)
  const y1 = Math.sin(ang1)
  const x2 = Math.cos(ang1 + ang2)
  const y2 = Math.sin(ang1 + ang2)

  return [
    {
      x: x1 - y1 * a,
      y: y1 + x1 * a
    },
    {
      x: x2 + y2 * a,
      y: y2 - x2 * a
    },
    {
      x: x2,
      y: y2
    }
  ]
}

const vectorAngle = (ux, uy, vx, vy) => {
  const sign = (ux * vy - uy * vx < 0) ? -1 : 1
  const umag = Math.sqrt(ux * ux + uy * uy)
  const vmag = Math.sqrt(ux * ux + uy * uy)
  const dot = ux * vx + uy * vy

  let div = dot / (umag * vmag)

  if (div > 1) {
    div = 1
  }

  if (div < -1) {
    div = -1
  }

  return sign * Math.acos(div)
}

const getArcCenter = (
  px,
  py,
  cx,
  cy,
  rx,
  ry,
  largeArcFlag,
  sweepFlag,
  sinphi,
  cosphi,
  pxp,
  pyp
) => {
  const rxsq = Math.pow(rx, 2)
  const rysq = Math.pow(ry, 2)
  const pxpsq = Math.pow(pxp, 2)
  const pypsq = Math.pow(pyp, 2)

  let radicant = (rxsq * rysq) - (rxsq * pypsq) - (rysq * pxpsq)

  if (radicant < 0) {
    radicant = 0
  }

  radicant /= (rxsq * pypsq) + (rysq * pxpsq)
  radicant = Math.sqrt(radicant) * (largeArcFlag === sweepFlag ? -1 : 1)

  const centerxp = radicant * rx / ry * pyp
  const centeryp = radicant * -ry / rx * pxp

  const centerx = cosphi * centerxp - sinphi * centeryp + (px + cx) / 2
  const centery = sinphi * centerxp + cosphi * centeryp + (py + cy) / 2

  const vx1 = (pxp - centerxp) / rx
  const vy1 = (pyp - centeryp) / ry
  const vx2 = (-pxp - centerxp) / rx
  const vy2 = (-pyp - centeryp) / ry

  let ang1 = vectorAngle(1, 0, vx1, vy1)
  let ang2 = vectorAngle(vx1, vy1, vx2, vy2)

  if (sweepFlag === 0 && ang2 > 0) {
    ang2 -= TAU
  }

  if (sweepFlag === 1 && ang2 < 0) {
    ang2 += TAU
  }

  return [ centerx, centery, ang1, ang2 ]
}

const arcToBezier = ({
  px,
  py,
  cx,
  cy,
  rx,
  ry,
  xAxisRotation = 0,
  largeArcFlag = 0,
  sweepFlag = 0
}) => {
  const curves = []

  if (rx === 0 || ry === 0) {
    return []
  }

  const sinphi = Math.sin(xAxisRotation * TAU / 360)
  const cosphi = Math.cos(xAxisRotation * TAU / 360)

  const pxp = cosphi * (px - cx) / 2 + sinphi * (py - cy) / 2
  const pyp = -sinphi * (px - cx) / 2 + cosphi * (py - cy) / 2

  if (pxp === 0 && pyp === 0) {
    return []
  }

  rx = Math.abs(rx)
  ry = Math.abs(ry)

  const lambda =
    Math.pow(pxp, 2) / Math.pow(rx, 2) +
    Math.pow(pyp, 2) / Math.pow(ry, 2)

  if (lambda > 1) {
    rx *= Math.sqrt(lambda)
    ry *= Math.sqrt(lambda)
  }

  let [ centerx, centery, ang1, ang2 ] = getArcCenter(
    px,
    py,
    cx,
    cy,
    rx,
    ry,
    largeArcFlag,
    sweepFlag,
    sinphi,
    cosphi,
    pxp,
    pyp
  )

  const segments = Math.max(Math.ceil(Math.abs(ang2) / (TAU / 4)), 1)

  ang2 /= segments

  for (let i = 0; i < segments; i++) {
    curves.push(approxUnitArc(ang1, ang2))
    ang1 += ang2
  }

  return curves.map(curve => {
    const { x: x1, y: y1 } = mapToEllipse(curve[ 0 ], rx, ry, cosphi, sinphi, centerx, centery)
    const { x: x2, y: y2 } = mapToEllipse(curve[ 1 ], rx, ry, cosphi, sinphi, centerx, centery)
    const { x, y } = mapToEllipse(curve[ 2 ], rx, ry, cosphi, sinphi, centerx, centery)

    return { x1, y1, x2, y2, x, y }
  })
}

export default arcToBezier
