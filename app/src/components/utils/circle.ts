import { Graphics } from 'pixi.js';

export class Circle extends Graphics {
  constructor(radius, colour) {
    super();
    this.beginFill(colour);
    this.drawCircle(0, 0, radius);
    this.endFill();
  }
}
