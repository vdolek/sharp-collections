import { Enumerable } from '../../collections/Enumerable';
import { EqualityComparer } from '../../comparers/EqualityComparer';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Produces the set union of two sequences. */
        union(second: Iterable<T>, comparer?: EqualityComparer<T>): Enumerable<T>;
    }
}

function union<T>(this: Enumerable<T>, second: Iterable<T>, comparer?: EqualityComparer<T>): Enumerable<T> {
    return this.concat(second).distinct(comparer);
}

Enumerable.prototype.union = union;
