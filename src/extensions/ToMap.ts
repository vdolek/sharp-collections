import { Enumerable } from '../collections/Enumerable';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Converts sequence to a Map. */
        toMap<TKey, TValue = T>(
            keySelector: (element: T, index: number) => TKey,
            valueSelector?: (element: T, index: number) => TValue
        ): Map<TKey, TValue>;
    }
}

function toMap<T, TKey, TValue = T>(
    this: Enumerable<T>,
    keySelector: (element: T, index: number) => TKey,
    valueSelector?: (element: T, index: number) => TValue
): Map<TKey, TValue> {
    const selected = this.select<[TKey, TValue]>((x, idx) => [
        keySelector(x, idx),
        valueSelector != null ? valueSelector(x, idx) : x as unknown as TValue]
    );
    return new Map<TKey, TValue>(selected);
}

Enumerable.prototype.toMap = toMap;
