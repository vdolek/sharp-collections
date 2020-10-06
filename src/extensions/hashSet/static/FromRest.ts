import { HashSet } from '../../../collections/HashSet';
import { EqualityComparer } from '../../../comparers/EqualityComparer';

declare module '../../../collections/HashSet' {
    namespace HashSet {
        /** Returns an HashSet from rest parameters. */
        function fromRest<T>(...elements: T[]): HashSet<T>;

        /** Returns an HashSet from rest parameters. */
        function fromRest<T>(comparer?: EqualityComparer<T>, ...elements: T[]): HashSet<T>;
    }
}

function fromRest<T>(comparer: EqualityComparer<T> | T, ...elements: T[]): HashSet<T> {
    if (comparer != null && comparer instanceof EqualityComparer) {
        return new HashSet<T>(elements, comparer);
    }

    return new HashSet([comparer, ...elements]); // TODO undefined
}

HashSet.fromRest = fromRest;
