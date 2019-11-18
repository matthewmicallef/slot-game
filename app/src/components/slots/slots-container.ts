import { Container } from 'pixi.js';
import { Slot } from './slot';
import { SlotService } from '../../services/slot-service';
import { SpriteService } from '../../services/sprite-service';

export class SlotsContainer extends Container {
  private slotService: SlotService;
  private spriteService: SpriteService;

  constructor(
    numberOfSlots: number, 
    radius: number,
    slotService: SlotService,
    spriteService: SpriteService
  ) {
    super();

    this.slotService = slotService;
    this.spriteService = spriteService;

    this.createSlots(numberOfSlots, radius);
  }

  createSlots(numberOfSlots: number, radius: number) {    
    for (let slotCount = 0; slotCount < numberOfSlots; slotCount += 1) {
      this.addChild(new Slot(slotCount, numberOfSlots, radius, this.slotService, this.spriteService));
    }
  }
}
