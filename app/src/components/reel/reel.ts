import { Container, Texture, Sprite } from 'pixi.js';
import { TweenLite, TimelineMax, Back, Linear, Power1 } from 'gsap';
import { GAME_CONFIG } from '../../game-config';
import { SlotsContainer } from '../slots/slots-container';
import { randomNumberFromRange } from '../../utils/randon-number';
import { SlotService } from '../../services/slot-service';

export class Reel extends Container {
  private slotCount: number;
  private slotService: SlotService;
  private slotValueLandedOn: number;

  constructor() {
    super();

    this.slotService = new SlotService();
    this.slotCount = this.getSlotCount();

    this.createBackground();
    this.addChild(new SlotsContainer(this.slotCount, GAME_CONFIG.reel.radius, this.slotService));

    this.pivot.set(GAME_CONFIG.reel.centerPoints.x, GAME_CONFIG.reel.centerPoints.y);
    this.position.set(GAME_CONFIG.reel.centerPoints.x, GAME_CONFIG.reel.centerPoints.y);
  }

  spin() {
    const slotToLandOn = randomNumberFromRange(0, this.slotCount - 1);
    this.slotValueLandedOn = this.slotService.getValueFromSlotPosition(slotToLandOn);

    const factionOfCircle = slotToLandOn / this.slotCount;
    const landingAngle = factionOfCircle * Math.PI * 2;
    let finalRotation = landingAngle + Math.PI;

    TweenLite.set(this, {
      duration: 10,
      rotation: 12
    });

    TweenLite.to(this, 7, {
      timeScale: 0,
      rotation: - finalRotation,
      ease: Back.easeOut.config(1),
      onComplete: () => this.notifySpinComplete()
    });
  }

  notifySpinComplete() {
    dispatchEvent(new CustomEvent('spin-complete', { detail: { slotResult: this.slotValueLandedOn } }));
  }

  private createBackground() {
    const texture = Texture.fromImage('./assets/reel.png');
    const sprite = new Sprite(texture);

    sprite.anchor.set(0.5, 0.5);
    sprite.position.set(GAME_CONFIG.reel.centerPoints.x, GAME_CONFIG.reel.centerPoints.y);
    sprite.scale.set(0.35, 0.35);

    this.addChild(sprite);
  }

  private getSlotCount(): number {
    const roundedCircumference = Math.round(GAME_CONFIG.reel.radius * 2 * Math.PI);
    return Math.round(roundedCircumference / GAME_CONFIG.reel.slotWidth);
  }
}
