import { Enumerable } from '../../collections/Enumerable';
import { ReadOnlyHashSet } from '../../collections/ReadOnlyHashSet';
import { EqualityComparer } from '../../comparers/EqualityComparer';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Converts sequence to a ReadOnlyHashSet. */
        toReadOnlyHashSet(comparer?: EqualityComparer<T>): ReadOnlyHashSet<T>;
    }
}

function toReadOnlyHashSet<T>(this: Enumerable<T>, comparer?: EqualityComparer<T>): ReadOnlyHashSet<T> {
    return new ReadOnlyHashSet(this, comparer);
}

Enumerable.prototype.toReadOnlyHashSet = toReadOnlyHashSet;
