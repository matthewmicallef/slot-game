import { Application, loader, sound } from 'pixi.js';
import { GameScene } from './scenes/game/game.scene';
import { SplashScene } from './scenes/splash/splash.scene';
import { SoundService } from './services/sound-service';
import { SoundArea } from './components/sound-area/sound-area';

export class SetupGame {
  constructor(
    application: Application
  ) {

    const soundService = new SoundService();
    const splashScene = new SplashScene(soundService);
    
    application.stage.addChild(new SoundArea(soundService));
    application.stage.addChild(splashScene);

    addEventListener('load-game', (event: any) => {
      soundService.stopSceneSound();
      splashScene.removeTextBox();
      splashScene.destroy({
        children: true
      });

      application.stage.addChild(new GameScene(event.detail.requiredBalance, soundService));
    });


    // application.stage.addChild(new GameScene(10, soundService));
  }
}
