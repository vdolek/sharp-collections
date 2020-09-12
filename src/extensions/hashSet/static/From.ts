import { HashSet } from '../../../collections/HashSet';

declare module '../../../collections/HashSet' {
    namespace HashSet {
        /** Returns an HashSet from source. */
        function from<T>(source: Iterable<T>): HashSet<T>;
    }
}

function from<T>(source: Iterable<T>): HashSet<T> {
    return new HashSet(source);
}

HashSet.from = from;
