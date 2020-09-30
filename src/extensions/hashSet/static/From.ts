import { HashSet } from '../../../collections/HashSet';
import { EqualityComparer } from '../../../comparers/EqualityComparer';

declare module '../../../collections/HashSet' {
    namespace HashSet {
        /** Returns an HashSet from source. */
        function from<T>(source: Iterable<T>, comparer?: EqualityComparer<T>): HashSet<T>;
    }
}

function from<T>(source: Iterable<T>, comparer?: EqualityComparer<T>): HashSet<T> {
    return new HashSet(source, comparer);
}

HashSet.from = from;
