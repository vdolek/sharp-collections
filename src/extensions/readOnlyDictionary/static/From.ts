import { ReadOnlyDictionary } from '../../../collections/ReadOnlyDictionary';
import { EqualityComparer } from '../../../comparers/EqualityComparer';
import { Pair } from '../../../models/Pair';

declare module '../../../collections/ReadOnlyDictionary' {
    namespace ReadOnlyDictionary {
        /** Returns an ReadOnlyDictionary from source. */
        function from<TKey, TValue>(source: Iterable<Pair<TKey, TValue>>, comparer?: EqualityComparer<TKey>): ReadOnlyDictionary<TKey, TValue>;
    }
}

function from<TKey, TValue>(source: Iterable<Pair<TKey, TValue>>, comparer?: EqualityComparer<TKey>): ReadOnlyDictionary<TKey, TValue> {
    return new ReadOnlyDictionary(source, comparer);
}

ReadOnlyDictionary.from = from;
