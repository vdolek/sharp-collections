import { ReadOnlyDictionary } from '../../../collections/ReadOnlyDictionary';
import { Pair } from '../../../models/Pair';

declare module '../../../collections/ReadOnlyDictionary' {
    namespace ReadOnlyDictionary {
        /** Returns an ReadOnlyDictionary sequence containing exactly one value. */
        function single<TKey, TValue>(key: TKey, value: TValue): ReadOnlyDictionary<TKey, TValue>;
    }
}

function single<TKey, TValue>(key: TKey, value: TValue): ReadOnlyDictionary<TKey, TValue> {
    return ReadOnlyDictionary.fromRest(Pair.from(key, value));
}

ReadOnlyDictionary.single = single;
