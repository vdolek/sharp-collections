import { Enumerable } from '../../collections/Enumerable';
import { DistinctByEnumerable } from '../../enumerables/DistinctByEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Returns distinct elements from a sequence by using key selector to compare values. */
        distinctBy<T, TKey = T>(keySelector: (element: T, index: number) => TKey): Enumerable<T>;
    }
}

function distinctBy<T, TKey = T>(this: Enumerable<T>, keySelector: (element: T, index: number) => TKey): Enumerable<T> {
    return new DistinctByEnumerable(this, keySelector);
}

Enumerable.prototype.distinctBy = distinctBy;
