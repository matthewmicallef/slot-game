import { loader, Texture, Sprite } from "pixi.js";
import { GAME_CONFIG } from "../game-config";

export class SpriteService {
    private spritesheet: any;

    constructor() {
        this.spritesheet = loader.resources[GAME_CONFIG.pathToGameAssets].textures;
    }

    getTexture(name: string): Texture {
        return this.spritesheet[name];
    }

    getSprite(name: string): Sprite {
        return new Sprite(this.spritesheet[name]);
    }
 }