import { Enumerable } from '../../collections/Enumerable';
import { HashSet } from '../../collections/HashSet';
import { EqualityComparer } from '../../comparers/EqualityComparer';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Converts sequence to a HashSet. */
        toHashSet(comparer?: EqualityComparer<T>): HashSet<T>;
    }
}

function toHashSet<T>(this: Enumerable<T>, comparer?: EqualityComparer<T>): HashSet<T> {
    return new HashSet(this, comparer);
}

Enumerable.prototype.toHashSet = toHashSet;
