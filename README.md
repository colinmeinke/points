# Points

A specification for storing shape data in Javascript. Includes
functions for adding, removing, reordering, converting and
manipulating points.

**3kb gzipped. No dependencies.**

## Example shape

```js
const shape = [
  { x: 50, y: 30 },
  { x: 50, y: 70, curve: { type: 'arc', rx: 20, ry: 20 }},
  { x: 50, y: 30, curve: { type: 'arc', rx: 20, ry: 20 }},
];
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

## Installation

```
npm install points
```

## Usage

### add

```js
import { add } from 'points';
const newShape = add( shape, 25 );
```

Takes an existing shape array as the first argument, and the
total number of desired points as the second argument. Adds
points without changing the shape and returns a new shape
array.

### boundingBox

```js
import { boundingBox } from 'points';
const { top, right, bottom, left, center } = boundingBox( shape );
```

Takes an existing shape array, or an array of shape arrays,
as the only argument and returns an object of bounding
coordinates including a `center` property containing the
`x`, `y` values.

### cubify

```js
import { cubify } from 'points';
const newShape = cubify( shape );
```

Takes an existing shape array as the only argument, and
converts any arc or quadratic bezier points to cubic bezier
points. Returns a new shape array.

### moveIndex

```js
import { moveIndex } from 'points';
const newShape = moveIndex( shape, 3 );
```

Takes an existing shape array as the first argument, and the
desired number of points to shift the index as the second
argument (this can be a negative integer too). Returns a new
shape array.

### offset

```js
import { offset } from 'points';
const newShape = offset( shape, 10, 20 );
```

Takes an existing shape array as the first argument, the
horizontal offset as the second argument, and the vertical
offset as the third argument. Returns a new shape array.

### remove

```js
import { remove } from 'points';
const newShape = remove( shape );
```

Takes an existing shape array as the only argument, and
removes any points that do not affect the shape. Returns a
new shape array.

### reverse

```js
import { reverse } from 'points';
const newShape = reverse( shape );
```

Takes an existing shape array as the only argument, and
reverses the order of the points. Returns a new shape array.

### scale

```js
import { scale } from 'points';
const newShape = scale( shape, 0.5, 'topLeft' );
```

Takes an existing shape array, or an array of shape arrays,
as the first argument. Takes the scale factor as the second
argument and an anchor point as the third argument.

The anchor point can take any of the following strings:

- center (default)
- topLeft
- topRight
- bottomRight
- bottomLeft

Returns a new shape array or an array of shape arrays,
depending on input.

## CommonJS

This is how you get to the good stuff if you're using
`require`.

```js
const Points = require( 'points' );
const add = Points.add;
const boundingBox = Points.boundingBox;
const cubify = Points.cubify;
const moveIndex = Points.moveIndex;
const offset = Points.offset;
const remove = Points.remove;
const reverse = Points.reverse;
const scale = Points.scale;
```

## UMD

And if you just want to smash in a Javascript file you're
also covered. Drop this in place ...

[https://npmcdn.com/points@1.3.1/dist/points.min.js](https://npmcdn.com/points@1.3.1/dist/points.min.js)

Then access it on the `Points` global variable.

```js
const add = Points.add;
const boundingBox = Points.boundingBox;
const cubify = Points.cubify;
const moveIndex = Points.moveIndex;
const offset = Points.offset;
const remove = Points.remove;
const reverse = Points.reverse;
const scale = Points.scale;
```

## Help make this better

[Issues](https://github.com/colinmeinke/points/issues/new)
and pull requests gratefully received!

I'm also on twitter [@colinmeinke](https://twitter.com/colinmeinke).

Thanks :star2:

## License

[ISC](./LICENSE.md).
