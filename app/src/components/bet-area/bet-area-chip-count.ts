import { Container, Text, loader } from "pixi.js";

export class BetAreaChipCount extends Container {
    private initPositionValueX: number;
    private initPositionValueY: number;
    private counter: number;
    private chipCount: number;
    private chipCountValueText: Text;

    constructor(
        counter: number
    ) {
        super();

        this.counter = counter;
        this.chipCount = 0;

        this.initPositionValueX = 95;
        this.initPositionValueY = 570;

        this.createChipCountText();
    }

    resetChipCount() {
        this.chipCount = 0;
        this.chipCountValueText.text = '0';
    }

    incrementChipCount() {
        this.chipCount += 1;
        this.chipCountValueText.text = this.chipCount.toString();
    }

    private createChipCountText() {
        const chipCountText = new Text('Chips:', {
            fontSize: 14,
            fill: 0xffffff
        });

        chipCountText.anchor.set(0.5, 0.5);
        chipCountText.position.set(
            this.initPositionValueX + 20 + (80 * (this.counter + 1)),
            this.initPositionValueY
        );

        this.chipCountValueText = new Text(this.chipCount.toString(), {
            fontSize: 14,
            fill: 0xffffff
        });
        this.chipCountValueText.anchor.set(0.5, 0.5);
        this.chipCountValueText.position.set(
            this.initPositionValueX + 50 + (80 * (this.counter + 1)),
            this.initPositionValueY
        );

        this.addChild(chipCountText);
        this.addChild(this.chipCountValueText);
    }
}