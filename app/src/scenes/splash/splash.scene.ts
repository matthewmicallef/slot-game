import { Container, Graphics } from "pixi.js";

export class SplashScene extends Container {
    constructor() {
        super();

        this.buttonMode = true;
        this.interactive = true;

        this.init();
        this.on('click', () => this.handleClick());
    }

    init() {
        // TODO: update splash scene
        this.addChild(
            new Graphics()
            .beginFill(0xffffff)
            .drawRect(100, 100, 100, 100)
            .endFill()
        )
    }

    private handleClick() {
        dispatchEvent(new Event('continue-to-game'));
    }
}