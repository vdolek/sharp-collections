import { ReadOnlyList } from '../../../collections/ReadOnlyList';

declare module '../../../collections/ReadOnlyList' {
    namespace ReadOnlyList {
        /** Returns an empty ReadOnlyList. */
        function empty<T>(): ReadOnlyList<T>;
    }
}

function empty<T>(): ReadOnlyList<T> {
    return new ReadOnlyList<T>();
}

ReadOnlyList.empty = empty;
