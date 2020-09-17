import { ReadOnlyHashSet } from '../../../collections/ReadOnlyHashSet';

declare module '../../../collections/ReadOnlyHashSet' {
    namespace ReadOnlyHashSet {
        /** Returns an ReadOnlyHashSet from rest parameters. */
        function fromRest<T>(...elements: T[]): ReadOnlyHashSet<T>;
    }
}

function fromRest<T>(...elements: T[]): ReadOnlyHashSet<T> {
    return new ReadOnlyHashSet(elements);
}

ReadOnlyHashSet.fromRest = fromRest;
