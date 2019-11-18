import { Container } from "pixi.js";
import { BetService } from "./bet-service";
import { BalanceService } from "./balance-service";
import { WinMessage } from "../components/win-message/win-message";
import { GameOver } from "../components/game-over/game-over";
import { BetAreaChipCount } from "../components/bet-area/bet-area-chip-count";
import { SoundService } from "./sound-service";
import { SpriteService } from "./sprite-service";

export class GameHandlerService {
    private container: Container;
    private betService: BetService;
    private balanceService: BalanceService;
    private betAreaChipCount: BetAreaChipCount[];
    private soundService: SoundService;
    private spriteService: SpriteService;

    constructor(
        container: Container,
        betService: BetService,
        balanceService: BalanceService,
        betAreaChipCount: BetAreaChipCount[],
        soundService: SoundService,
        spriteService: SpriteService
    ) {
        this.container = container;
        this.betService = betService;
        this.balanceService = balanceService;
        this.betAreaChipCount = betAreaChipCount;
        this.soundService = soundService;
        this.spriteService = spriteService;

        addEventListener('spin-complete', (event: any) => this.handleGameSpinComplete(event.detail.slotResult), false);
        addEventListener('no-funds-available', () => this.handleGameOver(), false);
    }

    handleGameSpinComplete(slotResult: number) {
        const win = this.betService.calculateWin(slotResult);

        if (win.balanceWin > 0) {
            this.balanceService.addToBalance(win.balanceWin);
            const winContainer = this.container.addChild(
                new WinMessage(win.actualWin, this.soundService, this.spriteService)
            );

            this.setGameInteraction(false);
            setTimeout(() => {
                this.container.removeChild(winContainer);
                this.betService.resetBets();
                this.setGameInteraction(true);
            }, 2000);
        }

        if (this.balanceService.getBalance() <= 0) {
            this.handleGameOver();
            return;
        }

        if (win.balanceWin <= 0) {
            this.betService.resetBets();
        }

        for (let i = 0; i < this.betAreaChipCount.length; i++) {
            this.betAreaChipCount[i].resetChipCount();
        }
    }

    setGameInteraction(state: boolean) {
        for (let child of this.container.children) {
            child.interactive = state;
        }
    }

    handleGameOver() {
        this.container.addChild(new GameOver(this.spriteService));
        this.setGameInteraction(false);
    }
}