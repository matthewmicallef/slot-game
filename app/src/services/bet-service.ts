import { BalanceService } from "./balance-service";

export interface Bet {
    chipAmount: number;
    slotValue: number;
}

export class BetService {
    private balanceService: BalanceService;
    private placedBets: Bet[];
    private registeredBets: Bet[];
    private win = 0;

    constructor(
        balanceService: BalanceService
    ) {
        this.balanceService = balanceService;
        this.registeredBets = [];
        this.resetBets();

        // addEventListener('spin-complete',
        //     (event: any) => {
        //         this.calculateWin(event.detail.slotResult);
        //         if (this.win > 0) {
        //             // show winning message here.
        //             this.balanceService.addToBalance(this.win);
        //         }

        //         if (this.balanceService.getBalance() <= 0) {

        //         }

        //         setTimeout(() => {
        //             this.resetBets();
        //         }, 2000);
        //     },
        //     false
        // );
    }

    registerBet(bet: Bet) {
        this.registeredBets.push(bet);
        dispatchEvent(new CustomEvent('bet-registered', { detail: { betCount: this.registeredBets.length } }));
    }

    placeBets() {
        // const currentBalance = this.balanceService.getBalance();

        // let requiredBalance = 0;
        this.placedBets = this.registeredBets;
        this.registeredBets = [];
        for (let bet of this.registeredBets) {
            // requiredBalance += this.registeredBets[i].chipAmount;
            this.balanceService.deductFromBalance(bet.chipAmount);
        }

        // if (requiredBalance <= currentBalance) {
        //     this.placedBets = this.registeredBets;
        //     this.balanceService.deductFromBalance(requiredBalance);
        //     return true;
        // }        

        // return false;
    }

    resetBets() {
        for (let bet of this.registeredBets) {
            this.balanceService.addToBalance(bet.chipAmount)
        }

        this.registeredBets = [];
        dispatchEvent(new Event('bets-cleared'));
    }

    getWin(): number {
        return this.win;
    } 

    calculateWin(slotResult: number): number {
        this.win = 0;
        for (let i = 0; i < this.placedBets.length; i++) {
            if (this.placedBets[i].slotValue === slotResult) {
                this.win += this.placedBets[i].chipAmount * this.placedBets[i].slotValue;
            }
        }

        console.log('win', this.win);
        return this.win;
    }
}