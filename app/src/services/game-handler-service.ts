import { Container, sound } from "pixi.js";
import { BetService } from "./bet-service";
import { BalanceService } from "./balance-service";
import { WinMessage } from "../components/win-message/win-message";
import { GameOver } from "../components/game-over/game-over";
import { BetAreaChipCount } from "../components/bet-area/bet-area-chip-count";
import { SoundService } from "./sound-service";

export class GameHandlerService {
    private container: Container;
    private betService: BetService;
    private balanceService: BalanceService;
    private betAreaChipCount: BetAreaChipCount[];
    private soundService: SoundService;

    constructor(
        container: Container,
        betService: BetService,
        balanceService: BalanceService,
        betAreaChipCount: BetAreaChipCount[],
        soundService: SoundService
    ) {
        this.container = container;
        this.betService = betService;
        this.balanceService = balanceService;
        this.betAreaChipCount = betAreaChipCount;
        this.soundService = soundService;

        addEventListener('spin-complete', (event: any) => this.handleGameSpinComplete(event.detail.slotResult), false);
        addEventListener('no-funds-available', () => this.handleGameOver(), false);
    }

    handleGameSpinComplete(slotResult: number) {
        const win = this.betService.calculateWin(slotResult);

        if (win.balanceWin > 0) {
            this.balanceService.addToBalance(win.balanceWin);
            const winContainer = this.container.addChild(new WinMessage(win.actualWin, this.soundService));

            setTimeout(() => {
                this.container.removeChild(winContainer);
            }, 2000);
        }

        if (this.balanceService.getBalance() <= 0) {
            this.handleGameOver();
            return;
        }

        setTimeout(() => {
            this.betService.resetBets();
        }, 2000);

        for (let i = 0; i < this.betAreaChipCount.length; i++) {
            this.betAreaChipCount[i].resetChipCount();
        }
    }

    handleGameOver() {
        this.container.addChild(new GameOver());

        for (let child of this.container.children) {
          child.interactive = false;
        }
    }
}