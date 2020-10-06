import { Enumerable } from '../../collections/Enumerable';
import { EqualityComparer } from '../../comparers/EqualityComparer';
import { DistinctByEnumerable } from '../../enumerables/DistinctByEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Returns distinct elements from a sequence. */
        distinct(this: Enumerable<T>, comparer?: EqualityComparer<T>): Enumerable<T>;
    }
}

function distinct<T>(this: Enumerable<T>, comparer?: EqualityComparer<T>): Enumerable<T> {
    return new DistinctByEnumerable(this, undefined, comparer);
}

Enumerable.prototype.distinct = distinct;
