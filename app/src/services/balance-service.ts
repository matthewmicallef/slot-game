export class BalanceService {
    private balance: number = 0;

    constructor(
        balance?: number
    ) {
        if (balance)
            this.balance = balance;
    }

    getBalance() {
        return this.balance;
    }

    setBalance(balance: number) {
        this.balance = balance;
    }
}
