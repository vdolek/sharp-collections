import { Enumerable } from '../../collections/Enumerable';
import { Comparer } from '../../comparers/Comparer';
import { ExtremaEnumerable } from '../../enumerables/ExtremaEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Returns the minimal elements of the given sequence, based on the given projection. */
        minBy<TKey>(keySelector: (element: T, index: number) => TKey, comparer?: Comparer<TKey>): Enumerable<T>;
    }
}

function minBy<T, TKey>(this: Enumerable<T>, keySelector: (element: T, index: number) => TKey, comparer: Comparer<TKey> = Comparer.getDefault<TKey>()): Enumerable<T> {
    return new ExtremaEnumerable(this, keySelector, Comparer.invert(comparer));
}

Enumerable.prototype.minBy = minBy;
