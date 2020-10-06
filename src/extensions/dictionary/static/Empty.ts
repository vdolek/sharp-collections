import { Dictionary } from '../../../collections/Dictionary';
import { EqualityComparer } from '../../../comparers/EqualityComparer';

declare module '../../../collections/Dictionary' {
    namespace Dictionary {
        /** Returns an empty Dictionary. */
        function empty<TKey, TValue>(comparer?: EqualityComparer<TKey>): Dictionary<TKey, TValue>;
    }
}

function empty<TKey, TValue>(comparer?: EqualityComparer<TKey>): Dictionary<TKey, TValue> {
    return new Dictionary<TKey, TValue>(comparer);
}

Dictionary.empty = empty;
