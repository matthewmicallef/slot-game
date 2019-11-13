import { Container, Text } from "pixi.js";
import { GAME_CONFIG } from "../../game-config";
import { BalanceService } from "../../services/balance-service";

export class Balance extends Container {
    private balanceText: Text;
    private balanceValueText: Text;
    private balanceService: BalanceService;

    constructor(
        balanceService: BalanceService
    ) {
        super();
        this.balanceService = balanceService;

        console.log('creating balance');

        this.createBalanceText();
        this.createBalanceValueText();

        addEventListener('balance-updated',
            (event: any) => {
                this.updateBalanceValueText(event.detail.balance);
            },
            false
        );
    }

    private createBalanceText() {
        this.balanceText = new Text('Balance:', GAME_CONFIG.balance.style);

        this.balanceText.anchor.set(0.5, 0.5);
        this.balanceText.position.set(GAME_CONFIG.balance.position.x, GAME_CONFIG.balance.position.y);

        this.addChild(this.balanceText);
    }

    private createBalanceValueText() {
        this.balanceValueText = new Text(this.balanceService.getBalance().toString(), GAME_CONFIG.balance.style);

        this.balanceValueText.anchor.set(0.5, 0.5);
        this.balanceValueText.position.set(GAME_CONFIG.balance.position.x + 60, GAME_CONFIG.balance.position.y);

        this.addChild(this.balanceValueText);
    }

    private updateBalanceValueText(balance: number) {
        this.balanceValueText.text = balance.toString();
    }
}