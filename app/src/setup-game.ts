import { Application, loader, sound } from 'pixi.js';
import { GameScene } from './scenes/game/game.scene';
import { SplashScene } from './scenes/splash/splash.scene';
import { SoundService } from './services/sound-service';
import { SoundArea } from './components/sound-area/sound-area';
import { GAME_CONFIG } from './game-config';
import { SpriteService } from './services/sprite-service';

export class SetupGame {
  constructor(
    application: Application
  ) {

    const soundService = new SoundService();
    const spriteService = new SpriteService();
    const splashScene = new SplashScene(soundService, spriteService);

    application.stage.addChild(new SoundArea(soundService, spriteService));
    application.stage.addChild(splashScene);

    addEventListener('load-game', (event: any) => {
      soundService.stopSceneSound();
      splashScene.removeTextBox();
      splashScene.destroy({
        children: true
      });

      application.stage.addChild(new GameScene(event.detail.requiredBalance, soundService, spriteService));
    });
  }
}
