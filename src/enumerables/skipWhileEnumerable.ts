import { Enumerable } from '@src/internal';

export class SkipWhileEnumerable<T> extends Enumerable<T> {
    public constructor(
        private readonly source: Enumerable<T>,
        private readonly predicate: ((item: T) => boolean) | ((item: T, index: number) => boolean)) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        let index = 0;
        let yielding = false;
        for (const item of this.source) {
            if (!yielding && !this.predicate(item, index)) {
                yielding = true;
            }

            if (yielding) {
                yield item;
            }

            ++index;
        }
    }
}
