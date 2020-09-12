import { Dictionary } from '../../../collections/Dictionary';
import { Pair } from '../../../collections/Pair';

declare module '../../../collections/Dictionary' {
    namespace Dictionary {
        /** Returns an Dictionary sequence containing exactly one value. */
        function single<TKey, TValue>(key: TKey, value: TValue): Dictionary<TKey, TValue>;
    }
}

function single<TKey, TValue>(key: TKey, value: TValue): Dictionary<TKey, TValue> {
    return Dictionary.fromRest(Pair.from(key, value));
}

Dictionary.single = single;
