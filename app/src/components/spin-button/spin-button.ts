import { Sprite, Texture } from 'pixi.js';
import * as snd from 'pixi-sound';
import { ReelService } from '../../services/reel-service';
import { BetService } from '../../services/bet-service';

export class SpinButton extends Sprite {
  private spinning: boolean;
  private reelService: ReelService;
  private betService: BetService;

  constructor(
    reelService: ReelService,
    betService: BetService
  ) {
    const spinButtonTexture = Texture.fromImage('./assets/button-reload.png');
    const spinButtonHoverTexture = Texture.fromImage('./assets/button-reload-hover.png');

    super(spinButtonTexture);

    this.spinning = false;
    this.buttonMode = true;

    this.reelService = reelService;
    this.betService = betService;

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
        // TODO: FIX SOUND
        const x = snd.default.Sound.from('./assets/sounds/button-click.mp3');
        x.play();
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
