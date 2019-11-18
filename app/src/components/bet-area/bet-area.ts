import { Sprite, loader } from "pixi.js";
import { BetService } from "../../services/bet-service";
import { BalanceService } from "../../services/balance-service";
import { BetAreaChipCount } from "./bet-area-chip-count";
import { SoundService } from "../../services/sound-service";
import { SpriteService } from "../../services/sprite-service";

export class BetArea extends Sprite {
    private betAreaChipCount: BetAreaChipCount
    private betAreaValue: number;
    private betService: BetService;
    private balanceService: BalanceService;
    private soundService: SoundService
    private initPositionValueX: number;
    private initPositionValueY: number;
    private counter: number;

    constructor(
        counter: number,
        betAreaChipCount: BetAreaChipCount,
        betAreaValue: number,
        betService: BetService,
        balanceService: BalanceService,
        soundService: SoundService,
        spriteService: SpriteService
    ) {
        super(spriteService.getTexture(`number-${betAreaValue}`));

        this.buttonMode = true;
        this.interactive = true;

        this.betAreaValue = betAreaValue;
        this.betService = betService;
        this.balanceService = balanceService;
        this.soundService = soundService;
        this.betAreaChipCount = betAreaChipCount;

        this.counter = counter;

        this.init();
        this.handleEvents();
    }

    private init() {
        this.initPositionValueX = 120;
        this.initPositionValueY = 524;
        this.anchor.set(0.5, 0.5);
        this.position.set(
            this.initPositionValueX + (80 * (this.counter + 1)),
            this.initPositionValueY,
        );
        this.scale.set(0.1, 0.1);
    }

    private handleClick() {
        if (this.balanceService.getBalance() <= 0)
            return;

        this.betAreaChipCount.incrementChipCount();
        this.betService.registerBet({
            chipAmount: 1,
            slotValue: this.betAreaValue
        })
        this.balanceService.deductFromBalance(1);
        dispatchEvent(new Event('bet-area-clicked'));
    }

    private handleEvents() {
        this.on('pointertap', () => {
            this.soundService.playCoinSound();
            this.handleClick()
        });

        addEventListener('spinning', () => this.interactive = false, false);
        addEventListener('spin-complete', () => this.interactive = true, false);
    }
}