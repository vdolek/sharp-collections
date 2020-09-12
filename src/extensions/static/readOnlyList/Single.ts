import { ReadOnlyList } from '../../../collections/ReadOnlyList';

declare module '../../../collections/ReadOnlyList' {
    namespace ReadOnlyList {
        /** Returns an ReadOnlyList sequence containing exactly one value. */
        function single<T>(element: T): ReadOnlyList<T>;
    }
}

function single<T>(element: T): ReadOnlyList<T> {
    return ReadOnlyList.fromRest(element);
}

ReadOnlyList.single = single;
