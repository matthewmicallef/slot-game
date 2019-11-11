export class SlotService {
    valuesInSlots = [];

    addValueInSlot(value: number) {
        this.valuesInSlots.push(value);
    }

    getValueFromSlotPosition(pos: number): number {
        return this.valuesInSlots[pos];
    }
}