import { Container } from 'pixi.js';
import { TweenLite, Power4 } from 'gsap';
import { GAME_CONFIG } from '../game-config';
import { ReelBackground } from './reel-background';
import { SlotsContainer } from '../slots/slots-container';
import { randomNumberFromRange } from '../components/utils/randon-number';
import { ReelProps } from './reel.model';
import { SlotService } from '../slots/slot-service';

export class Reel extends Container {
  private numOfSlots: number;
  private slotService: SlotService;

  constructor(
    reel: ReelProps
  ) {
    super();

    this.slotService = new SlotService();

    this.numOfSlots = this.getReelSlotCount(reel.radius);

    this.addChild(new ReelBackground(reel.radius, reel.colour));
    this.addChild(new SlotsContainer(this.numOfSlots, reel.radius, this.slotService));

    this.pivot.set(GAME_CONFIG.centerPoints.x, GAME_CONFIG.centerPoints.y);
    this.position.set(GAME_CONFIG.centerPoints.x, GAME_CONFIG.centerPoints.y);
  }

  /* eslint-disable class-methods-use-this */
  spin() {
    console.log('start spinning');

    const sectorToLandOn = randomNumberFromRange(0, this.numOfSlots - 1);

    const slotValueLandedOn = this.slotService.getValueFromSlotPosition(sectorToLandOn);
    console.log("landed on", slotValueLandedOn);

    const factionOfCircle = sectorToLandOn / this.numOfSlots;
    const landingAngle = factionOfCircle * Math.PI * 2;
    let finalRotation = landingAngle + Math.PI;

    TweenLite.to(this, 4, {
      rotation: - finalRotation,
      ease: Power4.easeInOut,
    });
  }

  private getReelSlotCount(radius): number {
    const roundedCircumference = Math.round(radius * 2 * Math.PI);
  
    return Math.round(roundedCircumference / GAME_CONFIG.reel.width);
  }
}
