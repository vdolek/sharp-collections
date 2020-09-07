import { Enumerable } from '../collections/Enumerable';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Converts sequence to an Array. */
        toArray(): T[];
    }
}

function toArray<T>(this: Enumerable<T>): T[] {
    return Array.from(this);
}

Enumerable.prototype.toArray = toArray;
