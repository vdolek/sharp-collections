import { Dictionary } from '../../../collections/Dictionary';

declare module '../../../collections/Dictionary' {
    namespace Dictionary {
        /** Returns an empty Dictionary. */
        function empty<TKey, TValue>(): Dictionary<TKey, TValue>;
    }
}

function empty<TKey, TValue>(): Dictionary<TKey, TValue> {
    return new Dictionary<TKey, TValue>();
}

Dictionary.empty = empty;
