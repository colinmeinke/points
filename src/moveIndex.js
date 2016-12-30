const moveIndex = (shape, offset) => {
  const s = [ ...shape ]
  const k = s.length - 1
  const c = s[ 0 ]
  const l = s[ k ]
  const o = ((offset % k) + k) % k

  delete s[ 0 ].moveTo

  const nextShape = [
    { x: s[ o ].x, y: s[ o ].y, moveTo: true },
    ...s.splice(o + 1)
  ]

  if (c.x === l.x && c.y === l.y) {
    return [
      ...nextShape,
      ...s.splice(1, o)
    ]
  }

  return [
    ...nextShape,
    ...s.splice(o - 1, o)
  ]
}

export default moveIndex
