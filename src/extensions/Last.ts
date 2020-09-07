import { Enumerable } from '../collections/Enumerable';
import { Errors } from '../Errors';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Returns the last element of a sequence that satisfies a specified condition. */
        last(predicate?: (x: T, index: number) => boolean): T;
    }
}

function last<T>(this: Enumerable<T>, predicate?: (x: T, index: number) => boolean): T {
    let index = 0;
    let lastItem: T | undefined;
    let lastItemSet = false;
    for (const element of this) {
        if (predicate == null || predicate(element, index++)) {
            lastItem = element;
            lastItemSet = true;
        }
    }

    if (lastItemSet) {
        return lastItem as T;
    }

    throw predicate != null ? Errors.noMatch() : Errors.noElements();
}

Enumerable.prototype.last = last;
