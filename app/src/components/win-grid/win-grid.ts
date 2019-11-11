import { Sprite, Graphics } from 'pixi.js';
import { GAME_CONFIG } from '../../game-config';

export class WinGrid extends Sprite {
  constructor() {
    let winGridGraphic = new Graphics();
    winGridGraphic.lineStyle(
      GAME_CONFIG.winGrid.lineSize,
      GAME_CONFIG.winGrid.colour,
    );

    winGridGraphic.drawRect(
      0,
      0,
      GAME_CONFIG.winGrid.width,
      GAME_CONFIG.winGrid.height,
    );

    let columnx = GAME_CONFIG.reel.width;
    winGridGraphic.moveTo(columnx, 0);
    winGridGraphic.lineTo(columnx, GAME_CONFIG.winGrid.height);
    columnx += GAME_CONFIG.reel.width;
    // for (let column = 1; column < GAME_CONFIG.reels.length; column += 1) {
    //   winGridGraphic.moveTo(columnx, 0);
    //   winGridGraphic.lineTo(columnx, GAME_CONFIG.winGrid.height);
    //   columnx += GAME_CONFIG.reelWidth;
    // }

    let columny = GAME_CONFIG.reel.width;
    winGridGraphic.moveTo(0, columny);
    winGridGraphic.lineTo(GAME_CONFIG.winGrid.width, columny);
    columny += GAME_CONFIG.reel.width;
    // for (let rows = 1; rows < GAME_CONFIG.winGrid.rows; rows += 1) {
    //   winGridGraphic.moveTo(0, columny);
    //   winGridGraphic.lineTo(GAME_CONFIG.winGrid.width, columny);
    //   columny += GAME_CONFIG.reelWidth;
    // }

    super(winGridGraphic.generateCanvasTexture());
    this.position.set(GAME_CONFIG.centerPoints.x - GAME_CONFIG.winGrid.width, GAME_CONFIG.centerPoints.y);
    this.anchor.set(0.5, 0.5);
  }
}