import { Reel } from './components/reel/reel';
import { GAME_CONFIG } from './game-config';
import { SpinButton } from './components/spin-button/spin-button';
import { ReelService } from './components/reel/reel-service';
import { WinGrid } from './components/win-grid/win-grid';
import { Application } from 'pixi.js';

export class SetupGame {
  constructor(
    application: Application
  ) {
    const reelService = new ReelService();
    const canvasReel = new Reel(GAME_CONFIG.reel);
    reelService.setReel(canvasReel);
    application.stage.addChild(canvasReel);

    // application.stage.addChild(new WinGrid());

    application.stage.addChild(new SpinButton(reelService));
  }
}
