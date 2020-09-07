import { Enumerable } from '../collections/Enumerable';
import { ElementsAtEnumerable } from '../enumerables/ElementsAtEnumerable';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Returns elements at a specified indexes in a sequence. */
        elementsAt<T>(indexes: Iterable<number>): Enumerable<T>;

        /** Returns elements at a specified indexes in a rest sequence. */
        elementsAtRest<T>(...indexes: number[]): Enumerable<T>;
    }
}

function elementsAt<T>(this: Enumerable<T>, indexes: Iterable<number>): Enumerable<T> {
    return new ElementsAtEnumerable(this, indexes);
}

function elementsAtRest<T>(this: Enumerable<T>, ...indexes: number[]): Enumerable<T> {
    return this.elementsAt(indexes);
}

Enumerable.prototype.elementsAt = elementsAt;
Enumerable.prototype.elementsAtRest = elementsAtRest;
