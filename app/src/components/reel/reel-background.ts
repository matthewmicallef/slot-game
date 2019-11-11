import { Sprite } from 'pixi.js';
import { Circle } from '../components/utils/circle';
import { GAME_CONFIG } from '../game-config';

export class ReelBackground extends Sprite {
  constructor(radius, colour) {
    super(new Circle(radius, colour).generateCanvasTexture());

    this.anchor.set(0.5, 0.5);
    this.position.set(GAME_CONFIG.centerPoints.x, GAME_CONFIG.centerPoints.y);
  }
}
