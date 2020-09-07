import { Enumerable } from '../collections/Enumerable';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Returns a number that represents how many elements in the specified sequence satisfy a condition. */
        count<T>(predicate?: (element: T, index: number) => boolean): number;
    }
}

function count<T>(this: Enumerable<T>, predicate?: (element: T, index: number) => boolean): number {
    let index = 0;
    let cnt = 0;
    for (const element of this) {
        if (predicate == null || predicate(element, index)) {
            ++cnt;
        }
        ++index;
    }
    return cnt;
}

Enumerable.prototype.count = count;
