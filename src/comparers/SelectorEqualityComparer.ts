import { EqualityComparer } from './EqualityComparer';

export class SelectorEqualityComparer<TSource, TKey> extends EqualityComparer<TSource> {
    public constructor(
        public readonly keySelector: (value: TSource) => TKey,
        private readonly keyEqualityComparer: EqualityComparer<TKey>) {
        super();
    }

    public equals(value1: TSource, value2: TSource): boolean {
        return this.keyEqualityComparer.equals(this.keySelector(value1), this.keySelector(value2));
    }

    public getHashCode(value: TSource): number {
        return this.keyEqualityComparer.getHashCode(this.keySelector(value));
    }
}
