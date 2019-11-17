import { Points } from "../../game-config";

export interface ReelProps {
    slotWidth: number;
    radius: number;
    colour: number;
    maxSpeed: number;
    speedIncrease: number;
    speedIncreaseTime: number;
    centerPoints: Points;
}