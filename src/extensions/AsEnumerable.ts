import { Enumerable } from '../collections/Enumerable';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Returns the sequence typed as Enumerable. */
        asEnumerable(): Enumerable<T>;
    }
}

function asEnumerable<T>(this: Enumerable<T>): Enumerable<T> {
    return Enumerable.from(this);
}

Enumerable.prototype.asEnumerable = asEnumerable;
