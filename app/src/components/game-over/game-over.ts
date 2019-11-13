import { Graphics, Text } from "pixi.js";
import { GAME_CONFIG } from "../../game-config";

export class GameOver extends Graphics {
    constructor() {
        super();

        this.createBackground();
        this.createText();
    }

    private createBackground() {
        this.addChild(new Graphics()
            .beginFill(0x000000)
            .lineStyle(2, 0xffffff)
            .drawRect(
                GAME_CONFIG.canvas.width / 2 - 250,
                GAME_CONFIG.canvas.height / 2 - 250,
                500,
                500
            )
            .endFill()
        );
    }

    private createText() {
        const text = new Text('GAME OVER', {
            fontFamily: 'Arial',
            fontSize: 40,
            fill: 0xff1010,
            align: 'center',
        });

        text.anchor.set(0.5, 0.5);
        text.position.set(400, 300);

        this.addChild(text);
    }
}