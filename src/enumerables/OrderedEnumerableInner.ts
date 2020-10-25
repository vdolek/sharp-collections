import { Enumerable } from '../collections/Enumerable';
import { OrderedEnumerable } from '../collections/OrderedEnumerable';
import { Comparer } from '../comparers/Comparer';
import { SelectorComparer } from '../comparers/SelectorComparer';

export class OrderedEnumerableInner<T, TKey> extends OrderedEnumerable<T> {
    public constructor(
        private readonly source: Iterable<T>,
        private readonly keySelector: (element: T) => TKey,
        private readonly comparer: Comparer<TKey>) {
        super();
    }

    public *[Symbol.iterator](): Iterator<T> {
        const comparer = Comparer.fromSelector(this.keySelector, this.comparer);

        const indexed = Enumerable.from(this.source)
            .select<[T, number]>((element, index) => [element, index]);

        const stableComparer = Comparer.combine<[T, number]>(
            Comparer.fromSelector(x => x[0], comparer),
            Comparer.fromSelector(x => x[1], Comparer.getDefault<number>())
        );

        const buffer = Array.from(indexed);
        buffer.sort((x, y) => stableComparer.compare(x, y));

        for (const element of buffer) {
            yield element[0];
        }
    }

    public thenBy<TInnerKey>(keySelector: (element: T) => TInnerKey, comparer?: Comparer<TInnerKey>, descending: boolean = false): OrderedEnumerable<T> {
        const firstComparer = Comparer.fromSelector(this.keySelector, this.comparer);

        const newComparer = Comparer.invert(comparer ?? Comparer.getDefault(), descending);
        const secondComparer = Comparer.fromSelector(keySelector, newComparer);

        const combinedComparer = Comparer.combine(firstComparer, secondComparer);
        return new OrderedEnumerableInner(this.source, x => x, combinedComparer);
    }

    public thenByDescending<TInnerKey>(keySelector: (element: T) => TInnerKey, comparer?: Comparer<TInnerKey>): OrderedEnumerable<T> {
        return this.thenBy(keySelector, comparer, true);
    }
}
