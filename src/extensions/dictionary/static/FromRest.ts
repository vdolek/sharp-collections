import { Dictionary } from '../../../collections/Dictionary';
import { Pair } from '../../../collections/models/Pair';

declare module '../../../collections/Dictionary' {
    namespace Dictionary {
        /** Returns an Dictionary from rest parameters. */
        function fromRest<TKey, TValue>(...elements: Pair<TKey, TValue>[]): Dictionary<TKey, TValue>;
    }
}

function fromRest<TKey, TValue>(...elements: Pair<TKey, TValue>[]): Dictionary<TKey, TValue> {
    return new Dictionary(elements);
}

Dictionary.fromRest = fromRest;
