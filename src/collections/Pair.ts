export class Pair<TKey, TValue> {
    public static fromElements<TKey, TValue>(key: TKey, value: TValue): Pair<TKey, TValue> {
        return new Pair<TKey, TValue>(key, value);
    }

    public constructor(
        public readonly key: TKey,
        public readonly value: TValue) {
    }
}
