import { BalanceService } from "./balance-service";

export interface Bet {
    chipAmount: number;
    slotValue: number;
}

export interface Win {
    actualWin: number;
    balanceWin: number;
}

export class BetService {
    private balanceService: BalanceService;
    private placedBets: Bet[];
    private registeredBets: Bet[];

    constructor(
        balanceService: BalanceService
    ) {
        this.balanceService = balanceService;
        this.registeredBets = [];
        this.resetBets();
    }

    registerBet(bet: Bet) {
        this.registeredBets.push(bet);
        dispatchEvent(new CustomEvent('bet-registered', { detail: { betCount: this.registeredBets.length } }));
    }

    placeBets() {
        this.placedBets = this.registeredBets;
        this.registeredBets = [];
        for (let bet of this.registeredBets) {
            this.balanceService.deductFromBalance(bet.chipAmount);
        }
    }

    resetBets() {
        for (let bet of this.registeredBets) {
            this.balanceService.addToBalance(bet.chipAmount)
        }

        this.registeredBets = [];
        dispatchEvent(new Event('bets-cleared'));
    }

    calculateWin(slotResult: number): Win {
        let win = 0;
        let chipAmount = 0;

        for (let i = 0; i < this.placedBets.length; i++) {
            if (this.placedBets[i].slotValue === slotResult) {
                chipAmount += this.placedBets[i].chipAmount;
                win += this.placedBets[i].chipAmount + (this.placedBets[i].chipAmount * this.placedBets[i].slotValue);
            }
        }

        console.log('win', win);
        return {
            actualWin: win - chipAmount,
            balanceWin: win
        };
    }
}