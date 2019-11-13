import { Reel } from './components/reel/reel';
import { GAME_CONFIG } from './game-config';
import { SpinButton } from './components/spin-button/spin-button';
import { ReelService } from './services/reel-service';
import { WinGrid } from './components/win-grid/win-grid';
import { Application } from 'pixi.js';
import { Balance } from './components/balance/balance';
import { BetArea } from './components/bet-area/bet-area';
import { BalanceService } from './services/balance-service';
import { BetService } from './services/bet-service';
import { ClearButton } from './components/clear-button/clear-button';
import { Pointer } from './components/pointer/pointer';
import { GameHandlerService } from './services/game-handler-service';
import { GameScene } from './scenes/game/game.scene';
import { SplashScene } from './scenes/splash/splash.scene';

export class SetupGame {
  constructor(
    application: Application
  ) {

    const splashScene = application.stage.addChild(new SplashScene());

    addEventListener('continue-to-game', () => {
      application.stage.removeChild(splashScene);
      application.stage.addChild(new GameScene());
    });
  }
}
