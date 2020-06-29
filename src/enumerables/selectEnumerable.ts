import { Enumerable, EnumerableBase } from '@src/internal';

export class SelectEnumerable<T, TResult> extends EnumerableBase<TResult> {
    public constructor(
        private readonly innerEnumerable: Enumerable<T>,
        private readonly selector: ((x: T) => TResult) | ((x: T, idx: number) => TResult)) {
        super();
    }

    public *[Symbol.iterator](): Iterator<TResult> {
        let index = 0;
        for (const item of this.innerEnumerable) {
            yield this.selector(item, index);
            ++index;
        }
    }
}
