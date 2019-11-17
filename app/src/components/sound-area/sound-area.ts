import { Sprite, Texture } from "pixi.js";
import * as snd from 'pixi-sound';
import { SoundService } from "../../services/sound-service";

enum SoundState {
    playing = 1,
    muted
}

export class SoundArea extends Sprite {
    private soundState: SoundState;
    private soundService: SoundService;

    constructor(
        soundService: SoundService
    ) {
        const playButtonTexture = Texture.fromImage('./assets/sound-play.png');
        const playButtonHoverTexture = Texture.fromImage('./assets/sound-play-hover.png');
        const muteButtonTexture = Texture.fromImage('./assets/sound-mute.png');
        const muteButtonHoverTexture = Texture.fromImage('./assets/sound-mute-hover.png');

        super(playButtonTexture);

        this.soundService = soundService;

        this.buttonMode = true;
        this.interactive = true;

        this.anchor.set(0.5, 0.5);
        this.scale.set(0.5, 0.5);
        this.position.set(750, 50);

        this.soundState = SoundState.playing;
        this.handleEvents(
            playButtonTexture,
            playButtonHoverTexture,
            muteButtonTexture,
            muteButtonHoverTexture
        );
    }

    private handleEvents(playTexture, playHoverTexture, muteTexture, muteHoverTexture) {
        this.on('pointertap', () => {
            this.soundService.playButtonClick();
            snd.default.togglePauseAll();
            if (this.soundState === SoundState.playing) {
                this.soundState = SoundState.muted;
                this.texture = muteHoverTexture;
            }
            else {
                this.soundState = SoundState.playing;
                this.texture = playHoverTexture;
            }
        })

        this.on('pointerover', () => {
            if (this.soundState === SoundState.playing)
                this.texture = playHoverTexture;
            else
                this.texture = muteHoverTexture;
        });

        this.on('pointerout', () => {
            if (this.soundState === SoundState.playing)
                this.texture = playTexture;
            else
                this.texture = muteTexture;
        });
    }
}