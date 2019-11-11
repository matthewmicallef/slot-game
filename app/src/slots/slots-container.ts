import { Container } from 'pixi.js';
import { Slot } from './slot';
import { SlotService } from './slot-service';

export class SlotsContainer extends Container {
  private slotService: SlotService;

  constructor(
    numberOfSlots: number, 
    radius: number,
    slotService: SlotService
  ) {
    super();

    this.slotService = slotService;

    this.createSlots(numberOfSlots, radius);
  }

  createSlots(numberOfSlots: number, radius: number) {
    for (let slotCount = 0; slotCount < numberOfSlots; slotCount += 1) {
      this.addChild(new Slot(slotCount, numberOfSlots, radius, this.slotService));
    }
  }
}
