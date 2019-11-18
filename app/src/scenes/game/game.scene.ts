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
import { SoundService } from '../../services/sound-service';
import { SpriteService } from '../../services/sprite-service';

export class GameScene extends Container {
    private balanceService: BalanceService;
    private betService: BetService;
    private reelService: ReelService;
    private soundService: SoundService;
    private spriteService: SpriteService;

    constructor(
        balance: number,
        soundService: SoundService,
        spriteService: SpriteService
    ) {
        super();
        this.balanceService = new BalanceService(balance);
        this.betService = new BetService(this.balanceService);
        this.reelService = new ReelService();
        this.soundService = soundService;
        this.spriteService = spriteService;

        this.init();
        this.soundService.playGameSceneSound();
    }

    init() {
        const balance = new Balance(this.balanceService, this.spriteService);
        const betAreaChipCount: BetAreaChipCount[] = [];
        const canvasReel = new Reel(this.spriteService, this.soundService);
        this.reelService.setReel(canvasReel);

        for (let i = 0; i <= 5; i++) {
            const chipCount = new BetAreaChipCount(i);
            const betArea = new BetArea(
                i,
                chipCount,
                GAME_CONFIG.slotValues[i],
                this.betService,
                this.balanceService,
                this.soundService,
                this.spriteService
            );
            betAreaChipCount.push(chipCount);

            this.addChild(betArea);
            this.addChild(chipCount);
        }

        const gameHandlerService = new GameHandlerService(
            this,
            this.betService,
            this.balanceService,
            betAreaChipCount,
            this.soundService,
            this.spriteService
        );

        const clearButton = new ClearButton(
            this.betService,
            betAreaChipCount,
            this.soundService,
            this.spriteService
        );

        const spinButton = new SpinButton(
            this.reelService,
            this.betService,
            this.soundService,
            this.spriteService
        );

        this.addChild(balance);
        this.addChild(canvasReel);
        this.addChild(clearButton);
        this.addChild(spinButton);
        this.addChild(new Pointer(this.spriteService));
    }
}