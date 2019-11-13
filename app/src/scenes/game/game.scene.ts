import { Container } from 'pixi.js';
import { Reel } from '../../components/reel/reel';
import { GAME_CONFIG } from '../../game-config';
import { SpinButton } from '../../components/spin-button/spin-button';
import { ReelService } from '../../services/reel-service';
import { WinGrid } from '../../components/win-grid/win-grid';
import { Balance } from '../../components/balance/balance';
import { BetArea } from '../../components/bet-area/bet-area';
import { BalanceService } from '../../services/balance-service';
import { BetService } from '../../services/bet-service';
import { ClearButton } from '../../components/clear-button/clear-button';
import { Pointer } from '../../components/pointer/pointer';
import { GameHandlerService } from '../../services/game-handler-service';

export class GameScene extends Container {
    private balanceService: BalanceService;
    private betService: BetService;
    private reelService: ReelService;

    constructor() {
        super();
        this.balanceService = new BalanceService(5);
        this.betService = new BetService(this.balanceService);
        this.reelService = new ReelService();

        this.init();
    }

    init() {
        const balance = new Balance(this.balanceService);
        const betAreas: BetArea[] = [];
        const canvasReel = new Reel(GAME_CONFIG.reel);
        this.reelService.setReel(canvasReel);

        for (let i = 0; i <= 5; i++) {
            const betArea = new BetArea(i, GAME_CONFIG.slotValues[i], this.betService, this.balanceService);
            betAreas.push(betArea);
            this.addChild(betArea);
        }

        const gameHandlerService = new GameHandlerService(
            this,
            this.betService,
            this.balanceService,
            betAreas
        );

        const clearButton = new ClearButton(this.betService, betAreas);
        const spinButton = new SpinButton(this.reelService, this.betService);

        this.addChild(balance);
        this.addChild(canvasReel);
        this.addChild(clearButton);
        this.addChild(spinButton);
        this.addChild(new Pointer());
    }
}