import { Container, Sprite, Texture, Graphics, Text, DisplayObject } from "pixi.js";
import { GAME_CONFIG } from "../../game-config";

export class SplashScene extends Container {
    private continueButton: Sprite;

    constructor() {
        super();

        this.createBackground();
        this.createTextBox();
        this.createContinueButton();
    }

    removeTextBox() {
        const gameContainerElement = document.getElementsByClassName('game-container')[0];
        const balanceInputElement = document.getElementsByTagName('input')[0];        
        gameContainerElement.removeChild(balanceInputElement);
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
        this.continueButton.position.set(GAME_CONFIG.centerPoints.x, GAME_CONFIG.centerPoints.y + 287);
        this.continueButton.scale.set(0.4, 0.4);
        this.continueButton.buttonMode = true;
        this.continueButton.interactive = false;

        this.continueButton.on('pointerover', () => {
            this.continueButton.texture = continueButtonHoverTexture;
        });

        this.continueButton.on('pointerout', () => {
            this.continueButton.texture = continueButtonTexture;
        });

        this.continueButton.on('pointertap', () => this.handleClick(this.getInputValue()));

        this.addChild(this.continueButton);
    }

    private createTextBox() {
        this.createTextboxBackground();
        this.createTextboxTitle();
        this.createInputElement();
    }

    private handleClick(requiredBalance: number) {
        dispatchEvent(new CustomEvent('load-game', { detail: { requiredBalance: requiredBalance }}));
    }

    private createTextboxTitle() {
        const inputTitle = new Text('Enter Required Balance:', {
            fontSize: 18,
            fill: 0xffffff
        });

        inputTitle.anchor.set(0.5, 0.5);
        inputTitle.position.set(GAME_CONFIG.centerPoints.x, 420);

        this.addChild(inputTitle);
    }

    private createInputElement() {
        const gameContainerElement = document.getElementsByClassName('game-container')[0];

        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'balance-input';
        input.style.position = 'relative';
        input.style.width = '170px';
        input.style.height = '30px';
        input.style.top = '473px';
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
                .drawRect(316, 441, 170, 32)
                .endFill()
        );
    }

    private getInputValue() {
        return document.getElementsByTagName('input')[0].valueAsNumber;
    }
}