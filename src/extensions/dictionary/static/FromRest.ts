import { Dictionary } from '../../../collections/Dictionary';
import { EqualityComparer } from '../../../comparers/EqualityComparer';
import { Pair } from '../../../models/Pair';

declare module '../../../collections/Dictionary' {
    namespace Dictionary {
        /** Returns an Dictionary from rest parameters. */
        function fromRest<TKey, TValue>(...elements: Pair<TKey, TValue>[]): Dictionary<TKey, TValue>;

        /** Returns an Dictionary from rest parameters. */
        function fromRest<TKey, TValue>(comparer: EqualityComparer<TKey>, ...elements: Pair<TKey, TValue>[]): Dictionary<TKey, TValue>;
    }
}

function fromRest<TKey, TValue>(comparer: EqualityComparer<TKey> | Pair<TKey, TValue>, ...elements: Pair<TKey, TValue>[]): Dictionary<TKey, TValue> {
    if (comparer != null && comparer instanceof EqualityComparer) {
        return new Dictionary<TKey, TValue>(elements, comparer);
    }

    return new Dictionary([comparer, ...elements]); // TODO undefined
}

Dictionary.fromRest = fromRest;
