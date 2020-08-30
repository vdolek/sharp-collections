import { Enumerable, Errors, List } from '../internal';

export class ElementsAtEnumerable<T> extends Enumerable<T> {
    public constructor(
        private readonly source: Iterable<T>,
        private readonly indexes: Iterable<number>
    ) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        const buffer = List.from(this.source);
        for (const index of this.indexes) {
            if (buffer.containsIndex(index)) {
                yield buffer.get(index);
            } else {
                throw Errors.indexOutOfRange();
            }
        }
    }
}
