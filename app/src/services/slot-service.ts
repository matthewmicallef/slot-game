export class SlotService {
    valuesInSlots:number[] = [];

    addValueInSlot(value: number) {
        this.valuesInSlots.push(value);
    }

    getValueFromSlotPosition(pos: number): number {
        return this.valuesInSlots[pos];
    }

    getAll(): number[] {
        return this.valuesInSlots;
    }
}