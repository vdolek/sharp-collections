import { Enumerable } from '../../collections/Enumerable';
import { IntersectEnumerable } from '../../enumerables/IntersectEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Produces the set intersection of two sequences. */
        intersect(second: Iterable<T>): Enumerable<T>;
    }
}

function intersect<T>(this: Enumerable<T>, second: Iterable<T>): Enumerable<T> {
    return new IntersectEnumerable(this, second);
}

Enumerable.prototype.intersect = intersect;
