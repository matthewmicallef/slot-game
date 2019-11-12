import { Container, Text } from "pixi.js";
import { GAME_CONFIG } from "../../game-config";

export class Balance extends Container {
    private balanceText: Text;
    private balanceValueText: Text;
    private balance: number;

    constructor() {
        super();

        console.log('creating balance');

        this.createBalanceText();
        this.createBalanceValueText();
        this.setBalance(0);
    }

    getBalance() {
        return this.balance.toString();
    }

    setBalance(balance: number) {
        this.balance = balance;
    }

    private createBalanceText() {
        this.balanceText = new Text('Balance:', GAME_CONFIG.balance.style);

        this.balanceText.anchor.set(0.5, 0.5);
        this.balanceText.position.set(GAME_CONFIG.balance.position.x, GAME_CONFIG.balance.position.y);

        this.addChild(this.balanceText);
    }

    private createBalanceValueText() {
        this.balanceValueText = new Text(this.balance.toString(), GAME_CONFIG.balance.style);

        this.balanceValueText.anchor.set(0.5, 0.5);
        this.balanceValueText.position.set(GAME_CONFIG.balance.position.x, GAME_CONFIG.balance.position.y);

        this.addChild(this.balanceValueText);
    }
}