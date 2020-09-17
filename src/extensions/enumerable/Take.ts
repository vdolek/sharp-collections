import { Enumerable } from '../../collections/Enumerable';
import { TakeEnumerable } from '../../enumerables/TakeEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Returns a specified number of contiguous elements from the start of a sequence. */
        take(count: number): Enumerable<T>;
    }
}

function take<T>(this: Enumerable<T>, count: number): Enumerable<T> {
    return new TakeEnumerable(this, count);
}

Enumerable.prototype.take = take;
