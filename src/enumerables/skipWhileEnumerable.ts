import { Enumerable } from '@src/internal';

export class SkipWhileEnumerable<T> extends Enumerable<T> {
    public constructor(
        private readonly source: Iterable<T>,
        private readonly predicate: ((item: T) => boolean) | ((item: T, index: number) => boolean)) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        let index = 0;
        let yielding = false;
        for (const element of this.source) {
            if (!yielding && !this.predicate(element, index)) {
                yielding = true;
            }

            if (yielding) {
                yield element;
            }

            ++index;
        }
    }
}
