import { Dictionary } from '../../../collections/Dictionary';
import { ReadOnlyDictionary } from '../../../collections/ReadOnlyDictionary';
import { EqualityComparer } from '../../../comparers/EqualityComparer';
import { Pair } from '../../../models/Pair';

declare module '../../../collections/ReadOnlyDictionary' {
    namespace ReadOnlyDictionary {
        /** Returns an ReadOnlyDictionary from rest parameters. */
        function fromRest<TKey, TValue>(...elements: Pair<TKey, TValue>[]): ReadOnlyDictionary<TKey, TValue>;

        /** Returns an ReadOnlyDictionary from rest parameters. */
        function fromRest<TKey, TValue>(comparer: EqualityComparer<TKey>, ...elements: Pair<TKey, TValue>[]): ReadOnlyDictionary<TKey, TValue>;
    }
}

function fromRest<TKey, TValue>(comparer: EqualityComparer<TKey> | Pair<TKey, TValue>, ...elements: Pair<TKey, TValue>[]): ReadOnlyDictionary<TKey, TValue> {
    if (comparer != null && comparer instanceof EqualityComparer) {
        return new Dictionary<TKey, TValue>(elements, comparer);
    }

    return new Dictionary([comparer, ...elements]); // TODO undefined
}

ReadOnlyDictionary.fromRest = fromRest;
