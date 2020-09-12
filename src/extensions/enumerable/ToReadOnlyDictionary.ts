import { Dictionary } from '../../collections/Dictionary';
import { Enumerable } from '../../collections/Enumerable';
import { Pair } from '../../collections/Pair';
import { ReadOnlyDictionary } from '../../collections/ReadOnlyDictionary';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Converts sequence to a ReadOnlyDictionary. */
        toReadOnlyDictionary<TKey, TValue = T>(
            keySelector: (element: T, index: number) => TKey,
            valueSelector?: (element: T, index: number) => TValue
        ): ReadOnlyDictionary<TKey, TValue>;
    }
}

function toReadOnlyDictionary<T, TKey, TValue = T>(
    this: Enumerable<T>,
    keySelector: (element: T, index: number) => TKey,
    valueSelector?: (element: T, index: number) => TValue
): ReadOnlyDictionary<TKey, TValue> {
    const pairs = this.select((x, idx) => Pair.from(
        keySelector(x, idx),
        valueSelector != null ? valueSelector(x, idx) : x as unknown as TValue
    ));

    return new Dictionary(pairs);
}

Enumerable.prototype.toReadOnlyDictionary = toReadOnlyDictionary;
