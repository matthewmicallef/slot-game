import { Container, Sprite, Texture, Graphics } from "pixi.js";
import { GAME_CONFIG } from "../../game-config";

export class SplashScene extends Container {
    private inputElement: HTMLInputElement;
    private continueButton: Sprite;

    constructor() {
        super();

        this.createBackground();
        this.createTextBox();
        this.createContinueButton();
    }

    removeTextBox() {
        document.body.removeChild(this.inputElement);
    }

    private createBackground() {
        const background = new Sprite(Texture.fromImage('./assets/splash-background.png'));
        background.anchor.set(0.5, 0.5);
        background.position.set(400, 225);
        background.scale.set(0.75, 0.75);

        this.addChild(background);
    }

    private createContinueButton() {
        const continueButtonTexture = Texture.fromImage('./assets/button-load.png');
        const continueButtonHoverTexture = Texture.fromImage('./assets/button-load-hover.png');

        this.continueButton = new Sprite(continueButtonTexture);
    
        this.continueButton.anchor.set(0.5, 0.5);
        this.continueButton.position.set(GAME_CONFIG.centerPoints.x, GAME_CONFIG.centerPoints.y + 275);
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
            const input = this.inputElement.valueAsNumber;
            this.handleClick(input);
        });

        this.addChild(this.continueButton);
    }

    private createTextBox() {
        this.createTextboxBackground();
        this.createInputElement();
    }

    private handleClick(requiredBalance: number) {
        dispatchEvent(new CustomEvent('continue-to-game', { detail: { requiredBalance: requiredBalance }}));
    }

    private createInputElement() {
        const input = document.createElement('input');
        input.type = 'number';
        input.style.position = 'absolute';
        input.style.top = '425px';
        input.style.left = '370px';
        input.style.background = 'transparent';
        input.style.border = 'none';
        input.style.outlineWidth = '0';
        input.style.color = 'black';
        input.style.caretColor = 'black';

        input.oninput = () => this.checkInputContent();

        this.inputElement = document.body.appendChild(input);
    }

    private checkInputContent() {
        if (this.inputElement.valueAsNumber > 0) {
            this.continueButton.interactive = true;
            return;
        }

        this.continueButton.interactive = false;
    }

    private createTextboxBackground() {
        this.addChild(
            new Graphics()
                .beginFill(0xF9D24C)
                .drawRect(315, 416, 173, 21)
                .endFill()
        );
    }
}