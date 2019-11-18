import { Sprite, Texture } from "pixi.js";
import { BetService } from "../../services/bet-service";
import { BetAreaChipCount } from "../bet-area/bet-area-chip-count";
import { SoundService } from "../../services/sound-service";
import { SpriteService } from "../../services/sprite-service";

export class ClearButton extends Sprite {
    private betService: BetService;
    private betAreaChipCount: BetAreaChipCount[];
    private soundService: SoundService;
    private clearButtontexture: Texture;

    constructor(
        betService: BetService,
        betAreaChipCount: BetAreaChipCount[],
        soundService: SoundService,
        spriteService: SpriteService
    ) {
        const clearButtonTexture = spriteService.getTexture('button-clear');
        const clearButtonHoverTexture = spriteService.getTexture('button-clear-hover');

        super(clearButtonTexture);

        this.buttonMode = true;
        this.clearButtontexture = clearButtonTexture;

        this.betService = betService;
        this.betAreaChipCount = betAreaChipCount;
        this.soundService = soundService;

        this.anchor.set(0.5, 0.5);
        this.position.set(700, 535);
        this.scale.set(0.2, 0.2);

        this.disableButton();

        this.handleEvents(clearButtonHoverTexture);
    }

    private handleClick() {
        if (!this.interactive)
            return;

        this.betService.resetBets();

        for (const betAreaChipCount of this.betAreaChipCount) {
            betAreaChipCount.resetChipCount();
        }

        this.disableButton();
    }

    private disableButton() {
        this.texture = this.clearButtontexture;
        this.interactive = false;
    }

    private enableButton() {
        if (!this.interactive)
            this.interactive = true;
    }

    private handleEvents(hoverTexture: Texture) {
        this.on('pointertap', () => {
            this.soundService.playButtonClick();
            this.handleClick()
        });

        this.on('pointerover', () => {
            if (this.interactive)
                this.texture = hoverTexture;
        });

        this.on('pointerout', () => {
            this.texture = this.clearButtontexture;
        });

        addEventListener('bet-area-clicked', () => this.enableButton(), false);
        addEventListener('spinning', () => this.disableButton(), false);
    }
}