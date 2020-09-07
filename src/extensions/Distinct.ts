import { Enumerable } from '../collections/Enumerable';
import { DistinctByEnumerable } from '../enumerables/DistinctByEnumerable';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Returns distinct elements from a sequence. */
        distinct(this: Enumerable<T>): Enumerable<T>;
    }
}

function distinct<T>(this: Enumerable<T>): Enumerable<T> { // TODO MV EqualityComparer
    return new DistinctByEnumerable(this);
}

Enumerable.prototype.distinct = distinct;
