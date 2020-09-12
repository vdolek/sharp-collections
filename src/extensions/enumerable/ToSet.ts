import { Enumerable } from '../../collections/Enumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Converts sequence to a Set. */
        toSet(): Set<T>;
    }
}

function toSet<T>(this: Enumerable<T>): Set<T> {
    return new Set(this);
}

Enumerable.prototype.toSet = toSet;
