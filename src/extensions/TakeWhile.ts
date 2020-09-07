import { Enumerable } from '../collections/Enumerable';
import { TakeWhileEnumerable } from '../enumerables/TakeWhileEnumerable';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Returns elements from a sequence as long as a specified condition is true. */
        takeWhile(predicate: (element: T, index: number) => boolean): Enumerable<T>;
    }
}

function takeWhile<T>(this: Enumerable<T>, predicate: (element: T, index: number) => boolean): Enumerable<T> {
    return new TakeWhileEnumerable(this, predicate);
}

Enumerable.prototype.takeWhile = takeWhile;
