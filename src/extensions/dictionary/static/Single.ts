import { Dictionary } from '../../../collections/Dictionary';
import { Enumerable } from '../../../collections/Enumerable';
import { EqualityComparer } from '../../../comparers/EqualityComparer';
import { Pair } from '../../../models/Pair';

declare module '../../../collections/Dictionary' {
    namespace Dictionary {
        /** Returns an Dictionary sequence containing exactly one value. */
        function single<TKey, TValue>(key: TKey, value: TValue, comparer?: EqualityComparer<TKey>): Dictionary<TKey, TValue>;
    }
}

function single<TKey, TValue>(key: TKey, value: TValue, comparer?: EqualityComparer<TKey>): Dictionary<TKey, TValue> {
    return new Dictionary(Enumerable.single(Pair.from(key, value)), comparer);
}

Dictionary.single = single;
