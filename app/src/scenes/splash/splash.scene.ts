import { Container, Sprite, Text } from "pixi.js";
import { GAME_CONFIG } from "../../game-config";
import { SoundService } from "../../services/sound-service";
import { SpriteService } from "../../services/sprite-service";

const INPUT_PLACEHOLDER_TAG_NAME = 'input-placeholder';

export class SplashScene extends Container {
    private continueButton: Sprite;
    private soundService: SoundService;
    private spriteService: SpriteService;

    constructor(
        soundService: SoundService,
        spriteService: SpriteService
    ) {
        super();

        this.soundService = soundService;
        this.spriteService = spriteService;

        this.soundService.playSplashSceneSound();

        this.createBackground();
        this.addCharacters();
        this.createTextBox();
        this.createContinueButton();
    }

    removeTextBox() {
        const gameContainerElement = document.getElementsByClassName(INPUT_PLACEHOLDER_TAG_NAME)[0];
        const balanceInputElement = document.getElementsByTagName('input')[0];
        gameContainerElement.removeChild(balanceInputElement);
    }

    private createBackground() {
        const background = new Sprite(this.spriteService.getTexture('splash-background'));
        background.anchor.set(0.5, 0.5);
        background.position.set(400, 120);
        background.scale.set(1.3, 1.3);

        this.addChild(background);
    }

    private createContinueButton() {
        const continueButtonTexture = this.spriteService.getTexture('button-load');
        const continueButtonHoverTexture = this.spriteService.getTexture('button-load-hover');

        this.continueButton = new Sprite(continueButtonTexture);

        this.continueButton.anchor.set(0.5, 0.5);
        this.continueButton.position.set(GAME_CONFIG.canvasCenterPoints.x, GAME_CONFIG.canvasCenterPoints.y + 210);
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
            fontSize: 25,
            fill: 0xC0AB69
        });

        inputTitle.anchor.set(0.5, 0.5);
        inputTitle.position.set(GAME_CONFIG.canvasCenterPoints.x, GAME_CONFIG.canvasCenterPoints.y - 30);

        this.addChild(inputTitle);
    }

    private createInputElement() {
        const gameContainerElement = document.getElementsByClassName(INPUT_PLACEHOLDER_TAG_NAME)[0];

        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'balance-input';
        input.style.top = `${GAME_CONFIG.canvasCenterPoints.y + 20}px`;
        input.style.left = '356px';

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
        const inputBackground = new Sprite(this.spriteService.getTexture('input-background'));

        inputBackground.anchor.set(0.5, 0.5);
        inputBackground.position.set(400, GAME_CONFIG.canvasCenterPoints.y + 68);
        this.addChild(inputBackground);
    }

    private getInputValue() {
        return document.getElementsByTagName('input')[0].valueAsNumber;
    }

    private addCharacters() {
        const guybrushTexture = this.spriteService.getTexture('guybrush');
        const guybrush = new Sprite(guybrushTexture);

        guybrush.anchor.set(0.5, 0.5);
        guybrush.position.set(
            GAME_CONFIG.canvasCenterPoints.x - 250,
            GAME_CONFIG.canvasCenterPoints.y
        );
        guybrush.scale.set(0.9, 0.9);

        const elainTexture = this.spriteService.getTexture('elaine');
        const elaine = new Sprite(elainTexture);

        elaine.anchor.set(0.5, 0.5);
        elaine.position.set(
            GAME_CONFIG.canvasCenterPoints.x + 250,
            GAME_CONFIG.canvasCenterPoints.y
        );
        elaine.scale.set(0.9, 0.9);

        this.addChild(guybrush);
        this.addChild(elaine);
    }
}