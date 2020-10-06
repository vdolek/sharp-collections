import { Enumerable } from '../../../collections/Enumerable';
import { ReadOnlyHashSet } from '../../../collections/ReadOnlyHashSet';
import { EqualityComparer } from '../../../comparers/EqualityComparer';

declare module '../../../collections/ReadOnlyHashSet' {
    namespace ReadOnlyHashSet {
        /** Returns an ReadOnlyHashSet sequence containing exactly one value. */
        function single<T>(element: T, comparer?: EqualityComparer<T>): ReadOnlyHashSet<T>;
    }
}

function single<T>(element: T, comparer?: EqualityComparer<T>): ReadOnlyHashSet<T> {
    return new ReadOnlyHashSet(Enumerable.single(element), comparer);
}

ReadOnlyHashSet.single = single;
