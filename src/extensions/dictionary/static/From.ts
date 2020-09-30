import { Dictionary } from '../../../collections/Dictionary';
import { EqualityComparer } from '../../../comparers/EqualityComparer';
import { Pair } from '../../../models/Pair';

declare module '../../../collections/Dictionary' {
    namespace Dictionary {
        /** Returns an Dictionary from source. */
        function from<TKey, TValue>(source: Iterable<Pair<TKey, TValue>>, comparer?: EqualityComparer<TKey>): Dictionary<TKey, TValue>;
    }
}

function from<TKey, TValue>(source: Iterable<Pair<TKey, TValue>>, comparer?: EqualityComparer<TKey>): Dictionary<TKey, TValue> {
    return new Dictionary(source, comparer);
}

Dictionary.from = from;
