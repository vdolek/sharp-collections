import { Enumerable } from '../../../collections/Enumerable';
import { ReadOnlyList } from '../../../collections/ReadOnlyList';

declare module '../../../collections/ReadOnlyList' {
    /** Generates an ReadOnlyList sequence that contains one repeated value. */
    namespace ReadOnlyList {
        function repeat<T>(element: T, count: number): ReadOnlyList<T>;
    }
}

function repeat<T>(element: T, count: number): ReadOnlyList<T> {
    return Enumerable.repeat(element, count).toReadOnlyList();
}

ReadOnlyList.repeat = repeat;
