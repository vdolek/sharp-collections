import { Enumerable } from '../collections/Enumerable';
import { Lookup } from '../collections/Lookup';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Converts sequence to a Lookup. */
        toLookup<TKey, TValue = T>(
            keySelector: (element: T, index: number) => TKey,
            valueSelector?: (element: T, index: number) => TValue
        ): Lookup<TKey, TValue>;
    }
}

function toLookup<T, TKey, TValue = T>(
    this: Enumerable<T>,
    keySelector: (element: T, index: number) => TKey,
    valueSelector?: (element: T, index: number) => TValue
): Lookup<TKey, TValue> {
    const dict = this
        .groupBy(keySelector, valueSelector)
        .toReadOnlyDictionary(x => x.key);
    return new Lookup(dict);
}

Enumerable.prototype.toLookup = toLookup;
