import { Enumerable } from '../collections/Enumerable';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Returns elements at a specified indexes in a rest sequence. */
        elementsAtRest<T>(...indexes: number[]): Enumerable<T>;
    }
}

function elementsAtRest<T>(this: Enumerable<T>, ...indexes: number[]): Enumerable<T> {
    return this.elementsAt(indexes);
}

Enumerable.prototype.elementsAtRest = elementsAtRest;
