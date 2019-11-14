import { Sprite, Texture } from 'pixi.js';
import { GAME_CONFIG } from '../../game-config';
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
    this.position.set(GAME_CONFIG.centerPoints.x, GAME_CONFIG.centerPoints.y);
    this.scale.set(0.4, 0.4);

    this.disableButton();
    this.handleEvents(spinButtonTexture, spinButtonHoverTexture);
  }

  spinComplete() {
    this.spinning = false;
  }

  private handleClick() {
    if (this.spinning) {
      return;
    } else {
      this.spin();
    }
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
    this.on('pointertap', () => this.handleClick());

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
