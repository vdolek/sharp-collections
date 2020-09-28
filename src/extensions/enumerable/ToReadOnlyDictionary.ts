import { Enumerable } from '../../collections/Enumerable';
import { ReadOnlyDictionary } from '../../collections/ReadOnlyDictionary';
import { EqualityComparer } from '../../comparers/EqualityComparer';
import { Pair } from '../../models/Pair';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Converts sequence to a ReadOnlyDictionary. */
        toReadOnlyDictionary<TKey, TValue = T>(
            keySelector: (element: T, index: number) => TKey,
            valueSelector?: (element: T, index: number) => TValue,
            comparer?: EqualityComparer<TKey>
        ): ReadOnlyDictionary<TKey, TValue>;
    }
}

function toReadOnlyDictionary<T, TKey, TValue = T>(
    this: Enumerable<T>,
    keySelector: (element: T, index: number) => TKey,
    valueSelector?: (element: T, index: number) => TValue,
    comparer?: EqualityComparer<TKey>
): ReadOnlyDictionary<TKey, TValue> {
    const pairs = this.select((x, idx) => Pair.from(
        keySelector(x, idx),
        valueSelector != null ? valueSelector(x, idx) : x as unknown as TValue
    ));

    return new ReadOnlyDictionary(pairs, comparer);
}

Enumerable.prototype.toReadOnlyDictionary = toReadOnlyDictionary;
