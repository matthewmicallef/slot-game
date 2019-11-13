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

    addToBalance(value: number) {
        this.balance += value;
        this.notifyBalanceUpdate();
    }

    deductFromBalance(value: number) {
        this.balance -= value;
        this.notifyBalanceUpdate();
    }

    notifyBalanceUpdate() {
        dispatchEvent(new CustomEvent('balance-updated', { detail: { balance: this.balance } }));
    }
}
