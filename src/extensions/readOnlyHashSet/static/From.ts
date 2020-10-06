import { ReadOnlyHashSet } from '../../../collections/ReadOnlyHashSet';
import { EqualityComparer } from '../../../comparers/EqualityComparer';

declare module '../../../collections/ReadOnlyHashSet' {
    namespace ReadOnlyHashSet {
        /** Returns an ReadOnlyHashSet from source. */
        function from<T>(source: Iterable<T>, comparer?: EqualityComparer<T>): ReadOnlyHashSet<T>;
    }
}

function from<T>(source: Iterable<T>, comparer?: EqualityComparer<T>): ReadOnlyHashSet<T> {
    return new ReadOnlyHashSet(source, comparer);
}

ReadOnlyHashSet.from = from;
