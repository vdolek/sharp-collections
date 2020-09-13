import { Dictionary } from '../../../collections/Dictionary';
import { Pair } from '../../../models/Pair';

declare module '../../../collections/Dictionary' {
    namespace Dictionary {
        /** Returns an Dictionary from source. */
        function from<TKey, TValue>(source: Iterable<Pair<TKey, TValue>>): Dictionary<TKey, TValue>;
    }
}

function from<TKey, TValue>(source: Iterable<Pair<TKey, TValue>>): Dictionary<TKey, TValue> {
    return new Dictionary(source);
}

Dictionary.from = from;
