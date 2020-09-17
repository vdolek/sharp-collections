import { ReadOnlyHashSet } from '../../../collections/ReadOnlyHashSet';

declare module '../../../collections/ReadOnlyHashSet' {
    namespace ReadOnlyHashSet {
        /** Returns an ReadOnlyHashSet sequence containing exactly one value. */
        function single<T>(element: T): ReadOnlyHashSet<T>;
    }
}

function single<T>(element: T): ReadOnlyHashSet<T> {
    return ReadOnlyHashSet.fromRest(element);
}

ReadOnlyHashSet.single = single;
