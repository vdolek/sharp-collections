import { Enumerable } from '../collections/Enumerable';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Determines whether all elements of a sequence satisfy a condition. */
        all(predicate: (x: T, idx: number) => boolean): boolean;
    }
}

function all<T>(this: Enumerable<T>, predicate: (x: T, idx: number) => boolean): boolean {
    let index = 0;
    for (const element of this) {
        if (!predicate(element, index++)) {
            return false;
        }
    }
    return true;
}

Enumerable.prototype.all = all;
