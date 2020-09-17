import { Enumerable } from '../../collections/Enumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Returns subsequence of a sequence. */
        slice(startIndex: number, count: number): Enumerable<T>;
    }
}

function slice<T>(this: Enumerable<T>, startIndex: number, count: number): Enumerable<T> {
    return this.skip(startIndex).take(count);
}

Enumerable.prototype.slice = slice;
