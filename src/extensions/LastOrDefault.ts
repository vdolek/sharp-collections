import { Enumerable } from '../collections/Enumerable';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Returns the last element of a sequence that satisfies a condition or undefined if no such element is found. */
        lastOrDefault(predicate?: (x: T, index: number) => boolean): T | undefined;
    }
}

function lastOrDefault<T>(this: Enumerable<T>, predicate?: (x: T, index: number) => boolean): T | undefined {
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
        return lastItem;
    }

    return undefined;
}

Enumerable.prototype.lastOrDefault = lastOrDefault;
