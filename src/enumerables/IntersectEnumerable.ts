import { Enumerable } from '../collections/Enumerable';
import { HashSet } from '../collections/HashSet';

export class IntersectEnumerable<T> extends Enumerable<T> {
    public constructor(
        private readonly firstSource: Iterable<T>,
        private readonly secondSource: Iterable<T>) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        const firstSet = HashSet.from(this.firstSource);
        const secondSet = HashSet.from(this.secondSource);

        for (const first of firstSet) {
            if (secondSet.contains(first)) {
                yield first;
            }
        }
    }
}
