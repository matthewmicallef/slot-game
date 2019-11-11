import { Container, Text, Sprite } from 'pixi.js';
import { Circle } from '../utils/circle';
import { GAME_CONFIG } from '../../game-config';
import { ReelService } from '../../reel/reel-service';

export class SpinButton extends Container {
  private spinning: boolean;
  private buttonText: Text;
  private reelService: ReelService;

  constructor(
    reelService: ReelService
  ) {
    super();
    this.spinning = false;
    this.interactive = true;
    this.buttonMode = true;

    this.reelService = reelService;

    this.createBackground();

    this.createText();

    this.on('pointertap', this.handleTap.bind(this));
  }

  createBackground() {
    const buttonBackground = new Sprite(
      new Circle(
        GAME_CONFIG.centerButton.radius,
        GAME_CONFIG.centerButton.colour,
      ).generateCanvasTexture(),
    );

    buttonBackground.anchor.set(0.5, 0.5);
    buttonBackground.position.set(GAME_CONFIG.centerPoints.x, GAME_CONFIG.centerPoints.y);

    this.addChild(buttonBackground);
  }

  createText() {
    this.buttonText = new Text('Spin', GAME_CONFIG.spinButton.style);

    this.buttonText.anchor.set(0.5, 0.5);
    this.buttonText.position.set(
      GAME_CONFIG.centerPoints.x,
      GAME_CONFIG.centerPoints.y,
    );

    this.addChild(this.buttonText);
  }

  handleTap() {
    if (this.spinning) {
      return;
    } else {
      this.spin();
    }
  }

  spin() {
    this.spinning = true;

    this.reelService.getReel().spin();

    this.spinning = false;
  }
}
