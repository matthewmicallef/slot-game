import { ReelProps } from "./components/reel/reel.model";
import { SpinButtonProps } from "./components/spin-button/spin-button.model";
import { BalanceProps } from "./components/balance/balance.model";

export interface ComponentStyle {
  fontFamily: string;
  fontSize: number;
  fill: number;
  align: string;
}

export interface Measurement {
  width: number;
  height: number;
}

export interface Points {
  x: number;
  y: number;
}

export interface GameCenterButton {
  radius: number;
  colour: number;
}

export interface GameConfig {
  canvas: Measurement;
  canvasCenterPoints: Points;
  centerButton: GameCenterButton;
  reel: ReelProps;
  pathToSymbolAssets: string;
  symbolsSize: Measurement;
  spinButton: SpinButtonProps;
  balance: BalanceProps;
  slotValues: number[];
}

export const GAME_CONFIG: GameConfig = {
  canvas: {
    width: 800,
    height: 600,
  },
  canvasCenterPoints: {
    x: 400,
    y: 300,
  },
  centerButton: {
    radius: 50,
    colour: 0xffffff,
  },
  reel: {
    slotWidth: 60,
    radius: 200,
    colour: 0x030E94,
    maxSpeed: 2,
    speedIncrease: 0.1,
    speedIncreaseTime: 200,
    centerPoints: {
      x: 400,
      y: 275
    }
  },
  pathToSymbolAssets: './assets/slot-numbers.json',
  symbolsSize: {
    width: 25,
    height: 25,
  },
  spinButton: {
    style: {
      fontFamily: 'Arial',
      fontSize: 34,
      fill: 0xff1010,
      align: 'center'
    },
  },
  balance: {
    style: {
      fontFamily: 'Arial',
      fontSize: 20,
      fill: 0xffffff,
      align: 'center',
    },
    position: {
      x: 100,
      y: 40
    }
  },
  slotValues: [1, 2, 4, 6, 7, 9]
};