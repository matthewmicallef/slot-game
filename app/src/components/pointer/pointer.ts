import { Sprite, Texture } from "pixi.js";
import { Points, GAME_CONFIG } from "../../game-config";

export class Pointer extends Sprite {
    constructor() {
        const initialPoints: Points = { x: 170, y: GAME_CONFIG.reelCenterPoints.y };
        const texture = Texture.fromImage('./assets/pointer.png')
        super(texture);

        this.rotation = Math.PI / 2;
        this.anchor.set(0.5, 0.5);
        this.position.set(initialPoints.x, initialPoints.y);
        this.scale.set(0.8, 0.8);
    }
}