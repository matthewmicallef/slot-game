import { Application } from 'pixi.js';
import { GameScene } from './scenes/game/game.scene';
import { SplashScene } from './scenes/splash/splash.scene';

export class SetupGame {
  constructor(
    application: Application
  ) {

    const splashScene = new SplashScene();
    application.stage.addChild(splashScene);

    addEventListener('load-game', (event: any) => {
      splashScene.removeTextBox();
      application.stage.removeChild(splashScene);
      application.stage.addChild(new GameScene(event.detail.requiredBalance));
    });
  }
}
