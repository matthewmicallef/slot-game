import { Text, Container, Sprite } from "pixi.js";
import { GAME_CONFIG } from "../../game-config";
import { SpriteService } from "../../services/sprite-service";

export class GameOver extends Container {
    private spriteService: SpriteService;

    constructor(
        spriteService: SpriteService
    ) {
        super();

        this.spriteService = spriteService;

        this.createBackground();
        this.createText();
    }

    private createBackground() {
        const popupBackground = new Sprite(this.spriteService.getTexture('popup-background'));
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