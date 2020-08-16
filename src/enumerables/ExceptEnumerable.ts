import { Enumerable, HashSet } from '../internal';

export class ExceptEnumerable<T> extends Enumerable<T> {
    public constructor(
        private readonly source: Iterable<T>,
        private readonly exceptSource: Iterable<T>) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        const set = HashSet.from(this.exceptSource);

        for (const element of this.source) {
            if (!set.contains(element)) {
                yield element;
            }
        }
    }
}
