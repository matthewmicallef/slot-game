import { Sprite, Texture } from "pixi.js";
import { Points, GAME_CONFIG } from "../../game-config";
import { SpriteService } from "../../services/sprite-service";

export class Pointer extends Sprite {
    constructor(
        spriteService: SpriteService
    ) {
        const initialPoints: Points = { x: 170, y: GAME_CONFIG.reel.centerPoints.y };
        const texture = spriteService.getTexture('pointer');
        super(texture);

        this.rotation = Math.PI / 2;
        this.anchor.set(0.5, 0.5);
        this.position.set(initialPoints.x, initialPoints.y);
        this.scale.set(0.8, 0.8);
    }
}