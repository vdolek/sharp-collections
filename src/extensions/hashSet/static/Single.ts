import { Enumerable } from '../../../collections/Enumerable';
import { HashSet } from '../../../collections/HashSet';
import { EqualityComparer } from '../../../comparers/EqualityComparer';

declare module '../../../collections/HashSet' {
    namespace HashSet {
        /** Returns an HashSet sequence containing exactly one value. */
        function single<T>(element: T, comparer?: EqualityComparer<T>): HashSet<T>;
    }
}

function single<T>(element: T, comparer?: EqualityComparer<T>): HashSet<T> {
    return new HashSet(Enumerable.single(element), comparer);
}

HashSet.single = single;
