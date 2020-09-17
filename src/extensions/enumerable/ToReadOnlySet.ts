import { Enumerable } from '../../collections/Enumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Converts sequence to a ReadOnlySet. */
        toReadOnlySet(): ReadonlySet<T>;
    }
}

function toReadOnlySet<T>(this: Enumerable<T>): ReadonlySet<T> {
    return this.toSet();
}

Enumerable.prototype.toReadOnlySet = toReadOnlySet;
