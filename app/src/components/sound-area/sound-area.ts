import { Sprite, Texture } from "pixi.js";
import { SoundService, SoundState } from "../../services/sound-service";
import { SpriteService } from "../../services/sprite-service";

export class SoundArea extends Sprite {
    private soundService: SoundService;

    constructor(
        soundService: SoundService,
        spriteService: SpriteService
    ) {
        const playButtonTexture = spriteService.getTexture('sound-play');
        const playButtonHoverTexture = spriteService.getTexture('sound-play-hover');
        const muteButtonTexture = spriteService.getTexture('sound-mute');
        const muteButtonHoverTexture = spriteService.getTexture('sound-mute-hover');

        super(playButtonTexture);

        this.soundService = soundService;

        this.buttonMode = true;
        this.interactive = true;

        this.anchor.set(0.5, 0.5);
        this.scale.set(0.5, 0.5);
        this.position.set(750, 50);

        this.handleEvents(
            playButtonTexture,
            playButtonHoverTexture,
            muteButtonTexture,
            muteButtonHoverTexture
        );
    }

    private handleEvents(playTexture, playHoverTexture, muteTexture, muteHoverTexture) {
        this.on('pointertap', () => {
            const soundState = this.soundService.getSoundState();
            this.soundService.playButtonClick();

            if (soundState === SoundState.playing) {
                this.texture = muteHoverTexture;
            }
            else {
                this.texture = playHoverTexture;
            }

            this.soundService.toggleSound();
        })

        this.on('pointerover', () => {
            const soundState = this.soundService.getSoundState();
            if (soundState === SoundState.playing)
                this.texture = playHoverTexture;
            else
                this.texture = muteHoverTexture;
        });

        this.on('pointerout', () => {
            const soundState = this.soundService.getSoundState();
            if (soundState === SoundState.playing)
                this.texture = playTexture;
            else
                this.texture = muteTexture;
        });
    }
}