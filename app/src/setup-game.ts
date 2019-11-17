import { Application, loader, sound } from 'pixi.js';
import { GameScene } from './scenes/game/game.scene';
import { SplashScene } from './scenes/splash/splash.scene';
import { SoundService } from './services/sound-service';

export class SetupGame {
  constructor(
    application: Application
  ) {

    const soundService = new SoundService();
    const splashScene = new SplashScene(soundService);
    application.stage.addChild(splashScene);

    addEventListener('load-game', (event: any) => {
      splashScene.removeTextBox();
      soundService.stopSceneSound();
      splashScene.destroy({
        children: true
      });

      application.stage.addChild(new GameScene(event.detail.requiredBalance, soundService));
    });


    // application.stage.addChild(new GameScene(10, soundService));
  }
}
