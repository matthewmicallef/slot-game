import { Container, Sprite, Texture, Graphics, Text } from "pixi.js";
import { GAME_CONFIG } from "../../game-config";
import { SoundService } from "../../services/sound-service";

const INPUT_PLACEHOLDER_TAG_NAME = 'input-placeholder';

export class SplashScene extends Container {
    private continueButton: Sprite;
    private soundService: SoundService;

    constructor(
        soundService: SoundService
    ) {
        super();

        this.soundService = soundService;
        this.soundService.playSplashSceneSound();

        this.createBackground();
        this.createTextBox();
        this.createContinueButton();
    }

    removeTextBox() {
        const gameContainerElement = document.getElementsByClassName(INPUT_PLACEHOLDER_TAG_NAME)[0];
        const balanceInputElement = document.getElementsByTagName('input')[0];
        gameContainerElement.removeChild(balanceInputElement);
    }

    private createBackground() {
        const background = new Sprite(Texture.fromImage('./assets/splash-background.png'));
        background.anchor.set(0.5, 0.5);
        background.position.set(400, 200);
        background.scale.set(1.3, 1.3);

        this.addChild(background);
    }

    private createContinueButton() {
        const continueButtonTexture = Texture.fromImage('./assets/button-load.png');
        const continueButtonHoverTexture = Texture.fromImage('./assets/button-load-hover.png');

        this.continueButton = new Sprite(continueButtonTexture);

        this.continueButton.anchor.set(0.5, 0.5);
        this.continueButton.position.set(GAME_CONFIG.canvasCenterPoints.x, GAME_CONFIG.canvasCenterPoints.y + 230);
        this.continueButton.scale.set(0.4, 0.4);
        this.continueButton.buttonMode = true;
        this.continueButton.interactive = false;

        this.continueButton.on('pointerover', () => {
            this.continueButton.texture = continueButtonHoverTexture;
        });

        this.continueButton.on('pointerout', () => {
            this.continueButton.texture = continueButtonTexture;
        });

        this.continueButton.on('pointertap', () => {
            this.soundService.playButtonClick();
            this.handleClick(this.getInputValue());
        });

        this.addChild(this.continueButton);
    }

    private createTextBox() {
        this.createTextboxBackground();
        this.createTextboxTitle();
        this.createInputElement();
    }

    private handleClick(requiredBalance: number) {
        dispatchEvent(new CustomEvent('load-game', { detail: { requiredBalance: requiredBalance } }));
    }

    private createTextboxTitle() {
        const inputTitle = new Text('Enter Required Balance:', {
            fontSize: 18,
            fill: 0xffffff
        });

        inputTitle.anchor.set(0.5, 0.5);
        inputTitle.position.set(GAME_CONFIG.canvasCenterPoints.x, GAME_CONFIG.canvasCenterPoints.y + 100);

        this.addChild(inputTitle);
    }

    private createInputElement() {
        const gameContainerElement = document.getElementsByClassName(INPUT_PLACEHOLDER_TAG_NAME)[0];

        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'balance-input';
        input.style.position = 'relative';
        input.style.width = '170px';
        input.style.height = '30px';
        input.style.top = `${GAME_CONFIG.canvasCenterPoints.y + 130}px`;
        input.style.left = '315px';
        input.style.background = 'transparent';
        input.style.border = 'none';
        input.style.outlineWidth = '0';
        input.style.color = 'black';
        input.style.caretColor = 'black';
        input.style.fontSize = '20px';

        input.oninput = () => this.checkInputContent();

        gameContainerElement.prepend(input);
    }

    private checkInputContent() {
        if (this.getInputValue() > 0) {
            this.continueButton.interactive = true;
            return;
        }

        this.continueButton.interactive = false;
    }

    private createTextboxBackground() {
        this.addChild(
            new Graphics()
                .beginFill(0xF9D24C)
                .drawRect(316, GAME_CONFIG.canvasCenterPoints.y + 130, 170, 32)
                .endFill()
        );
    }

    private getInputValue() {
        return document.getElementsByTagName('input')[0].valueAsNumber;
    }
}