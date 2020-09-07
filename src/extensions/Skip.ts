import { Enumerable } from '../collections/Enumerable';
import { SkipEnumerable } from '../enumerables/SkipEnumerable';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Bypasses a specified number of elements in a sequence and then returns the remaining elements. */
        skip(count: number): Enumerable<T>;
    }
}

function skip<T>(this: Enumerable<T>, count: number): Enumerable<T> {
    return new SkipEnumerable(this, count);
}

Enumerable.prototype.skip = skip;
