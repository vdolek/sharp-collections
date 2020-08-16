import { Comparer, Enumerable, List } from '@sharp-collections';

export class ExtremaEnumerable<T, TKey> extends Enumerable<T> {
    public constructor(
        private readonly source: Iterable<T>,
        private readonly keySelector: (element: T, index: number) => TKey,
        private readonly comparer: Comparer<TKey>) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        const buffer = List.empty<[T, TKey]>();

        const sourceWithKeys = Enumerable.from(this.source)
            .select<[T, TKey]>((element, idx) => [element, this.keySelector(element, idx)]);

        for (const pair of sourceWithKeys) {
            if (buffer.empty()) {
                buffer.add(pair);
            } else {
                const cmp = this.comparer.compare(buffer.first()[1], pair[1]);
                if (cmp === 0) {
                    buffer.add(pair);
                } else if (cmp < 0) {
                    buffer.clear();
                    buffer.add(pair);
                }
            }
        }

        for (const pair of buffer) {
            yield pair[0];
        }
    }
}
