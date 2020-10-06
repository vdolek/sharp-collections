import { HashSet } from '../../../collections/HashSet';
import { EqualityComparer } from '../../../comparers/EqualityComparer';

declare module '../../../collections/HashSet' {
    namespace HashSet {
        /** Returns an empty HashSet. */
        function empty<T>(comparer?: EqualityComparer<T>): HashSet<T>;
    }
}

function empty<T>(comparer?: EqualityComparer<T>): HashSet<T> {
    return new HashSet<T>(comparer);
}

HashSet.empty = empty;
