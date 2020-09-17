import { Enumerable } from '../../collections/Enumerable';
import { SkipWhileEnumerable } from '../../enumerables/SkipWhileEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements. */
        skipWhile(predicate: (element: T, index: number) => boolean): Enumerable<T>;
    }
}

function skipWhile<T>(this: Enumerable<T>, predicate: (element: T, index: number) => boolean): Enumerable<T> {
    return new SkipWhileEnumerable(this, predicate);
}

Enumerable.prototype.skipWhile = skipWhile;
