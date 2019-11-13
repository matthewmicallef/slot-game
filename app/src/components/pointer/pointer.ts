import { Sprite, Graphics } from "pixi.js";
import { Points } from "../../game-config";

export class Pointer extends Sprite {
    constructor() {
        const initialPoints: Points = {
            x: 170,
            y: 250
        };    
        super(
            new Graphics()
                .beginFill(0xFF3300)
                .lineStyle(4, 0xffffff, 1)
                .moveTo(initialPoints.x, initialPoints.y)
                .lineTo(initialPoints.x + 50, initialPoints.y + 25)
                .lineTo(initialPoints.x, initialPoints.y + 50)
                .lineTo(initialPoints.x, initialPoints.y)
                .endFill()
                .generateCanvasTexture()
        );

        this.anchor.set(0.5, 0.5);
        this.position.set(initialPoints.x, initialPoints.y);
    }
}