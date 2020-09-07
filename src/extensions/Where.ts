import { Enumerable } from '../collections/Enumerable';
import { WhereEnumerable } from '../enumerables/WhereEnumerable';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Filters a sequence of values based on a predicate. */
        where(predicate: (element: T, index: number) => boolean): Enumerable<T>;
    }
}

function where<T>(this: Enumerable<T>, predicate: (element: T, index: number) => boolean): Enumerable<T> {
    return new WhereEnumerable(this, predicate);
}

Enumerable.prototype.where = where;
