import { BetService } from "./bet-service";
import { BalanceService } from "./balance-service";
import { Application } from "pixi.js";
import { WinMessage } from "../components/win-message/win-message";
import { BetArea } from "../components/bet-area/bet-area";
import { GameOver } from "../components/game-over/game-over";

export class GameHandlerService {
    private application: Application;
    private betService: BetService;
    private balanceService: BalanceService;
    private betAreas: BetArea[];

    constructor(
        application: Application,
        betService: BetService,
        balanceService: BalanceService,
        betAreas: BetArea[]
    ) {
        this.application = application;
        this.betService = betService;
        this.balanceService = balanceService;
        this.betAreas = betAreas;

        addEventListener('spin-complete', (event: any) => this.handleGameSpinComplete(event.detail.slotResult), false);
        addEventListener('no-funds-available', () => this.handleGameOver(), false);
    }

    handleGameSpinComplete(slotResult: number, ) {
        const win = this.betService.calculateWin(slotResult);

        if (win > 0) {
            this.balanceService.addToBalance(win);
            const winContainer = this.application.stage.addChild(new WinMessage(win));
            setTimeout(() => {
                this.application.stage.removeChild(winContainer);
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
        this.application.stage.addChild(new GameOver());

        for (let child of this.application.stage.children) {
          child.interactive = false;
        }
    }
}