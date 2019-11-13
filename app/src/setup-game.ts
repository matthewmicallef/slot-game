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
import { WinMessage } from './components/win-message/win-message';
import { Pointer } from './components/pointer/pointer';
import { GameOver } from './components/game-over/game-over';
import { GameHandlerService } from './services/game-handler-service';

export class SetupGame {
  constructor(
    application: Application
  ) {

    const balanceService = new BalanceService(5);
    const balance = new Balance(balanceService);
    const betService = new BetService(balanceService);
    const betAreas: BetArea[] = [];

    const reelService = new ReelService();
    const canvasReel = new Reel(GAME_CONFIG.reel);
    reelService.setReel(canvasReel);

    for (let i = 0; i <= 5; i++) {
      const betArea = new BetArea(i, GAME_CONFIG.slotValues[i], betService, balanceService);
      betAreas.push(betArea);
      application.stage.addChild(betArea);
    }

    const clearButton = new ClearButton(betService, betAreas);
    const spinButton = new SpinButton(reelService, betService);

    const gameHandlerService = new GameHandlerService(
      application,
      betService,
      balanceService,
      betAreas
    );

    application.stage.addChild(balance);
    application.stage.addChild(canvasReel);
    application.stage.addChild(clearButton);
    application.stage.addChild(spinButton);
    application.stage.addChild(new Pointer());
  }
}
