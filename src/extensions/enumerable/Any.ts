import { Enumerable } from '../../collections/Enumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Determines whether a sequence contains any elements. */
        any(predicate?: (x: T, index: number) => boolean): boolean;
    }
}

function any<T>(this: Enumerable<T>, predicate?: (x: T, index: number) => boolean): boolean {
    let index = 0;
    for (const element of this) {
        if (predicate == null || predicate(element, index++)) {
            return true;
        }
    }
    return false;
}

Enumerable.prototype.any = any;
