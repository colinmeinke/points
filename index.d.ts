declare module "points" {
  export type Move = {
    x: number;
    y: number;
  }

  export type AbsoluteMove = {
    x: number;
    y: number;
    moveTo: true;
  }

  export type Arc = {
    x: number;
    y: number;
    curve: {
      type: "arc";
      rx: number;
      ry: number;
      sweepFlag?:  1 | 0;
      largeArcFlag?: 1 | 0;
      xAxisRotation?: number;
    }
  }
  
  export type QuadraticBezier = {
    x: number;
    y: number;
    curve: {
      type: "quadratic";
      x1: number;
      y1: number;
    }
  }

  export type CubicBezier = {
    x: number,
    y: number,
    curve: {
      type: "cubic";
      x1: number;
      x2: number;
      y1: number;
      y2: number;
      rx?: number;
      ry?: number;
    }
  }

  export type Command = Move | AbsoluteMove | Arc | QuadraticBezier | CubicBezier;

  export type BoundingBox = {
    center: { x: number; y: number;	};
    top: number;
    left: number;
    right: number;
    bottom: number;
  }

  export type Shape = [AbsoluteMove, ...Command[]];

  export type Anchor = "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "center";

  export type Angle = {
    center: { x: number; y: number;	};
  }

  export type Position = {
    angle: number;
    x: number;
    y: number;
  }

  export function add(shape: Shape, pointsRequired: number): Shape;
  export function boundingBox(shape: Shape | Shape[]): BoundingBox;
  export function cubify(shape: Shape): Shape;
  export function length(shape: Shape, accuracy?: number): number;
  export function moveIndex(shape: Shape, offset: number): Shape;
  export function offset(shape: Shape, x: number, y: number): Shape;
  export function position(shape: Shape, interval: number, accuracy?: number): Position;
  export function remove(shape: Shape): Shape;
  export function reverse(shape: Shape): Shape;
  export function rotate(shape: Shape, angle: Angle): Shape;
  export function scale(shape: Shape, scaleFactor: number, anchor?: Anchor): Shape;
}