import { Container, Text, Sprite } from "pixi.js";
import { GAME_CONFIG } from "../../game-config";
import { BalanceService } from "../../services/balance-service";
import { SpriteService } from "../../services/sprite-service";

export class Balance extends Container {
    private balanceText: Text;
    private balanceValueText: Text;
    private balanceService: BalanceService;
    private spriteService: SpriteService;

    constructor(
        balanceService: BalanceService,
        spriteService: SpriteService
    ) {
        super();
        this.balanceService = balanceService;
        this.spriteService = spriteService;

        this.createBackground();
        this.createBalanceText();
        this.createBalanceValueText();

        addEventListener('balance-updated',
            (event: any) => {
                this.updateBalanceValueText(event.detail.balance);
            },
            false
        );
    }

    private createBackground() {
        const backgroundSprite = new Sprite(this.spriteService.getTexture('balance-background'));

        backgroundSprite.anchor.set(0.5, 0.5);
        backgroundSprite.position.set(GAME_CONFIG.balance.position.x, GAME_CONFIG.balance.position.y);
        backgroundSprite.scale.set(0.35, 0.5);

        this.addChild(backgroundSprite);
    }

    private createBalanceText() {
        this.balanceText = new Text('Balance:', GAME_CONFIG.balance.style);

        this.balanceText.anchor.set(0.5, 0.5);
        this.balanceText.position.set(GAME_CONFIG.balance.position.x - 15, GAME_CONFIG.balance.position.y);

        this.addChild(this.balanceText);
    }

    private createBalanceValueText() {
        this.balanceValueText = new Text(this.balanceService.getBalance().toString(), GAME_CONFIG.balance.style);

        this.balanceValueText.anchor.set(0.5, 0.5);
        this.balanceValueText.position.set(GAME_CONFIG.balance.position.x + 40, GAME_CONFIG.balance.position.y);

        this.addChild(this.balanceValueText);
    }

    private updateBalanceValueText(balance: number) {
        this.balanceValueText.text = balance.toString();
    }
}