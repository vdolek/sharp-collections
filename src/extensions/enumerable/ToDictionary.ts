import { Dictionary } from '../../collections/Dictionary';
import { Enumerable } from '../../collections/Enumerable';
import { EqualityComparer } from '../../comparers/EqualityComparer';
import { Pair } from '../../models/Pair';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Converts sequence to a Dictionary. */
        toDictionary<TKey, TValue = T>(
            keySelector: (element: T, index: number) => TKey,
            comparer?: EqualityComparer<TKey>
        ): Dictionary<TKey, TValue>;

        /** Converts sequence to a Dictionary. */
        toDictionary<TKey, TValue = T>(
            keySelector: (element: T, index: number) => TKey,
            valueSelector?: (element: T, index: number) => TValue,
            comparer?: EqualityComparer<TKey>
        ): Dictionary<TKey, TValue>;
    }
}

function toDictionary<T, TKey, TValue = T>(
    this: Enumerable<T>,
    keySelector: (element: T, index: number) => TKey,
    valueSelector?: ((element: T, index: number) => TValue) | EqualityComparer<TKey>,
    comparer?: EqualityComparer<TKey>
): Dictionary<TKey, TValue> {
    if (valueSelector instanceof EqualityComparer) {
        return toDictionaryStrict(this, keySelector, undefined, valueSelector);
    }

    return toDictionaryStrict(this, keySelector, valueSelector, comparer);
}

function toDictionaryStrict<T, TKey, TValue = T>(
    enumerable: Enumerable<T>,
    keySelector: (element: T, index: number) => TKey,
    valueSelector?: (element: T, index: number) => TValue,
    comparer?: EqualityComparer<TKey>
): Dictionary<TKey, TValue> {
    const pairs = enumerable.select((x, idx) => Pair.from(
        keySelector(x, idx),
        valueSelector != null ? valueSelector(x, idx) : x as unknown as TValue));

    return new Dictionary<TKey, TValue>(pairs, comparer);
}

Enumerable.prototype.toDictionary = toDictionary;
