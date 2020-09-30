import { ReadOnlyHashSet } from '../../../collections/ReadOnlyHashSet';
import { EqualityComparer } from '../../../comparers/EqualityComparer';

declare module '../../../collections/ReadOnlyHashSet' {
    namespace ReadOnlyHashSet {
        /** Returns an ReadOnlyHashSet from rest parameters. */
        function fromRest<T>(...elements: T[]): ReadOnlyHashSet<T>;

        /** Returns an HashSet from rest parameters. */
        function fromRest<T>(comparer?: EqualityComparer<T>, ...elements: T[]): ReadOnlyHashSet<T>;
    }
}

function fromRest<T>(comparer: EqualityComparer<T> | T, ...elements: T[]): ReadOnlyHashSet<T> {
    if (comparer != null && comparer instanceof EqualityComparer) {
        return new ReadOnlyHashSet<T>(elements, comparer);
    }

    return new ReadOnlyHashSet([comparer, ...elements]); // TODO undefined
}

ReadOnlyHashSet.fromRest = fromRest;
