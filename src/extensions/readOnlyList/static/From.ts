import { ReadOnlyList } from '../../../collections/ReadOnlyList';

declare module '../../../collections/ReadOnlyList' {
    namespace ReadOnlyList {
        /** Returns an ReadOnlyList from source. */
        function from<T>(source: Iterable<T>): ReadOnlyList<T>;
    }
}

function from<T>(source: Iterable<T>): ReadOnlyList<T> {
    return new ReadOnlyList(source);
}

ReadOnlyList.from = from;
