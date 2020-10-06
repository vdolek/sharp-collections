import { Enumerable } from '../../../collections/Enumerable';
import { ReadOnlyDictionary } from '../../../collections/ReadOnlyDictionary';
import { EqualityComparer } from '../../../comparers/EqualityComparer';
import { Pair } from '../../../models/Pair';

declare module '../../../collections/ReadOnlyDictionary' {
    namespace ReadOnlyDictionary {
        /** Returns an ReadOnlyDictionary sequence containing exactly one value. */
        function single<TKey, TValue>(key: TKey, value: TValue, comparer?: EqualityComparer<TKey>): ReadOnlyDictionary<TKey, TValue>;
    }
}

function single<TKey, TValue>(key: TKey, value: TValue, comparer?: EqualityComparer<TKey>): ReadOnlyDictionary<TKey, TValue> {
    return new ReadOnlyDictionary(Enumerable.single(Pair.from(key, value)), comparer);
}

ReadOnlyDictionary.single = single;
