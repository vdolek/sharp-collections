import { Enumerable } from '../collections/Enumerable';
import { Comparer } from '../comparers/Comparer';
import { OrderedEnumerable } from '../enumerables/OrderedEnumerable';
import { OrderedEnumerableInner } from '../enumerables/OrderedEnumerableInner';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Sorts the elements of a sequence according to a key. */
        orderBy<TKey>(keySelector: (element: T) => TKey, comparer?: Comparer<TKey>, descending?: boolean): OrderedEnumerable<T>;
    }
}

function orderBy<T, TKey>(this: Enumerable<T>, keySelector: (element: T) => TKey, comparer: Comparer<TKey> = Comparer.default<TKey>(), descending: boolean = false): OrderedEnumerable<T> {
    const newComparer = comparer.invert(descending);
    return new OrderedEnumerableInner(this, keySelector, newComparer);
}

Enumerable.prototype.orderBy = orderBy;
