import { Container, Text, Sprite, Graphics } from 'pixi.js';
import { GAME_CONFIG } from '../../game-config';
import { ReelService } from '../reel/reel-service';

export class SpinButton extends Container {
  private spinning: boolean;
  private buttonText: Text;
  private reelService: ReelService;
  private circle: Graphics;

  constructor(
    reelService: ReelService
  ) {
    super();
    this.spinning = false;
    this.interactive = true;
    this.buttonMode = true;
    this.circle = new Graphics;

    this.reelService = reelService;

    this.createBackground();
    this.createText();
    this.on('click', this.handleTap.bind(this));
  }

  spinComplete() {
    this.interactive = true;
    this.spinning = false;
    this.enableButton();
  }

  private handleTap() {
    if (this.spinning) {
      return;
    } else {
      this.spin();
    }
  }

  private spin() {
    this.spinning = true;
    this.reelService.getReel().spin(() => this.spinComplete());

    this.disableButton();
  }

  private disableButton() {
    this.circle
      .beginFill(0x000000)
      .lineStyle(2, 0x000000)
      .drawCircle(GAME_CONFIG.centerPoints.x, GAME_CONFIG.centerPoints.y, GAME_CONFIG.centerButton.radius)
      .endFill();
  }

  private enableButton() {
    this.circle
      .beginFill(0xffffff)
      .lineStyle(2, 0x000000)
      .drawCircle(GAME_CONFIG.centerPoints.x, GAME_CONFIG.centerPoints.y, GAME_CONFIG.centerButton.radius)
      .endFill();
  }

  private createBackground() {
    this.circle
      .beginFill(0xffffff)
      .lineStyle(2, 0x000000)
      .drawCircle(GAME_CONFIG.centerPoints.x, GAME_CONFIG.centerPoints.y, GAME_CONFIG.centerButton.radius)
      .endFill();

    // const buttonBackground = new Sprite(
    //   new Circle(
    //     GAME_CONFIG.centerButton.radius,
    //     GAME_CONFIG.centerButton.colour,
    //   ).generateCanvasTexture(),
    // );

    // buttonBackground.anchor.set(0.5, 0.5);
    // buttonBackground.position.set(GAME_CONFIG.centerPoints.x, GAME_CONFIG.centerPoints.y);

    this.addChild(this.circle);
  }

  private createText() {
    this.buttonText = new Text('Spin', GAME_CONFIG.spinButton.style);

    this.buttonText.anchor.set(0.5, 0.5);
    this.buttonText.position.set(
      GAME_CONFIG.centerPoints.x,
      GAME_CONFIG.centerPoints.y,
    );

    this.addChild(this.buttonText);
  }
}
