import { Enumerable } from '@sharp-collections';

export class AppendEnumerable<T> extends Enumerable<T> {
    public constructor(
        private readonly source: Iterable<T>,
        private readonly value: T) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        for (const element of this.source) {
            yield element;
        }

        yield this.value;
    }
}
