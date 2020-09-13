import { Pair } from '../../../models/Pair';
import { ReadOnlyDictionary } from '../../../collections/ReadOnlyDictionary';

declare module '../../../collections/ReadOnlyDictionary' {
    namespace ReadOnlyDictionary {
        /** Returns an ReadOnlyDictionary from rest parameters. */
        function fromRest<TKey, TValue>(...elements: Pair<TKey, TValue>[]): ReadOnlyDictionary<TKey, TValue>;
    }
}

function fromRest<TKey, TValue>(...elements: Pair<TKey, TValue>[]): ReadOnlyDictionary<TKey, TValue> {
    return new ReadOnlyDictionary(elements);
}

ReadOnlyDictionary.fromRest = fromRest;