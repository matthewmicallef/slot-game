import { BetService } from "./bet-service";
import { BalanceService } from "./balance-service";
import { Container } from "pixi.js";
import { WinMessage } from "../components/win-message/win-message";
import { BetArea } from "../components/bet-area/bet-area";
import { GameOver } from "../components/game-over/game-over";

export class GameHandlerService {
    private container: Container;
    private betService: BetService;
    private balanceService: BalanceService;
    private betAreas: BetArea[];

    constructor(
        container: Container,
        betService: BetService,
        balanceService: BalanceService,
        betAreas: BetArea[]
    ) {
        this.container = container;
        this.betService = betService;
        this.balanceService = balanceService;
        this.betAreas = betAreas;

        addEventListener('spin-complete', (event: any) => this.handleGameSpinComplete(event.detail.slotResult), false);
        addEventListener('no-funds-available', () => this.handleGameOver(), false);
    }

    handleGameSpinComplete(slotResult: number) {
        const win = this.betService.calculateWin(slotResult);

        if (win.balanceWin > 0) {
            this.balanceService.addToBalance(win.balanceWin);
            const winContainer = this.container.addChild(new WinMessage(win.actualWin));
            setTimeout(() => {
                this.container.removeChild(winContainer);
            }, 1000);
        }

        if (this.balanceService.getBalance() <= 0) {
            this.handleGameOver();
            return;
        }

        setTimeout(() => {
            this.betService.resetBets();
        }, 2000);

        for (let i = 0; i < this.betAreas.length; i++) {
            this.betAreas[i].resetChipCount();
        }
    }

    handleGameOver() {
        this.container.addChild(new GameOver());

        for (let child of this.container.children) {
          child.interactive = false;
        }
    }
}