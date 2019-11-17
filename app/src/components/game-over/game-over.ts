import { Text, Container, Sprite, Texture } from "pixi.js";
import { GAME_CONFIG } from "../../game-config";

export class GameOver extends Container {
    constructor() {
        super();

        this.createBackground();
        this.createText();
    }

    private createBackground() {
        const popupBackground = new Sprite(Texture.fromImage('./assets/popup-background.png'));
        popupBackground.anchor.set(0.5, 0.5);
        popupBackground.position.set(GAME_CONFIG.canvasCenterPoints.x, GAME_CONFIG.canvasCenterPoints.y);
        popupBackground.scale.set(0.9, 0.9);

        this.addChild(popupBackground);
    }

    private createText() {
        const text = new Text('GAME OVER', {
            fontFamily: 'Arial',
            fontSize: 40,
            fill: 0x000000,
            align: 'center',
        });

        text.anchor.set(0.5, 0.5);
        text.position.set(400, 300);

        this.addChild(text);
    }
}