import { Enumerable } from '../../collections/Enumerable';
import { Errors } from '../../Errors';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Returns the first element of a sequence. */
        first(predicate?: (x: T, index: number) => boolean): T;
    }
}

function first<T>(this: Enumerable<T>, predicate?: (x: T, index: number) => boolean): T {
    let index = 0;
    for (const element of this) {
        if (predicate == null || predicate(element, index++)) {
            return element;
        }
    }

    throw predicate != null ? Errors.noMatch() : Errors.noElements();
}

Enumerable.prototype.first = first;
