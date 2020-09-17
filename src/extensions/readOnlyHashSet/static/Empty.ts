import { ReadOnlyHashSet } from '../../../collections/ReadOnlyHashSet';

declare module '../../../collections/ReadOnlyHashSet' {
    namespace ReadOnlyHashSet {
        /** Returns an empty ReadOnlyHashSet. */
        function empty<T>(): ReadOnlyHashSet<T>;
    }
}

function empty<T>(): ReadOnlyHashSet<T> {
    return new ReadOnlyHashSet<T>();
}

ReadOnlyHashSet.empty = empty;
