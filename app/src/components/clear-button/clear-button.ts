import { Container, Circle, Graphics, Text } from "pixi.js";
import { BetService } from "../../services/bet-service";
import { GAME_CONFIG } from "../../game-config";
import { BetArea } from "../bet-area/bet-area";

export class ClearButton extends Container {
    private betService: BetService;
    private betAreas: BetArea[];
    private circle: Graphics;

    constructor(
        betService: BetService,
        betAreas: BetArea[]
    ) {
        super();
        this.buttonMode = true;

        this.betService = betService;
        this.betAreas = betAreas;
        this.circle = new Graphics();

        this.createBackground();
        this.createText();
        this.on('click', () => this.handleClick());
        this.disableButton();

        addEventListener('bet-area-clicked', () => this.enableButton(), false);
        addEventListener('spin-complete', () => this.disableButton(), false);
        addEventListener('spinning', () => this.disableButton(), false);
    }

    private createBackground() {
        this.circle
            .beginFill(0xffffff)
            .lineStyle(2, 0x000000)
            .drawCircle(700, 525, 30)
            .endFill();

        this.addChild(this.circle);
    }

    private createText() {
        const buttonText = new Text('Clear', {
            fontFamily: 'Arial',
            fontSize: 18,
            fill: 0xff1010,
            align: 'center',
        });

        buttonText.anchor.set(0.5, 0.5);
        buttonText.position.set(700, 525);

        this.addChild(buttonText);
    }

    private handleClick() {
        if (!this.interactive)
            return;

        this.betService.resetBets();

        for (let i = 0; i < this.betAreas.length; i++) {
            this.betAreas[i].resetChipCount();
        }

        this.disableButton();
    }

    private disableButton() {
        this.interactive = false;
        this.circle
            .beginFill(0x000000)
            .lineStyle(2, 0x000000)
            .drawCircle(700, 525, 30)
            .endFill();
    }

    private enableButton() {
        this.interactive = true;
        this.circle
            .beginFill(0xffffff)
            .lineStyle(2, 0x000000)
            .drawCircle(700, 525, 30)
            .endFill();
    }
}