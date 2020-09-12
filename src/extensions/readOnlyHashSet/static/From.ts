import { ReadOnlyHashSet } from '../../../collections/ReadOnlyHashSet';

declare module '../../../collections/ReadOnlyHashSet' {
    namespace ReadOnlyHashSet {
        /** Returns an ReadOnlyHashSet from source. */
        function from<T>(source: Iterable<T>): ReadOnlyHashSet<T>;
    }
}

function from<T>(source: Iterable<T>): ReadOnlyHashSet<T> {
    return new ReadOnlyHashSet(source);
}

ReadOnlyHashSet.from = from;
