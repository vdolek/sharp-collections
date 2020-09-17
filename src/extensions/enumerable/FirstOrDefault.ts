import { Enumerable } from '../../collections/Enumerable';
import { ExceptEnumerable } from '../../enumerables/ExceptEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Returns the first element of a sequence, or undefined if the sequence contains no elements. */
        firstOrDefault(predicate?: (x: T, index: number) => boolean): T | undefined;
    }
}

function firstOrDefault<T>(this: Enumerable<T>, predicate?: (x: T, index: number) => boolean): T | undefined {
    let index = 0;
    for (const element of this) {
        if (predicate == null || predicate(element, index++)) {
            return element;
        }
    }

    return undefined;
}

Enumerable.prototype.firstOrDefault = firstOrDefault;
