import { Container, Text, Sprite, Graphics } from 'pixi.js';
import { GAME_CONFIG } from '../../game-config';
import { ReelService } from '../../services/reel-service';
import { BetService } from '../../services/bet-service';

export class SpinButton extends Container {
  private spinning: boolean;
  private reelService: ReelService;
  private betService: BetService;
  private circle: Graphics;

  constructor(
    reelService: ReelService,
    betService: BetService
  ) {
    super();
    this.spinning = false;
    this.buttonMode = true;
    this.circle = new Graphics;
    this.addChild(this.circle);

    this.reelService = reelService;
    this.betService = betService;

    this.disableButton();
    this.createText();
    this.on('click', () => this.handleClick());

    addEventListener('bet-registered', (event: any) => {
      if (event.detail.betCount === 1) {
        this.enableButton();
      }
    }, false);
    addEventListener('bets-cleared', () => this.disableButton(), false);
    addEventListener('spin-complete', () => this.spinComplete(), false);
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
    this.circle
      .beginFill(0x000000)
      .lineStyle(2, 0x000000)
      .drawCircle(GAME_CONFIG.centerPoints.x, GAME_CONFIG.centerPoints.y, GAME_CONFIG.centerButton.radius)
      .endFill();
  }

  private enableButton() {
    this.interactive = true;
    this.circle
      .beginFill(0xffffff)
      .lineStyle(2, 0x000000)
      .drawCircle(GAME_CONFIG.centerPoints.x, GAME_CONFIG.centerPoints.y, GAME_CONFIG.centerButton.radius)
      .endFill();
  }

  private createText() {
    const buttonText = new Text('Spin', GAME_CONFIG.spinButton.style);

    buttonText.anchor.set(0.5, 0.5);
    buttonText.position.set(
      GAME_CONFIG.centerPoints.x,
      GAME_CONFIG.centerPoints.y,
    );

    this.addChild(buttonText);
  }
}
