import { Enumerable } from '../../collections/Enumerable';
import { Comparer } from '../../comparers/Comparer';
import { OrderedEnumerable } from '../../enumerables/OrderedEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Sorts the elements of a sequence in descending order according to a key. */
        orderByDescending<TKey>(keySelector: (element: T) => TKey, comparer?: Comparer<TKey>): OrderedEnumerable<T>;
    }
}

function orderByDescending<T, TKey>(this: Enumerable<T>, keySelector: (element: T) => TKey, comparer: Comparer<TKey> = Comparer.getDefault<TKey>()): OrderedEnumerable<T> {
    return this.orderBy(keySelector, comparer, true);
}

Enumerable.prototype.orderByDescending = orderByDescending;
