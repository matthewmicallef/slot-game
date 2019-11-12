import { ReelProps } from "./components/reel/reel.model";
import { WinGridProps } from "./components/win-grid/win-grid.model";
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
  centerPoints: Points;
  centerButton: GameCenterButton;
  reel: ReelProps;
  pathToSymbolAssets: string;
  symbolsSize: Measurement;
  spinButton: SpinButtonProps;
  balance: BalanceProps;
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
    radius: 200,
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
  balance: {
    style: {
      fontFamily: 'Arial',
      fontSize: 20,
      fill: 0xff1010,
      align: 'center',
    },
    position: {
      x: 50,
      y: 20
    }
  },
  winGrid: {
    width: 200,
    height: 120,
    colour: 0x585659,
    lineSize: 3,
    rows: 3,
  },
};