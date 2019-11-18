import { Sprite, Texture } from 'pixi.js';
import { ReelService } from '../../services/reel-service';
import { BetService } from '../../services/bet-service';
import { SoundService } from '../../services/sound-service';
import { SpriteService } from '../../services/sprite-service';

export class SpinButton extends Sprite {
  private spinning: boolean;
  private reelService: ReelService;
  private betService: BetService;
  private soundService: SoundService;

  constructor(
    reelService: ReelService,
    betService: BetService,
    soundService: SoundService,
    spriteService: SpriteService
  ) {
    const spinButtonTexture = spriteService.getTexture('button-reload');
    const spinButtonHoverTexture = spriteService.getTexture('button-reload-hover');

    super(spinButtonTexture);

    this.spinning = false;
    this.buttonMode = true;

    this.reelService = reelService;
    this.betService = betService;
    this.soundService = soundService;

    this.anchor.set(0.5, 0.5);
    this.position.set(100, 535);
    this.scale.set(0.3, 0.3);

    this.disableButton();
    this.handleEvents(spinButtonTexture, spinButtonHoverTexture);
  }

  spinComplete() {
    this.spinning = false;
  }

  private spin() {
    this.betService.placeBets();

    this.spinning = true;
    this.reelService.getReel().spin();

    this.disableButton();
    dispatchEvent(new Event('spinning'));
  }

  private disableButton() {
    this.interactive = false;
  }

  private enableButton() {
    this.interactive = true;
  }

  private handleEvents(texture: Texture, hoverTexture: Texture) {
    this.on('pointertap', () => {
      if (this.spinning) {
        return;
      } else {
        this.soundService.playButtonClick();
        this.texture = texture;
        this.spin();
      }
    });

    this.on('pointerover', () => {
      this.texture = hoverTexture;
    });

    this.on('pointerout', () => {
      this.texture = texture;
    });

    addEventListener('bet-registered', (event: any) => {
      if (event.detail.betCount === 1) {
        this.enableButton();
      }
    }, false);
    addEventListener('bets-cleared', () => this.disableButton(), false);
    addEventListener('spin-complete', () => this.spinComplete(), false);
  }
}
