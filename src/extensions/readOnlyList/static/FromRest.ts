import { ReadOnlyList } from '../../../collections/ReadOnlyList';

declare module '../../../collections/ReadOnlyList' {
    namespace ReadOnlyList {
        /** Returns an ReadOnlyList from rest parameters. */
        function fromRest<T>(...elements: T[]): ReadOnlyList<T>;
    }
}

function fromRest<T>(...elements: T[]): ReadOnlyList<T> {
    return new ReadOnlyList(elements);
}

ReadOnlyList.fromRest = fromRest;
