import { Application } from 'pixi.js';
import { GAME_CONFIG } from '../game-config';

export class ApplicationLoader {
  gameContainer = document.querySelector('.game-container');

  load(): Promise<any> {
    return new Promise((resolve) => {
      const application = new Application({
        width: GAME_CONFIG.canvas.width,
        height: GAME_CONFIG.canvas.height,
        transparent: true
      });

      this.gameContainer.appendChild(application.view);

      resolve(application);
    });
  }
}
