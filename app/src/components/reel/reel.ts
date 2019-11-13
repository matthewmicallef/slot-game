import { Container } from 'pixi.js';
import { TweenLite, TimelineMax, Back, Linear } from 'gsap';
import { GAME_CONFIG } from '../../game-config';
import { ReelBackground } from './reel-background';
import { SlotsContainer } from '../slots/slots-container';
import { randomNumberFromRange } from '../../utils/randon-number';
import { ReelProps } from './reel.model';
import { SlotService } from '../../services/slot-service';
import { SpinButton } from '../spin-button/spin-button';

export class Reel extends Container {
  private slotCount: number;
  private slotService: SlotService;
  private slotValueLandedOn: number;

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
    this.slotValueLandedOn = this.slotService.getValueFromSlotPosition(slotToLandOn);
    console.log("landed on", this.slotValueLandedOn);

    const factionOfCircle = slotToLandOn / this.slotCount;
    const landingAngle = factionOfCircle * Math.PI * 2;
    let finalRotation = landingAngle + Math.PI;

    // const tl = new TimelineMax();
    TweenLite.to(this, 4, {
      rotation: - finalRotation,
      ease: Back.easeOut.config(1),
      onComplete: () => this.notifySpinComplete()
    });
  }

  notifySpinComplete() {
    dispatchEvent(new CustomEvent('spin-complete', { detail: { slotResult: this.slotValueLandedOn }}));
  }

  private getSlotCount(radius): number {
    const roundedCircumference = Math.round(radius * 2 * Math.PI);
    return Math.round(roundedCircumference / GAME_CONFIG.reel.width);
  }
}
