import { Enumerable } from '@src/internal';

export class WhereEnumerable<T> extends Enumerable<T> {
    public constructor(
        private readonly innerEnumerable: Enumerable<T>,
        private readonly predicate: ((item: T) => boolean) | ((item: T, index: number) => boolean)) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        let index = 0;
        for (const item of this.innerEnumerable) {
            if (this.predicate(item, index)) {
                yield item;
            }

            ++index;
        }
    }
}
