import { Enumerable, EnumerableBase } from '@src/internal';

export class WhereEnumerable<T> extends EnumerableBase<T> {
    constructor(
        private readonly innerEnumerable: Enumerable<T>,
        private readonly predicate: (x: T) => boolean) {
        super();
    }

    *[Symbol.iterator](): Iterator<T> {
        for (const item of this.innerEnumerable) {
            if (this.predicate(item)) {
                yield item;
            }
        }
    }
}
