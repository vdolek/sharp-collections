import { Enumerable } from '../collections/Enumerable';
import { ReverseEnumerable } from '../enumerables/ReverseEnumerable';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Inverts the order of the elements in a sequence. */
        reverse(): Enumerable<T>;
    }
}

function reverse<T>(this: Enumerable<T>): Enumerable<T> {
    return new ReverseEnumerable(this);
}

Enumerable.prototype.reverse = reverse;
