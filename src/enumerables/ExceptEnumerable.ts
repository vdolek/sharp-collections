import { Enumerable } from '../collections/Enumerable';
import { HashSet } from '../collections/HashSet';
import { EqualityComparer } from '../comparers/EqualityComparer';

export class ExceptEnumerable<T> extends Enumerable<T> {
    public constructor(
        private readonly source: Iterable<T>,
        private readonly exceptSource: Iterable<T>,
        private readonly comparer?: EqualityComparer<T>) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        const set = new HashSet(this.exceptSource, this.comparer);

        for (const element of this.source) {
            if (!set.contains(element)) {
                yield element;
            }
        }
    }
}
