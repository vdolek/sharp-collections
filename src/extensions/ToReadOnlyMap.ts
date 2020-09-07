import { Enumerable } from '../collections/Enumerable';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Converts sequence to a ReadOnlyMap. */
        toReadOnlyMap<TKey, TValue = T>(
            keySelector: (element: T, index: number) => TKey,
            valueSelector?: (element: T, index: number) => TValue
        ): ReadonlyMap<TKey, TValue>;
    }
}

function toReadOnlyMap<T, TKey, TValue = T>(
    this: Enumerable<T>,
    keySelector: (element: T, index: number) => TKey,
    valueSelector?: (element: T, index: number) => TValue
): ReadonlyMap<TKey, TValue> {
    return this.toMap(keySelector, valueSelector);
}

Enumerable.prototype.toReadOnlyMap = toReadOnlyMap;
