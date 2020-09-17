export class IndexedPair<TValue> {
    public static from<TValue>(index: number, value: TValue): IndexedPair<TValue> {
        return new IndexedPair<TValue>(index, value);
    }

    public constructor(
        public readonly index: number,
        public readonly value: TValue) {
    }
}
