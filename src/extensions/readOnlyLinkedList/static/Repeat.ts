import { Enumerable } from '../../../collections/Enumerable';
import { ReadOnlyLinkedList } from '../../../collections/ReadOnlyLinkedList';

declare module '../../../collections/ReadOnlyLinkedList' {
    /** Generates an ReadOnlyLinkedList sequence that contains one repeated value. */
    namespace ReadOnlyLinkedList {
        function repeat<T>(element: T, count: number): ReadOnlyLinkedList<T>;
    }
}

function repeat<T>(element: T, count: number): ReadOnlyLinkedList<T> {
    return Enumerable.repeat(element, count).toReadOnlyLinkedList();
}

ReadOnlyLinkedList.repeat = repeat;
