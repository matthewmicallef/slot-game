import { Container, Text, Texture, Sprite } from "pixi.js";
import { GAME_CONFIG } from "../../game-config";
import { SoundService } from "../../services/sound-service";
import { SpriteService } from "../../services/sprite-service";

export class WinMessage extends Container {
    private spriteService: SpriteService;

    constructor(
        winAmount: number,
        soundService: SoundService,
        spriteService: SpriteService
    ) {
        super();

        this.spriteService = spriteService;

        soundService.playWinSound();
        this.createBackground();
        this.createText(winAmount);
    }

    private createBackground() {
        const popupBackground = new Sprite(this.spriteService.getTexture('popup-background'));
        popupBackground.anchor.set(0.5, 0.5);
        popupBackground.position.set(GAME_CONFIG.canvasCenterPoints.x, GAME_CONFIG.canvasCenterPoints.y);
        popupBackground.scale.set(0.4, 0.4);
        
        this.addChild(popupBackground);
    }

    private createText(amount: number) {
        const winMessageText = new Text(`You Won ${amount} coins!`, {
            fontSize: 30,
            fill: 0x000000
        });

        winMessageText.anchor.set(0.5, 0.5);
        winMessageText.position.set(GAME_CONFIG.canvasCenterPoints.x, GAME_CONFIG.canvasCenterPoints.y);

        this.addChild(winMessageText);
    }

}