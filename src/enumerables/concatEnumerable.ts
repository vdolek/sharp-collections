import { Enumerable, EnumerableBase } from '@src/internal';

export class ConcatEnumerable<T> extends EnumerableBase<T> {
    public constructor(
        private readonly firstEnumerable: Enumerable<T>,
        private readonly secondEnumerable: Enumerable<T>) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        for (const item of this.firstEnumerable) {
            yield item;
        }

        for (const item of this.secondEnumerable) {
            yield item;
        }
    }
}