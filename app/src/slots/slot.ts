import { Sprite, loader } from 'pixi.js';
import { GAME_CONFIG } from '../game-config';
import { randomNumberFromRange } from '../components/utils/randon-number';
import { SlotService } from './slot-service';

export class Slot extends Sprite {
  constructor(
    currentSlotCount: number,
    numberOfSlots: number,
    radius: number,
    slotService: SlotService
  ) {
    const symbols = loader.resources[GAME_CONFIG.pathToSymbolAssets].textures;
    const slotNumber = randomNumberFromRange(0, 5);
    const texture = symbols[`number-${slotNumber}.png`];
    super(texture);

    slotService.addValueInSlot(slotNumber);

    const radianPerSector = (2 * Math.PI) / numberOfSlots;

    const rotation = currentSlotCount * radianPerSector;
    const symbolAnchorPercentage = (radius - GAME_CONFIG.reel.width / 2) / radius;

    this.anchor.set(0.5, 0.5);
    this.height = GAME_CONFIG.symbolsSize.height;
    this.width = GAME_CONFIG.symbolsSize.width;
    this.rotation = rotation + Math.PI;

    this.position.x = GAME_CONFIG.centerPoints.x + radius * symbolAnchorPercentage * Math.cos(rotation);
    this.position.y = GAME_CONFIG.centerPoints.y + radius * symbolAnchorPercentage * Math.sin(rotation);
  }
}
