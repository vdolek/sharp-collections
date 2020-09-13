import { Pair } from '../../../collections/models/Pair';
import { ReadOnlyDictionary } from '../../../collections/ReadOnlyDictionary';

declare module '../../../collections/ReadOnlyDictionary' {
    namespace ReadOnlyDictionary {
        /** Returns an ReadOnlyDictionary from source. */
        function from<TKey, TValue>(source: Iterable<Pair<TKey, TValue>>): ReadOnlyDictionary<TKey, TValue>;
    }
}

function from<TKey, TValue>(source: Iterable<Pair<TKey, TValue>>): ReadOnlyDictionary<TKey, TValue> {
    return new ReadOnlyDictionary(source);
}

ReadOnlyDictionary.from = from;
