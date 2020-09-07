import { Enumerable } from '../collections/Enumerable';
import { ReadOnlyHashSet } from '../collections/ReadOnlyHashSet';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Converts sequence to a ReadOnlyHashSet. */
        toReadOnlyHashSet(): ReadOnlyHashSet<T>;
    }
}

function toReadOnlyHashSet<T>(this: Enumerable<T>): ReadOnlyHashSet<T> {
    return new ReadOnlyHashSet(this);
}

Enumerable.prototype.toReadOnlyHashSet = toReadOnlyHashSet;
