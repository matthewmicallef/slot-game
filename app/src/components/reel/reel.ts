import { Container } from 'pixi.js';
import { TweenLite, Power4, TimelineMax, Back, Linear } from 'gsap';
import { GAME_CONFIG } from '../game-config';
import { ReelBackground } from './reel-background';
import { SlotsContainer } from '../slots/slots-container';
import { randomNumberFromRange } from '../components/utils/randon-number';
import { ReelProps } from './reel.model';
import { SlotService } from '../slots/slot-service';

export class Reel extends Container {
  private slotCount: number;
  private slotService: SlotService;

  constructor(
    reel: ReelProps
  ) {
    super();

    this.slotService = new SlotService();
    this.slotCount = this.getSlotCount(reel.radius);

    this.addChild(new ReelBackground(reel.radius, reel.colour));
    this.addChild(new SlotsContainer(this.slotCount, reel.radius, this.slotService));

    this.pivot.set(GAME_CONFIG.centerPoints.x, GAME_CONFIG.centerPoints.y);
    this.position.set(GAME_CONFIG.centerPoints.x, GAME_CONFIG.centerPoints.y);
  }

  /* eslint-disable class-methods-use-this */
  spin() {
    console.log('all', this.slotService.getAll());
    console.log('start spinning');

    const slotToLandOn = randomNumberFromRange(0, this.slotCount - 1);
    console.log("slot", slotToLandOn);
    const slotValueLandedOn = this.slotService.getValueFromSlotPosition(slotToLandOn);
    console.log("landed on", slotValueLandedOn);

    const factionOfCircle = slotToLandOn / this.slotCount;
    const landingAngle = factionOfCircle * Math.PI * 2;
    let finalRotation = landingAngle + Math.PI;

    const tl = new TimelineMax();
    tl.to(this, 2, {
      rotation: - finalRotation,
      ease: Back.easeOut.config(1)
    });
    TweenLite.to(tl, 4, { timeScale: 0, ease: Linear.easeNone, delay: 1 });
  }

  private getSlotCount(radius): number {
    const roundedCircumference = Math.round(radius * 2 * Math.PI);
    return Math.round(roundedCircumference / GAME_CONFIG.reel.width);
  }
}
