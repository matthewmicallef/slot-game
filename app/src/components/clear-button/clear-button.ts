import { Graphics, Text, Sprite, Texture } from "pixi.js";
import { BetService } from "../../services/bet-service";
import { BetArea } from "../bet-area/bet-area";

export class ClearButton extends Sprite {
    private betService: BetService;
    private betAreas: BetArea[];
    private circle: Graphics;

    constructor(
        betService: BetService,
        betAreas: BetArea[]
    ) {
        const clearButtonTexture = Texture.fromImage('./assets/button-clear.png');
        const clearButtonHoverTexture = Texture.fromImage('./assets/button-clear-hover.png');

        super(clearButtonTexture);
        this.buttonMode = true;

        this.betService = betService;
        this.betAreas = betAreas;

        this.anchor.set(0.5, 0.5);
        this.position.set(700, 525);
        this.scale.set(0.2, 0.2);

        this.disableButton();

        this.handleEvents(clearButtonTexture, clearButtonHoverTexture);
    }

    private handleClick() {
        if (!this.interactive)
            return;

        this.betService.resetBets();

        for (let i = 0; i < this.betAreas.length; i++) {
            this.betAreas[i].resetChipCount();
        }

        this.disableButton();
    }

    private disableButton() {
        this.interactive = false;
    }

    private enableButton() {
        this.interactive = true;
    }

    private handleEvents(texture: Texture, hoverTexture: Texture) {
        this.on('pointertap', () => this.handleClick());

        this.on('pointerover', () => {
            this.texture = hoverTexture;
        });

        this.on('pointerout', () => {
            this.texture = texture;
        });

        addEventListener('bet-area-clicked', () => this.enableButton(), false);
        addEventListener('spin-complete', () => this.disableButton(), false);
        addEventListener('spinning', () => this.disableButton(), false);
    }
}