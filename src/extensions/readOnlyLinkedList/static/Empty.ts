import { ReadOnlyLinkedList } from '../../../collections/ReadOnlyLinkedList';

declare module '../../../collections/ReadOnlyLinkedList' {
    namespace ReadOnlyLinkedList {
        /** Returns an empty ReadOnlyLinkedList. */
        function empty<T>(): ReadOnlyLinkedList<T>;
    }
}

function empty<T>(): ReadOnlyLinkedList<T> {
    return new ReadOnlyLinkedList<T>();
}

ReadOnlyLinkedList.empty = empty;
