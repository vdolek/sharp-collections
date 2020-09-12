import { Enumerable } from '../../collections/Enumerable';
import { ElementsAtEnumerable } from '../../enumerables/ElementsAtEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Returns elements at a specified indexes in a sequence. */
        elementsAt<T>(indexes: Iterable<number>): Enumerable<T>;
    }
}

function elementsAt<T>(this: Enumerable<T>, indexes: Iterable<number>): Enumerable<T> {
    return new ElementsAtEnumerable(this, indexes);
}

Enumerable.prototype.elementsAt = elementsAt;
