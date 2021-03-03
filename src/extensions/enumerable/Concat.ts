import { Enumerable } from '../../collections/Enumerable';
import { ConcatEnumerable } from '../../enumerables/ConcatEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Concatenates two sequences. */
        concat(second: Iterable<T>): Enumerable<T>;
    }
}

function concat<T>(this: Enumerable<T>, second: Iterable<T>): Enumerable<T> {
    return new ConcatEnumerable(this, second);
}

Enumerable.prototype.concat = concat;
