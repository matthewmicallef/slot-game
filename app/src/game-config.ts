import { ReelProps } from "./reel/reel.model";
import { WinGridProps } from "./components/win-grid/win-grid.model";
import { SpinButtonProps } from "./components/spin-button/spin-button.model";

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

export interface GameCenterPoints {
  x: number;
  y: number;
}

export interface GameCenterButton {
  radius: number;
  colour: number;
}

export interface GameConfig {
  canvas: Measurement;
  centerPoints: GameCenterPoints;
  centerButton: GameCenterButton;
  reel: ReelProps;
  pathToSymbolAssets: string;
  symbolsSize: Measurement;
  spinButton: SpinButtonProps;
  winGrid: WinGridProps;
}

export const GAME_CONFIG: GameConfig = {
  canvas: {
    width: 800,
    height: 800,
  },
  centerPoints: {
    x: 400,
    y: 400,
  },
  centerButton: {
    radius: 50,
    colour: 0xffffff,
  },
  reel: {
    width: 60,
    radius: 300,
    colour: 0x030E94,
    maxSpeed: 2,
    speedIncrease: 0.1,
    speedIncreaseTime: 200,
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
      align: 'center',
    },
  },
  winGrid: {
    width: 200,
    height: 120,
    colour: 0x585659,
    lineSize: 3,
    rows: 3,
  },
};