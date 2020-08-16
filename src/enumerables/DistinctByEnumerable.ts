import { Enumerable, HashSet } from '../internal';

export class DistinctByEnumerable<T, TKey = T> extends Enumerable<T> {
    public constructor(
        private readonly source: Iterable<T>,
        private readonly keySelector?: (element: T, index: number) => TKey
    ) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        const set = new HashSet<TKey>();

        let index = 0;
        for (const element of this.source) {
            const key = this.keySelector != null ? this.keySelector(element, index++) : element as unknown as TKey;
            if (!set.contains(key)) {
                set.add(key);
                yield element;
            }
        }
    }
}
