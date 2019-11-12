import { BalanceService } from "./balance-service";

export interface Bet {
    chipAmount: number;
    slotValue: number;
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

        addEventListener('spin-complete', () => this.calculateWin(), false);
    }

    registerBet(bet: Bet) {
        this.registeredBets.push(bet);
        dispatchEvent(new CustomEvent('bet-registered', { detail: { betCount: this.registeredBets.length } }));
    }

    placeBets(): boolean {
        const currentBalance = this.balanceService.getBalance();

        let requiredBalance = 0;
        for (let i = 0; i < this.registeredBets.length; i++) {
            requiredBalance += this.registeredBets[i].chipAmount * this.registeredBets[i].slotValue
        }
        if (requiredBalance <= currentBalance) {
            this.placedBets = this.registeredBets;
            return true;
        }

        return false;
    }

    resetBets() {
        this.registeredBets = [];
        dispatchEvent(new Event('bets-cleared'));
    }

    private calculateWin() {
        console.log('calculating win');
    }
}