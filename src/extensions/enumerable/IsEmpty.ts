import { Enumerable } from '../../collections/Enumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Determines whether the sequence is empty. */
        isEmpty(): boolean;
    }
}

function isEmpty<T>(this: Enumerable<T>): boolean {
    return this.no();
}

Enumerable.prototype.isEmpty = isEmpty;
