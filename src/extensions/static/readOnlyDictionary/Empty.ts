import { ReadOnlyDictionary } from '../../../collections/ReadOnlyDictionary';

declare module '../../../collections/ReadOnlyDictionary' {
    namespace ReadOnlyDictionary {
        /** Returns an empty ReadOnlyDictionary. */
        function empty<TKey, TValue>(): ReadOnlyDictionary<TKey, TValue>;
    }
}

function empty<TKey, TValue>(): ReadOnlyDictionary<TKey, TValue> {
    return new ReadOnlyDictionary<TKey, TValue>();
}

ReadOnlyDictionary.empty = empty;
