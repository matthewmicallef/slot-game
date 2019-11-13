export function randomNumberFromRange (min: number, max: number, values?: number[]) {
    if (values) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        return values[num];
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}
