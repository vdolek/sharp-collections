import { HashSet } from '../../../collections/HashSet';

declare module '../../../collections/HashSet' {
    namespace HashSet {
        /** Returns an empty HashSet. */
        function empty<T>(): HashSet<T>;
    }
}

function empty<T>(): HashSet<T> {
    return new HashSet<T>();
}

HashSet.empty = empty;
