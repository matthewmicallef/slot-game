import { Reel } from "../components/reel/reel";

export class ReelService {
  private reel: Reel;

  setReel(reel: Reel) {
    this.reel = reel;
  }

  getReel(): Reel {
    return this.reel;
  }
}
