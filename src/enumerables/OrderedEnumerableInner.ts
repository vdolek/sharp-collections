import { Comparer, Enumerable, OrderedEnumerable, SelectorComparer } from '../internal';

export class OrderedEnumerableInner<T, TKey> extends OrderedEnumerable<T> {
    public constructor(
        private readonly source: Iterable<T>,
        private readonly keySelector: (element: T) => TKey,
        private readonly comparer: Comparer<TKey>) {
        super();
    }

    private static getComparer<T, TKey>(keySelector: (element: T) => TKey, comparer: Comparer<TKey>): Comparer<T> {
        const result = new SelectorComparer(keySelector, comparer);
        return result;
    }

    public *[Symbol.iterator](): Iterator<T> {
        const comparer = OrderedEnumerableInner.getComparer(this.keySelector, this.comparer);

        const indexed = Enumerable.from(this.source)
            .select<[T, number]>((element, index) => [element, index]);

        const stableComparer = Comparer.combine<[T, number]>(
            new SelectorComparer<[T, number], T>(x => x[0], comparer),
            new SelectorComparer<[T, number], number>(x => x[1], Comparer.default<number>())
        );

        const buffer = Array.from(indexed);
        buffer.sort((x, y) => stableComparer.compare(x, y));

        for (const element of buffer) {
            yield element[0];
        }
    }

    public thenBy<TInnerKey>(keySelector: (element: T) => TInnerKey, comparer?: Comparer<TInnerKey>, descending: boolean = false): OrderedEnumerable<T> {
        const firstComparer = OrderedEnumerableInner.getComparer(this.keySelector, this.comparer);

        const newComparer = (comparer ?? Comparer.default()).invert(descending);
        const secondComparer = OrderedEnumerableInner.getComparer(keySelector, newComparer);

        const combinedComparer = Comparer.combine(firstComparer, secondComparer);
        return new OrderedEnumerableInner(this.source, x => x, combinedComparer);
    }

    public thenByDescending<TInnerKey>(keySelector: (element: T) => TInnerKey, comparer?: Comparer<TInnerKey>): OrderedEnumerable<T> {
        return this.thenBy(keySelector, comparer, true);
    }
}
