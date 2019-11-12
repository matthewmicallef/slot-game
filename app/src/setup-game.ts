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

export class SetupGame {
  constructor(
    application: Application
  ) {
    const balanceService = new BalanceService(100);
    const balance = new Balance(balanceService);
    const betService = new BetService(balanceService);

    const reelService = new ReelService();
    const canvasReel = new Reel(GAME_CONFIG.reel);
    reelService.setReel(canvasReel);

    const betAreas: BetArea[] = [];
    for(let i = 1; i <= 6; i++) {
      const betArea = new BetArea(i, betService);
      betAreas.push(betArea);
      application.stage.addChild(betArea);
    }

    const clearButton = new ClearButton(betService, betAreas);
    const spinButton = new SpinButton(reelService, betService);
    
    application.stage.addChild(balance);
    application.stage.addChild(canvasReel);
    application.stage.addChild(clearButton);
    application.stage.addChild(spinButton);
    // application.stage.addChild(new WinGrid());
  }
}
