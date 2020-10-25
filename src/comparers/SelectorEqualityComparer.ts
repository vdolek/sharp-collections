import { EqualityComparer } from './EqualityComparer';

export class SelectorEqualityComparer<TSource, TKey> extends EqualityComparer<TSource> {
    private readonly keyEqualityComparer: EqualityComparer<TKey>;

    public constructor(
        public readonly keySelector: (value: TSource) => TKey,
        keyEqualityComparer?: EqualityComparer<TKey>) {
        super();

        this.keyEqualityComparer = keyEqualityComparer ?? EqualityComparer.getDefault();
    }

    public equals(value1: TSource, value2: TSource): boolean {
        return this.keyEqualityComparer.equals(this.keySelector(value1), this.keySelector(value2));
    }

    public getHashCode(value: TSource): number {
        return this.keyEqualityComparer.getHashCode(this.keySelector(value));
    }
}
