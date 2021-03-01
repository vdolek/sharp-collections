import { ReadOnlyLinkedList } from '../../../collections/ReadOnlyLinkedList';

declare module '../../../collections/ReadOnlyLinkedList' {
    namespace ReadOnlyLinkedList {
        /** Returns an ReadOnlyLinkedList from source. */
        function from<T>(source: Iterable<T>): ReadOnlyLinkedList<T>;
    }
}

function from<T>(source: Iterable<T>): ReadOnlyLinkedList<T> {
    return new ReadOnlyLinkedList(source);
}

ReadOnlyLinkedList.from = from;
