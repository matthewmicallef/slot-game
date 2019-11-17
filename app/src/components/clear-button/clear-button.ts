import { Sprite, Texture } from "pixi.js";
import { BetService } from "../../services/bet-service";
import { BetAreaChipCount } from "../bet-area/bet-area-chip-count";
import { SoundService } from "../../services/sound-service";

export class ClearButton extends Sprite {
    private betService: BetService;
    private betAreaChipCount: BetAreaChipCount[];
    private soundService: SoundService;

    constructor(
        betService: BetService,
        betAreaChipCount: BetAreaChipCount[],
        soundService: SoundService
    ) {
        const clearButtonTexture = Texture.fromImage('./assets/button-clear.png');
        const clearButtonHoverTexture = Texture.fromImage('./assets/button-clear-hover.png');

        super(clearButtonTexture);
        this.buttonMode = true;

        this.betService = betService;
        this.betAreaChipCount = betAreaChipCount;
        this.soundService = soundService;

        this.anchor.set(0.5, 0.5);
        this.position.set(700, 535);
        this.scale.set(0.2, 0.2);

        this.disableButton();

        this.handleEvents(clearButtonTexture, clearButtonHoverTexture);
    }

    private handleClick() {
        if (!this.interactive)
            return;

        this.betService.resetBets();

        for (let i = 0; i < this.betAreaChipCount.length; i++) {
            this.betAreaChipCount[i].resetChipCount();
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
        this.on('pointertap', () => {
            this.soundService.playButtonClick();
            this.handleClick()
        });

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