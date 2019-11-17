import * as snd from 'pixi-sound';

export enum SoundState {
    playing = 1,
    muted
}

export class SoundService {
    private sceneSound: snd.default.Sound;
    private soundState: SoundState;

    constructor() {
        this.soundState = SoundState.playing;
    }

    playButtonClick() {
        const sound = snd.default.Sound.from('./assets/sounds/button-click.mp3');
        sound.play();
    }

    playWinSound() {
        this.sceneSound = snd.default.Sound.from('./assets/sounds/chime.mp3');
        this.sceneSound.play();
    }

    playCoinSound() {
        const sound = snd.default.Sound.from('./assets/sounds/coin.wav');
        this.sceneSound.volume = 0.5;
        sound.play();
    }

    playSplashSceneSound() {
        this.sceneSound = snd.default.Sound.from('./assets/sounds/splash-screen.mp3');
        this.sceneSound.loop = true;
        this.sceneSound.volume = 0.25;
        this.sceneSound.play();
    }

    playGameSceneSound() {
        this.sceneSound = snd.default.Sound.from('./assets/sounds/game-play.mp3');
        this.sceneSound.loop = true;
        this.sceneSound.volume = 0.25;
        this.sceneSound.play();
    }

    stopSceneSound() {
        this.sceneSound.stop();
    }

    toggleSound() {
        snd.default.toggleMuteAll();

        if (this.soundState === SoundState.playing)
            this.soundState = SoundState.muted;
        else
            this.soundState = SoundState.playing;
    }

    getSoundState() {
        return this.soundState;
    }
}