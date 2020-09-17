import { Enumerable } from '../collections/Enumerable';

export class WhereEnumerable<T> extends Enumerable<T> {
    public constructor(
        private readonly source: Iterable<T>,
        private readonly predicate: (item: T, index: number) => boolean) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        let index = 0;
        for (const element of this.source) {
            if (this.predicate(element, index)) {
                yield element;
            }

            ++index;
        }
    }
}
