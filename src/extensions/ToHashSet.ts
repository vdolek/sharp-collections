import { Enumerable } from '../collections/Enumerable';
import { HashSet } from '../collections/HashSet';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Converts sequence to a HashSet. */
        toHashSet(): HashSet<T>;
    }
}

function toHashSet<T>(this: Enumerable<T>): HashSet<T> {
    return new HashSet(this);
}

Enumerable.prototype.toHashSet = toHashSet;
