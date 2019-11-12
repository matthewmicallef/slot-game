import { Sprite, Graphics } from 'pixi.js';
import { GAME_CONFIG } from '../../game-config';

export class ReelBackground extends Sprite {
  constructor(
    radius: number,
    colour: number
  ) {
    super(
      new Graphics()
        .beginFill(colour)
        .drawCircle(0, 0, radius)
        .endFill()
        .generateCanvasTexture()
    );

    this.anchor.set(0.5, 0.5);
    this.position.set(GAME_CONFIG.centerPoints.x, GAME_CONFIG.centerPoints.y);
  }
}
