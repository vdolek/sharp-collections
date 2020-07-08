import { Enumerable, EnumerableBase } from '@src/internal';

export class SelectManyEnumerable<T, TResult> extends EnumerableBase<TResult> {
    public constructor(
        private readonly innerEnumerable: Enumerable<T>,
        private readonly selector: (x: T) => Enumerable<TResult>) {
        super();
    }

    public *[Symbol.iterator](): Iterator<TResult> {
        for (const item of this.innerEnumerable) {
            const subEnumerable = this.selector(item);
            for (const x of subEnumerable) {
                yield x;
            }
        }
    }
}
