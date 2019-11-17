import * as snd from 'pixi-sound';

export class SoundService {
    private sceneSound: snd.default.Sound;

    constructor() {
    }

    playButtonClick() {
        const sound = snd.default.Sound.from('./assets/sounds/button-click.mp3');
        sound.play();
    }

    playWinSound() {
        this.sceneSound = snd.default.Sound.from('./assets/sounds/chime.mp3');
        this.sceneSound.play();
    }

    playSplashSceneSound() {
        this.sceneSound = snd.default.Sound.from('./assets/sounds/splash-screen.mp3');
        this.sceneSound.play();
    }

    playGameSceneSound() {
        this.sceneSound = snd.default.Sound.from('./assets/sounds/game-play.mp3');
        this.sceneSound.loop = true;
        this.sceneSound.volume = 0.25;
        this.sceneSound.play();
    }

    stopSceneSound() {
        if (this.sceneSound)
            this.sceneSound.stop();
    }
}