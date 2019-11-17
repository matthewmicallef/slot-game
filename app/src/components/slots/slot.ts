import { Sprite, loader } from 'pixi.js';
import { GAME_CONFIG } from '../../game-config';
import { randomNumberFromRange } from '../../utils/randon-number';
import { SlotService } from '../../services/slot-service';

export class Slot extends Sprite {
  constructor(
    currentSlotCount: number,
    numberOfSlots: number,
    radius: number,
    slotService: SlotService
  ) {
    const symbols = loader.resources[GAME_CONFIG.pathToSymbolAssets].textures;
    const slotNumber = randomNumberFromRange(0, GAME_CONFIG.slotValues.length - 1, GAME_CONFIG.slotValues);
    const texture = symbols[`number-${slotNumber}.png`];
    super(texture);

    slotService.addValueInSlot(slotNumber);

    const radiansPerSlot = (2 * Math.PI) / numberOfSlots;

    const rotation = currentSlotCount * radiansPerSlot;
    const symbolAnchorPercentage = (radius - GAME_CONFIG.reel.width / 2) / radius;

    this.anchor.set(0.5, 0.5);
    this.rotation = rotation + Math.PI;
    this.height = GAME_CONFIG.symbolsSize.height;
    this.width = GAME_CONFIG.symbolsSize.width;

    this.position.x = GAME_CONFIG.reelCenterPoints.x + radius * symbolAnchorPercentage * Math.cos(rotation);
    this.position.y = GAME_CONFIG.reelCenterPoints.y + radius * symbolAnchorPercentage * Math.sin(rotation);
  }
}
