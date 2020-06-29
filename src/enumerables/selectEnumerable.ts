import { Enumerable, EnumerableBase } from '@src/internal';

export class SelectEnumerable<TSource, TDest> extends EnumerableBase<TDest> {
    public constructor(
        private readonly innerEnumerable: Enumerable<TSource>,
        private readonly selector: (x: TSource) => TDest) {
        super();
    }

    public *[Symbol.iterator](): Iterator<TDest> {
        for (const item of this.innerEnumerable) {
            yield this.selector(item);
        }
    }
}
