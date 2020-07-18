import { CombinedComparer, Comparer, OrderedEnumerable, SelectorComparer } from '@sharp-collections';

export class OrderedEnumerableInner<T, TKey> extends OrderedEnumerable<T> {
    public constructor(
        private readonly source: Iterable<T>,
        private readonly keySelector: (element: T) => TKey,
        private readonly comparer?: Comparer<TKey>,
        private readonly descending: boolean = false) {
        super();
    }

    private static getComparer<T, TKey>(keySelector: (element: T) => TKey, comparer?: Comparer<TKey>, descending: boolean = true): Comparer<T> {
        let newComparer = comparer ?? Comparer.default<TKey>();
        newComparer = descending ? newComparer.invert() : newComparer;
        const result = new SelectorComparer(keySelector, newComparer);
        return result;
    }

    public *[Symbol.iterator](): Iterator<T> {
        const comparer = OrderedEnumerableInner.getComparer(this.keySelector, this.comparer, this.descending);

        const buffer = Array.from(this.source);
        buffer.sort((x, y) => comparer.compare(x, y));

        for (const element of buffer) {
            yield element;
        }
    }

    public thenBy<TInnerKey>(keySelector: (element: T) => TInnerKey, comparer?: Comparer<TInnerKey>, descending: boolean = false): OrderedEnumerable<T> {
        const firstComparer = OrderedEnumerableInner.getComparer(this.keySelector, this.comparer, this.descending);
        const secondComparer = OrderedEnumerableInner.getComparer(keySelector, comparer, descending);
        const combinedComparer = new CombinedComparer(firstComparer, secondComparer);
        return new OrderedEnumerableInner(this.source, x => x, combinedComparer, descending); // TODO MV x => x
    }

    public thenByDescending<TInnerKey>(keySelector: (element: T) => TInnerKey, comparer?: Comparer<TInnerKey>): OrderedEnumerable<T> {
        return this.thenBy(keySelector, comparer, true);
    }
}
