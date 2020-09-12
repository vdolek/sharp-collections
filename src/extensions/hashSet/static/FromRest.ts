import { HashSet } from '../../../collections/HashSet';

declare module '../../../collections/HashSet' {
    namespace HashSet {
        /** Returns an HashSet from rest parameters. */
        function fromRest<T>(...elements: T[]): HashSet<T>;
    }
}

function fromRest<T>(...elements: T[]): HashSet<T> {
    return new HashSet(elements);
}

HashSet.fromRest = fromRest;
