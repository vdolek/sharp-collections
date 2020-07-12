import { Enumerable } from '@sharp-collections';

export class PrependEnumerable<T> extends Enumerable<T> {
    public constructor(
        private readonly source: Iterable<T>,
        private readonly value: T) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        yield this.value;

        for (const element of this.source) {
            yield element;
        }
    }
}
