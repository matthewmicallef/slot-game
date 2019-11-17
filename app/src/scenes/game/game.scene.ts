import { Container } from 'pixi.js';
import { Reel } from '../../components/reel/reel';
import { GAME_CONFIG } from '../../game-config';
import { SpinButton } from '../../components/spin-button/spin-button';
import { ReelService } from '../../services/reel-service';
import { Balance } from '../../components/balance/balance';
import { BetArea } from '../../components/bet-area/bet-area';
import { BalanceService } from '../../services/balance-service';
import { BetService } from '../../services/bet-service';
import { ClearButton } from '../../components/clear-button/clear-button';
import { Pointer } from '../../components/pointer/pointer';
import { GameHandlerService } from '../../services/game-handler-service';
import { BetAreaChipCount } from '../../components/bet-area/bet-area-chip-count';
import { SoundArea } from '../../components/sound-area/sound-area';
import { SoundService } from '../../services/sound-service';

export class GameScene extends Container {
    private balanceService: BalanceService;
    private betService: BetService;
    private reelService: ReelService;
    private soundService: SoundService;

    constructor(
        balance: number,
        soundService: SoundService
    ) {
        super();
        this.balanceService = new BalanceService(balance);
        this.betService = new BetService(this.balanceService);
        this.reelService = new ReelService();
        this.soundService = soundService;

        this.init();
        this.soundService.playGameSceneSound();
    }

    init() {
        const balance = new Balance(this.balanceService);
        const betAreaChipCount: BetAreaChipCount[] = [];
        const canvasReel = new Reel(GAME_CONFIG.reel);
        this.reelService.setReel(canvasReel);

        for (let i = 0; i <= 5; i++) {
            const chipCount = new BetAreaChipCount(i);
            const betArea = new BetArea(i, chipCount, GAME_CONFIG.slotValues[i], this.betService, this.balanceService);
            betAreaChipCount.push(chipCount);

            this.addChild(betArea);
            this.addChild(chipCount);
        }

        const gameHandlerService = new GameHandlerService(
            this,
            this.betService,
            this.balanceService,
            betAreaChipCount,
            this.soundService
        );

        const clearButton = new ClearButton(this.betService, betAreaChipCount, this.soundService);
        const spinButton = new SpinButton(this.reelService, this.betService, this.soundService);;

        this.addChild(balance);
        this.addChild(canvasReel);
        this.addChild(clearButton);
        this.addChild(spinButton);
        this.addChild(new Pointer());
        this.addChild(new SoundArea(this.soundService));
    }
}