import { Container, Graphics, Text } from "pixi.js";
import { GAME_CONFIG } from "../../game-config";
import { BetService } from "../../services/bet-service";
import { BalanceService } from "../../services/balance-service";

export class BetArea extends Container {
    private betArea: Graphics;
    private betAreaValue: number;
    private betService: BetService;
    private balanceService: BalanceService;
    private chipCount: number;

    private initPositionValueX = 100;
    private initPositionValueY = 500;
    private counter = 0;

    private chipCountValueText: Text;

    constructor(
        counter: number,
        betAreaValue: number,
        betService: BetService,
        balanceService: BalanceService
    ) {
        super();
        this.buttonMode = true;
        this.interactive = true;

        this.betArea = new Graphics();
        this.betAreaValue = betAreaValue;
        this.betService = betService;
        this.balanceService = balanceService;
        this.counter = counter;
        this.chipCount = 0;

        this.createBetArea();
        this.createBetAreaValueText();
        this.createChipCountText();
        this.on('click', () => this.handleClick())
    }

    resetChipCount() {
        this.chipCount = 0;
        this.chipCountValueText.text = '0';
    }

    private handleClick() {
        if (this.balanceService.getBalance() <= 0) 
            return;

        this.chipCount += 1;
        this.betService.registerBet({
            chipAmount: 1,
            slotValue: this.betAreaValue
        })
        this.chipCountValueText.text = this.chipCount.toString();
        this.balanceService.deductFromBalance(1);
        dispatchEvent(new Event('bet-area-clicked'));
        // TODO: Update Balance on every click and on clear button update balance again
    }

    private createBetArea() {
        this.betArea
            .beginFill(0x118866)
            .lineStyle(2, 0xffffff)
            .drawRect(
                this.initPositionValueX + (80 * (this.counter + 1)),
                this.initPositionValueY,
                50,
                50
            )
            .endFill();

        this.addChild(this.betArea);
    }

    private createBetAreaValueText() {
        const betAreaValueText = new Text(this.betAreaValue.toString(), {
            fontSize: 24,
            fill: 0x1845
        });

        betAreaValueText.anchor.set(0.5, 0.5);
        betAreaValueText.position.set(
            this.initPositionValueX + 25 + (80 * (this.counter + 1)),
            this.initPositionValueY + 25
        );

        this.addChild(betAreaValueText);
    }

    private createChipCountText() {
        const chipCountText = new Text('Chips:', {
            fontSize: 12,
            fill: 0xffffff
        });

        chipCountText.anchor.set(0.5, 0.5);
        chipCountText.position.set(
            this.initPositionValueX + 20 + (80 * (this.counter + 1)),
            this.initPositionValueY + 70
        );

        this.chipCountValueText = new Text(this.chipCount.toString(), {
            fontSize: 12,
            fill: 0xffffff
        });
        this.chipCountValueText.anchor.set(0.5, 0.5);
        this.chipCountValueText.position.set(
            this.initPositionValueX + 45 + (80 * (this.counter + 1)),
            this.initPositionValueY + 70
        );

        this.addChild(chipCountText);
        this.addChild(this.chipCountValueText);
    }
}