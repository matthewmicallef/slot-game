import { Container, Graphics, Text } from "pixi.js";

export class WinMessage extends Container {
    constructor(
        winAmount: number
    ) {
        super();

        this.createBackground();
        this.createText(winAmount);
    }

    private createBackground() {
        this.addChild(new Graphics()
            .beginFill(0x000000)
            .lineStyle(2, 0xffffff)
            .drawRect(250, 200, 300, 100)
            .endFill()
        );
    }

    private createText(amount: number) {
        const winMessageText = new Text(`You Won ${amount} coins!`, {
            fontSize: 30,
            fill: 0xffffff
        });

        winMessageText.anchor.set(0.5, 0.5);
        winMessageText.position.set(400, 250);

        this.addChild(winMessageText);
    }

}