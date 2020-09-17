import { Enumerable } from '../../collections/Enumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Produces the set union of two sequences. */
        union(second: Enumerable<T>): Enumerable<T>;
    }
}

function union<T>(this: Enumerable<T>, second: Enumerable<T>): Enumerable<T> { // TODO MV Equality Comparer
    return this.concat(second).distinct();
}

Enumerable.prototype.union = union;
