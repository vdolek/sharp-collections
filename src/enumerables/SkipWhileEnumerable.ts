import { Enumerable } from '../collections/Enumerable';

export class SkipWhileEnumerable<T> extends Enumerable<T> {
    public constructor(
        private readonly source: Iterable<T>,
        private readonly predicate: (item: T, index: number) => boolean) {
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
