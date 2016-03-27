# Points

A specification for storing shape data in Javascript. Includes
functions for adding, removing, reordering and converting
points.

**2kb gzipped. No dependencies.**

## Example shape

```js
const shape = [
  { x: 50, y: 30 },
  { x: 50, y: 70, curve: { type: 'arc', rx: 20, ry: 20 }},
  { x: 50, y: 30, curve: { type: 'arc', rx: 20, ry: 20 }},
]
```

## Specification

A shape is an array of 2 or more point objects.

### Point types

Each point is somewhere on an `x`, `y` plane. Therefore, at
the very least each point object requires `x` and `y`
properties. Values should be numeric.

#### Basic

```js
{ x: 10, y: 25 }
```

#### Arc

```js
{ x: 80, y: 35, curve: {
  type: 'arc',
  rx: 2,
  ry: 2,
  xAxisRotation: 45,
  sweepFlag: 1,
  largeArcFlag: 1,
}}
```

The curve properties `xAxisRotation`, `sweepFlag` and
`largeArcFlag` are all optional and if missing are assumed to
be `0`.

#### Quadratic bezier

```js
{ x: 100, y: 200, curve: {
  type: 'quadratic',
  x1: 50,
  y1: 200,
}}
```

#### Cubic bezier

```js
{ x: 5, y: 10, curve: {
  type: 'cubic',
  x1: 2,
  y1: 0,
  x2: 3,
  y2: 10,
}}
```

## Point manipulation

### add

```js
const newShape = add( shape, 25 )
```

Takes an existing shape array as the first argument, and the
total number of desired points as the second argument. Adds
points without changing the shape and returns a new shape
array.

### remove

```js
const newShape = remove( shape )
```

Takes an existing shape array as the only argument, and
removes any points that do not affect the shape. Returns a
new shape array.

### cubify

```js
const newShape = cubify( shape )
```

Takes an existing shape array as the only argument, and
converts any arc or quadratic bezier points to cubic bezier
points. Returns a new shape array.

### reverse

**Coming soon**.

```js
const newShape = reverse( shape )
```

Takes an existing shape array as the only argument, and
reverses the order of the points. Returns a new shape array.

### moveIndex

**Coming soon**.

```js
const newShape = moveIndex( shape, 3 )
```

Takes an existing shape array as the first argument, and the
desired number of points to shift the index as the second
argument (this can be a negative integer too). Returns a new
shape array.
