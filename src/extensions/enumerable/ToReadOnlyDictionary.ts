import { Enumerable } from '../../collections/Enumerable';
import { ReadOnlyDictionary } from '../../collections/ReadOnlyDictionary';
import { EqualityComparer } from '../../comparers/EqualityComparer';
import { Pair } from '../../models/Pair';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Converts sequence to a ReadOnlyDictionary. */
        toReadOnlyDictionary<TKey, TValue = T>(
            keySelector: (element: T, index: number) => TKey,
            comparer?: EqualityComparer<TKey>
        ): ReadOnlyDictionary<TKey, TValue>;

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
    valueSelector?: ((element: T, index: number) => TValue) | EqualityComparer<TKey>,
    comparer?: EqualityComparer<TKey>
): ReadOnlyDictionary<TKey, TValue> {
    if (valueSelector instanceof EqualityComparer) {
        return toReadOnlyDictionaryStrict(this, keySelector, undefined, valueSelector);
    }

    return toReadOnlyDictionaryStrict(this, keySelector, valueSelector, comparer);
}

function toReadOnlyDictionaryStrict<T, TKey, TValue = T>(
    source: Enumerable<T>,
    keySelector: (element: T, index: number) => TKey,
    valueSelector?: (element: T, index: number) => TValue,
    comparer?: EqualityComparer<TKey>
): ReadOnlyDictionary<TKey, TValue> {
    const pairs = source.select((x, idx) => Pair.from(
        keySelector(x, idx),
        valueSelector != null ? valueSelector(x, idx) : x as unknown as TValue
    ));

    return new ReadOnlyDictionary(pairs, comparer);
}

Enumerable.prototype.toReadOnlyDictionary = toReadOnlyDictionary;
